import React from 'react'
import './RatingComponent.css';
import { MdStar, MdStarHalf,MdStarOutline } from "react-icons/md";

export enum RatingSizeProps {
    Small = 'small',
    Medium = 'medium',
    Big = 'big'
}

interface RatingProps {
    rating: number;
    ratingSize: RatingSizeProps;
    disabled?: boolean;
}

export default function RatingComponent(props: RatingProps) {
    return (
        <div className="rating-view">
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label 
                    style={{
                        color: props.disabled ? '#6e6e6e' : '#FF9900'
                    }}
                    className={`rating-${props.ratingSize}`}
                    key={i}>
                        {ratingValue <= props.rating ? <MdStar/> : ratingValue - props.rating <= 0.5 ? <MdStarHalf /> : <MdStarOutline />}
                    </label>
                );
            }
            )}
            <label className={'rating-text ' + (props.ratingSize === RatingSizeProps.Small ? 'subtitle4Bold secondaryTextLight' : 
                props.ratingSize === RatingSizeProps.Medium ? 
                'subtitle4Bold secondaryTextLight' : 'title3Bold secondaryTextLight')}>{props.rating}</label>
        </div>
    )
}
