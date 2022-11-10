import React from 'react'
import Button from '../buttons/Button'
import ButtonFavorite from '../buttons/ButtonFavorite'
import RatingComponent, { RatingSizeProps } from '../rating/RatingComponent'
import './BookComponent.css'

export default function BookComponent() {
  return (
    <div className='book-component-background'>
        <img src='http://books.google.com/books/content?id=H3KNEAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api' className='book-component-image' />
        <label className='font-custom primaryTextLight book-component-title'>Lord of the Flies Lord of the Flies</label>
        <div className='book-component-second-line'>
            <RatingComponent 
                rating={5} 
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
