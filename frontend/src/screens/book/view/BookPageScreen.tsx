import React, { useEffect } from 'react'
import './BookPageScreen.css'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBook, fetchBooksRecommended } from '../../../backend/actions/bookActions';
import Button, { ButtonTypes } from '../../../components/buttons/Button'
import RatingComponent, { RatingSizeProps } from '../../../components/rating/RatingComponent'
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import noBookImage from '../../../assets/no-book.png';
import { formatterDate, formatterMoney, removeHTMLTags } from '../../../utils/FormatterValues';
import { motion } from 'framer-motion';
import BookComponent from '../../../components/bookComponent/BookComponent';
import { BookActionTypes } from '../../../backend/constants/bookConstants';
import Lottie from 'react-lottie';
import booksSearchJson from '../../../assets/lotties/books-search.json';
import bookNotFoundJson from '../../../assets/lotties/book-not-found.json';
import UseWindowDimensions from '../../../utils/UseWindowDimensions';

export default function BookPageScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const book = useTypedSelector(state => state.book);
    const { data: bookData, loading: bookLoading } = book;

    const booksQuery = useTypedSelector(state => state.booksQuery);
    const { data: booksQueryData} = booksQuery;

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: booksSearchJson,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        },
    };

    const defaultBookNotFoundOptions = {
        loop: true,
        autoplay: true,
        animationData: bookNotFoundJson,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        },
    };

    const { width } = UseWindowDimensions();
    const isMobile = width <= 768;

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id) {
            dispatch(fetchBook(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (bookData && bookData.volumeInfo.categories) {
            dispatch(fetchBooksRecommended(bookData.volumeInfo.categories[0]));
        } else if (!bookData) {
            dispatch({ type: BookActionTypes.GET_BOOK_DETAILS_RESET });
        } else {
            dispatch({ type: BookActionTypes.GET_BOOKS_RECOMMENDED_RESET });
        }
    }, [dispatch, bookData]);

  return (
    <div className='book-screen-background'>
        <div className='book-screen-content'>
            { bookData ? (
                <div className='book-screen-details-background'>
                    <label className='font-custom primaryTextLight book-screen-details-title'>{bookData.volumeInfo.title}</label>
                    <div className='book-screen-details-content'>
                        <img src={bookData.volumeInfo.imageLinks ? bookData.volumeInfo.imageLinks.thumbnail : noBookImage} alt={bookData.volumeInfo.title} className='book-screen-details-image' />
                        <div className='book-screen-details-content-texts'>
                            <div className='book-screen-details-content-top'>
                                <div className='book-screen-details-content-lables'>
                                    <div>
                                        <label className='subtitle2Bold'>Autores:</label>
                                        <label className='subtitle2 primaryColor book-screen-details-lable-authors'>{bookData.volumeInfo.authors.join(', ')}</label>
                                    </div>
                                    <div>
                                        {bookData.volumeInfo.publisher && (
                                            <>
                                                <label className='subtitle2Bold'>Editora:</label>
                                                <label className='subtitle2 primaryColor book-screen-details-lable-publisher'>{bookData.volumeInfo.publisher}</label>
                                            </>
                                        )}
                                        { bookData.volumeInfo.pageCount && bookData.volumeInfo.pageCount > 0 && (
                                            <label className='subtitle2 secondaryTextLight book-screen-details-lable-pages'>{`- ${bookData.volumeInfo.pageCount} páginas`}</label>
                                        )}
                                    </div>
                                    <div className='book-screen-details-rating'>
                                        <RatingComponent 
                                            rating={bookData.volumeInfo.averageRating || 0} 
                                            ratingSize={RatingSizeProps.Medium} />
                                    </div>
                                </div>
                                <div className='book-screen-details-content-right'>
                                    { bookData.volumeInfo.publishedDate && (
                                        <div>
                                            <label className='subtitle2Bold'>Data de publicação:</label>
                                            <label className='subtitle2 primaryColor book-screen-details-lable-publisher'>{formatterDate(bookData.volumeInfo.publishedDate)}</label>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <label className='book-screen-details-description'>{removeHTMLTags(bookData.volumeInfo.description || '')}</label>
                            <div className='book-screen-details-language'>
                                <label className='subtitle2Bold'>Idioma:</label>
                                <label className='subtitle2 book-screen-details-lable-language'>{bookData.volumeInfo.language}</label>
                            </div>

                            {/* Categories */}
                            { bookData.volumeInfo.categories && (
                                <div className='book-screen-details-categories'>
                                    { bookData.volumeInfo.categories.map((item) => {
                                        return (
                                            <div key={item} className='book-screen-details-category-item-background' onClick={() => { navigate(`/?category=${item}`) }}>
                                                <label className='title3Bold primaryColor book-screen-details-category-item-label'>{item}</label>
                                            </div>
                                        )
                                    }) }
                                </div>
                            )}

                            {/* Book Offers */}
                            <div className='book-screen-details-book-offers'>
                                {/* Product for sale */}
                                { bookData.saleInfo.listPrice && (
                                    <div className='book-screen-details-book-for-sale'>
                                        <label className='book-screen-details-book-for-sale-price'>{formatterMoney(bookData.saleInfo.listPrice.amount, bookData.saleInfo.listPrice.currencyCode)}</label>
                                        { bookData.saleInfo.buyLink && (
                                            <div className='book-screen-details-book-for-sale-button'>
                                                <Button 
                                                    onClick={() => {
                                                        window.open(bookData.saleInfo.buyLink, '_blank');
                                                    }} 
                                                    borderRadius={'25px'}
                                                    text={'Comprar'} />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Download PDF */}
                                { bookData.accessInfo.pdf.isAvailable && (
                                    <div className='book-screen-details-book-for-sale-button-pdf'>
                                        <Button 
                                            onClick={() => {
                                                window.open(bookData.accessInfo.pdf.acsTokenLink, '_blank');
                                            }} 
                                            type={ButtonTypes.Secondary}
                                            borderRadius={'25px'}
                                            text={'Download'} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : bookLoading ? (
                <div>
                    <Lottie options={defaultOptions}
                        isClickToPauseDisabled={true}
                        height={isMobile ? '200px' : '300px'}
                        width={isMobile ? '300px' : '400px'}
                        style={{
                        marginTop: isMobile ? '80px' : '3%',
                        }}
                        />
                </div>
            ) : (
                <div className='book-screen-book-not-found-background'>
                    <Lottie options={defaultBookNotFoundOptions}
                        isClickToPauseDisabled={true}
                        height={isMobile ? '200px' : '300px'}
                        width={isMobile ? '300px' : '400px'}
                        style={{
                        marginTop: isMobile ? '80px' : '3%',
                        }}
                        />
                    <label className='title2Bold secondaryTextLight'>Este livro não foi encontrado</label>
                    <Button
                        onClick={() => {navigate('/')}}
                        text='Ir para o início'
                        type={ButtonTypes.Secondary}
                        style={{
                            marginTop: '16px'
                        }}
                    />
                </div>
            )}

            {/* Books Recommended */}
            { booksQueryData && booksQueryData.items && (
                <div className='book-screen-books-recommended'>
                    <label className='title2Bold'>Livros Recomendados</label>
                    <div className='book-screen-books-recommended-list'>
                        { booksQueryData.items.map((book, index) => {
                            return (
                                <motion.div 
                                        key={`home-screen-books-${index}`}
                                        initial={{ opacity: index <= 15 ? 0 : 1, scale: index <= 15 ? 0.9 : 1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                        duration: index <= 15 ? (index + 1) * (index <= 4 ? 0.2 : 0.1) : 0,
                                        ease: "easeInOut",
                                        }}>
                                    <div className='home-screen-books-list-item' key={`book-${book.id}`}>
                                        <BookComponent book={book} />
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            )}

        </div>
    </div>
  )
}
