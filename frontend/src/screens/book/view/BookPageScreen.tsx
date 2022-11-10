import React from 'react'
import Button, { ButtonTypes } from '../../../components/buttons/Button'
import RatingComponent, { RatingSizeProps } from '../../../components/rating/RatingComponent'
import './BookPageScreen.css'

export default function BookPageScreen() {
  return (
    <div className='book-screen-background'>
        <div className='book-screen-content'>
            <div className='book-screen-details-background'>
                <label className='font-custom primaryTextLight book-screen-details-title'>Harry Potter e o Cálice de Fogo</label>
                <div className='book-screen-details-content'>
                    <img src='http://books.google.com/books/content?id=ZDgQCwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api' className='book-screen-details-image' />
                    <div className='book-screen-details-content-texts'>
                        <div className='book-screen-details-content-top'>
                            <div className='book-screen-details-content-lables'>
                                <div>
                                    <label className='subtitle2Bold'>Autores:</label>
                                    <label className='subtitle2 primaryColor book-screen-details-lable-authors'>J.K. Rowling</label>
                                </div>
                                <div>
                                    <label className='subtitle2Bold'>Editora:</label>
                                    <label className='subtitle2 primaryColor book-screen-details-lable-publisher'>Pottermore Publishing</label>
                                    <label className='subtitle2 secondaryTextLight book-screen-details-lable-pages'>- 758 páginas</label>
                                </div>
                                <div className='book-screen-details-rating'>
                                    <RatingComponent 
                                        rating={5} 
                                        ratingSize={RatingSizeProps.Medium} />
                                </div>
                            </div>
                            <div className='book-screen-details-content-right'>
                                <div>
                                    <label className='subtitle2Bold'>Data de publicação:</label>
                                    <label className='subtitle2 primaryColor book-screen-details-lable-publisher'>2015-12-08</label>
                                </div>
                            </div>
                        </div>
                        <label className='book-screen-details-description'>Haverá três tarefas, espaçadas durante o ano letivo, que servirão para testar os campeões de diferentes maneiras... sua perícia em magia, sua coragem, seus poderes de dedução e, naturalmente, sua capacidade de enfrentar o perigo.' O Torneio Tribruxo será realizado em Hogwarts. Apenas bruxos acima dos dezessete anos de idade podem se inscrever - mas isso não impede que Harry sonhe em vencer a competição. E então, no Dia das Bruxas, quando o Cálice de Fogo faz sua seleção, Harry se surpreende ao ver que seu nome é um dos que a taça mágica escolhe. Ele terá de enfrentar tarefas mortais, dragões e bruxos das trevas, mas com a ajuda de seus melhores amigos, Ron e Hermione, talvez ele consiga sair dessa - vivo!</label>
                        <div className='book-screen-details-language'>
                            <label className='subtitle2Bold'>Idioma:</label>
                            <label className='subtitle2 book-screen-details-lable-language'>pt-BR</label>
                        </div>

                        {/* Categories */}
                        <div className='book-screen-details-categories'>
                            <div className='book-screen-details-category-item-background'>
                                <label className='title3Bold primaryColor book-screen-details-category-item-label'>Juvenile Fiction</label>
                            </div>
                        </div>

                        {/* Book Offers */}
                        <div className='book-screen-details-book-offers'>
                            {/* Product for sale */}
                            <div className='book-screen-details-book-for-sale'>
                                <label className='book-screen-details-book-for-sale-price'>R$ 24,90</label>
                                <div className='book-screen-details-book-for-sale-button'>
                                    <Button 
                                        onClick={() => {
                                        
                                        }} 
                                        borderRadius={'25px'}
                                        text={'Comprar'} />
                                </div>
                            </div>

                            {/* Download PDF */}
                            <div className='book-screen-details-book-for-sale-button-pdf'>
                                <Button 
                                    onClick={() => {
                                    
                                    }} 
                                    type={ButtonTypes.Secondary}
                                    borderRadius={'25px'}
                                    text={'Download'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
