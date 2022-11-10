import React from 'react'
import { Skeleton } from '@mui/material';
import RatingComponent, { RatingSizeProps } from '../rating/RatingComponent';
import './BookComponentSkeleton.css';

export default function BookComponentSkeleton() {
  return (
    <div className='book-component-background-skeleton'>
        <Skeleton variant="rectangular" className='book-component-image-skeleton' height={220} />
        <Skeleton variant="rectangular" className='book-component-title-skeleton' height={30} />
        <div className='book-component-second-line-skeleton'>
            <RatingComponent 
                rating={0}
                ratingSize={RatingSizeProps.Small}
                disabled={true}
            />
            <Skeleton variant="rectangular" className='book-component-button-favorite-skeleton' height={20} width={70} />
        </div>
        <Skeleton variant="rectangular" className='book-component-button-details-skeleton' height={45} />
    </div>
  )
}
