import React from 'react'
import './ButtonFavorite.css';
import { BsHeart, BsHeartFill } from "react-icons/bs";

interface ButtonFavoriteProps {
    isFavorite: boolean;
    enabled?: boolean;
    onClick: (isFavorite: boolean) => void;
}

export default function ButtonFavorite(props: ButtonFavoriteProps) {
    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        if (props.enabled == null || props.enabled) {
            props.onClick(props.isFavorite);
        }
      };

    return (
        <div className="button-background-favorite primaryColor subtitle4" onClick={(e) => onClick(e)}>
            {props.isFavorite ? <BsHeartFill/> : <BsHeart/>}
            <label className="button-text-favorite">{props.isFavorite ? 'Favorito' : 'Favoritar'}</label>
        </div>
    )
}
