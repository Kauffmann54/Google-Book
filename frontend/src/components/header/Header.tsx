import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css'
import logo from '../../assets/Google_Books_Logo.png';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from '@mui/material';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { getBooksFavorites } from '../../backend/actions/bookActions';

enum HeaderButtonType {
    Home,
    Favorites,
}

interface HeaderProps {
    setOpenMenu: (open: boolean) => void;
}

export default function Header(props: HeaderProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [headerButtonTypeSelected, setHeaderButtonTypeSelected] = useState<HeaderButtonType>(HeaderButtonType.Home);

    const favoriteList = useTypedSelector(state => state.favoriteList);
    const { data: favoriteListData } = favoriteList;

    useEffect(() => {
        if (location) {
            if (location.pathname.includes('favorites')) {
                setHeaderButtonTypeSelected(HeaderButtonType.Favorites);
            } else {
                setHeaderButtonTypeSelected(HeaderButtonType.Home);
            }
        }
        dispatch(getBooksFavorites(0, 0));
    }, [location, dispatch]);

  return (
    <div data-testid='header-background' className='header-background'>
        <div className='header-background-content'>
            <img src={logo} alt='Google Books Logo' className='header-logo' onClick={() => navigate('/')}/>
            <div className='header-buttons'>
                <button className={`primaryColor header-button-item${headerButtonTypeSelected === HeaderButtonType.Home ? '-selected' : ''}`} onClick={() => navigate('/')}>Home</button>
                <div className={`header-favorites-background`} onClick={() => navigate('/favorites')}>
                    <Badge badgeContent={favoriteListData ? favoriteListData.totalItems : 0} color="error" max={999}>
                        <button style={{
                                marginRight: '-3px',
                            }} className={`primaryColor header-button-item${headerButtonTypeSelected === HeaderButtonType.Favorites ? '-selected' : ''}`}>Favoritos</button>
                    </Badge>
                </div>
            </div>
            <FontAwesomeIcon
                className="mobile-iten icon-hover-cursor primaryColor"
                icon={faBars}
                onClick={() => props.setOpenMenu(true)}
            />
        </div>
    </div>
  )
}