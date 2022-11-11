import React from 'react'
import { BookModel } from '../../backend/models/book/bookResponseModel'
import Button from '../buttons/Button'
import ButtonFavorite from '../buttons/ButtonFavorite'
import RatingComponent, { RatingSizeProps } from '../rating/RatingComponent'
import './BookComponent.css'
import noBookImage from '../../assets/no-book.png';
import { useTypedSelector } from '../../hooks/useTypeSelector'
import { useDispatch } from 'react-redux'
import { addBookToFavorite, removeBookFromFavorite } from '../../backend/actions/bookActions'
import { useNavigate } from 'react-router-dom'

interface BookComponentProps {
    book: BookModel;
}

export default function BookComponent(props: BookComponentProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const favoriteList = useTypedSelector(state => state.favoriteList);
    const { data: favoriteListData } = favoriteList;

    const handleAddBookToFavorite = () => {
        dispatch(addBookToFavorite(props.book));
    }

    const handleRemoveBookFromFavorite = () => {
        dispatch(removeBookFromFavorite(props.book.id));
    }

  return (
    <div className='book-component-background'>
        <img data-testid='book-component-image' src={props.book.volumeInfo.imageLinks ? props.book.volumeInfo.imageLinks.thumbnail : noBookImage} alt={props.book.volumeInfo.title} className={`${props.book.volumeInfo.imageLinks ? 'book-component-image' : 'book-component-no-image'}`} />
        <label data-testid='book-component-title' className='font-custom primaryTextLight book-component-title'>{props.book.volumeInfo.title}</label>
        <div className='book-component-second-line'>
            <RatingComponent 
                rating={props.book.volumeInfo.averageRating || 0} 
                ratingSize={RatingSizeProps.Small} />
            <ButtonFavorite 
                isFavorite={favoriteListData && favoriteListData.items ? favoriteListData.items.find((favorite) => { return favorite.id === props.book.id }) !== undefined : false} 
                onClick={(isFavorite: boolean) => {
                  if (!isFavorite) {
                    handleAddBookToFavorite();
                  } else {
                    handleRemoveBookFromFavorite();
                  }
                }} />
        </div>
        <div className='book-component-button-details'>
            <Button 
                onClick={() => {
                  navigate(`/book/${props.book.id}`);
                }} 
                text={'Ver mais'} />
        </div>
    </div>
  )
}
