import React from 'react'
import { BookModel } from '../../backend/models/book/bookResponseModel'
import Button from '../buttons/Button'
import ButtonFavorite from '../buttons/ButtonFavorite'
import RatingComponent, { RatingSizeProps } from '../rating/RatingComponent'
import './BookComponent.css'
import noBookImage from '../../assets/no-book.png';

interface BookComponentProps {
    book: BookModel;
}

export default function BookComponent(props: BookComponentProps) {
  return (
    <div className='book-component-background'>
        <img src={props.book.volumeInfo.imageLinks ? props.book.volumeInfo.imageLinks.thumbnail : noBookImage} alt={props.book.volumeInfo.title} className={`${props.book.volumeInfo.imageLinks ? 'book-component-image' : 'book-component-no-image'}`} />
        <label className='font-custom primaryTextLight book-component-title'>{props.book.volumeInfo.title}</label>
        <div className='book-component-second-line'>
            <RatingComponent 
                rating={props.book.volumeInfo.averageRating} 
                ratingSize={RatingSizeProps.Small} />
            <ButtonFavorite 
                isFavorite={false} 
                onClick={(isFavorite: boolean) => {
                  
                }} />
        </div>
        <div className='book-component-button-details'>
            <Button 
                onClick={() => {
                  
                }} 
                text={'Ver mais'} />
        </div>
    </div>
  )
}
