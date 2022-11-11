import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import Lottie from 'react-lottie';
import { useDispatch } from 'react-redux';
import { getBooksFavorites } from '../../../backend/actions/bookActions';
import BookComponent from '../../../components/bookComponent/BookComponent';
import BookComponentSkeleton from '../../../components/bookComponent/BookComponentSkeleton';
import { useTypedSelector } from '../../../hooks/useTypeSelector';
import './FavoriteScreen.css'
import booksSearchJson from '../../../assets/lotties/books-search.json';
import UseWindowDimensions from '../../../utils/UseWindowDimensions';
import { Pagination } from '@mui/material';
import ComboBox, { ComboBoxValueProps } from '../../../components/comboBox/ComboBox';
import { formatNumber } from '../../../utils/FormatterValues';
import Button, { ButtonTypes } from '../../../components/buttons/Button';
import { useNavigate } from 'react-router-dom';
import BookMeta from '../../../utils/BookMeta';
import PageAnimation from '../../../components/animation/pageAnimation';

export default function FavoriteScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [page, setPage] = useState<number>(1);
    const maxResultsList = useState<ComboBoxValueProps[]>([
        new ComboBoxValueProps('10', '10'),
        new ComboBoxValueProps('20', '20'),
        new ComboBoxValueProps('30', '30'),
        new ComboBoxValueProps('40', '40'),
    ]);  
    const [maxResultsSelected, setMaxResultsSelected] = useState<ComboBoxValueProps>(new ComboBoxValueProps('10', '10'));

    const favoriteList = useTypedSelector(state => state.favoriteList);
    const { data: favoriteListData, loading: favoriteListLoading } = favoriteList;

    const { width } = UseWindowDimensions();
    const isMobile = width <= 768;

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: booksSearchJson,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        },
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [favoriteListData]);

    useEffect(() => {
        dispatch(getBooksFavorites(page, formatNumber(maxResultsSelected.value)));
    }, [dispatch, page, maxResultsSelected]);

  return (
    <PageAnimation>
        <BookMeta>
            <title>{`Favoritos ${process.env.REACT_APP_META_TITLE}`}</title>
            <meta name="description" content={process.env.REACT_APP_META_DESCRIPTION} />
            <meta name="keywords" content={`${process.env.REACT_APP_META_KEYWORDS}, favorites, favorites screen`} />
            <script type="application/ld+json">
                {`
                    {
                        "@context": "http://schema.org",
                        "@type": "WebSite",
                        "name": "Favoritos ${process.env.REACT_APP_META_TITLE}",
                        "alternateName": "Google Book",
                        "description": "${process.env.REACT_APP_META_DESCRIPTION}",
                        "url": "${process.env.REACT_APP_BOOK_SITE_URL}/favorites}",
                    }
                    `
                }
            </script>
        </BookMeta>

        <div className='favorite-screen-background'>        
            <div className='favorite-screen-content'>
                <label className='title1Bold'>Favoritos</label>
                <div className='favorite-screen-max-results'>
                    <label className='subtitle3Bold favorite-screen-max-results-label'>Resultados por página:</label>
                    <ComboBox 
                        options={maxResultsList[0]} 
                        value={maxResultsSelected?.value}
                        placeholder='Resultados por página'
                        onChange={(value: ComboBoxValueProps) => {
                            setMaxResultsSelected(value);
                        }} />
                </div>
                <div className='favorite-screen-books-list'>
                    { favoriteListData && favoriteListData.items && favoriteListData.items.length > 0 ? favoriteListData.items.map((book, index) => {
                        return (
                        <motion.div 
                                key={`favorite-screen-books-${index}`}
                                initial={{ opacity: index <= 15 ? 0 : 1, scale: index <= 15 ? 0.9 : 1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                duration: index <= 15 ? (index + 1) * (index <= 4 ? 0.2 : 0.1) : 0,
                                ease: "easeInOut",
                                }}>
                            <div className='favorite-screen-books-list-item' key={`book-${book.id}`}>
                            <BookComponent book={book} />
                            </div>
                        </motion.div>
                        )
                    }) : favoriteListLoading ? (
                        <>
                        {[...Array(10)].map((i, index) => {
                            return (
                                <motion.div 
                                    key={`favorite-screen-books-empty-${index}`}
                                    initial={{ opacity: index <= 15 ? 0 : 1, scale: index <= 15 ? 0.9 : 1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                    duration: index <= 15 ? (index + 1) * 0.2 : 0,
                                    ease: "easeInOut",
                                    }}>
                                    <div key={`${index}-favorite-screen-books-empty`} className='favorite-screen-books-list-item'>
                                        <BookComponentSkeleton />
                                    </div>
                                </motion.div>
                            );
                        }
                        )}
                        </>
                    ) : (
                        <div className='favorite-screen-books-empty-background'>
                        <Lottie options={defaultOptions}
                            isClickToPauseDisabled={true}
                            height={isMobile ? '200px' : '300px'}
                            width={isMobile ? '300px' : '400px'}
                            style={{
                            marginTop: isMobile ? '80px' : '3%',
                            }}
                            />
                            <label className='title3Bold secondaryTextLight'>Você não tem nenhum livro favorito</label>
                            <Button 
                                onClick={() => {navigate(`/`)}}
                                text={'Ir para o início'}
                                type={ButtonTypes.Secondary}
                                style={{
                                    marginTop: '15px'
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Pagination */}
                { favoriteListData && favoriteListData.totalItems > 0 && (
                    <Pagination 
                        className='favorite-screen-books-list-pagination' 
                        count={favoriteListData.totalItems > 0 ? Math.round(favoriteListData.totalItems/formatNumber(maxResultsSelected.value)) : 1}
                        page={page}
                        color='primary'
                        onChange={(e, page) => setPage(page)} />
                )}
            </div>
        </div>
    </PageAnimation>
  )
}
