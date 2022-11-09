import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css'
import logo from '../../assets/Google_Books_Logo.png';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    const [headerButtonTypeSelected, setHeaderButtonTypeSelected] = useState<HeaderButtonType>(HeaderButtonType.Home);

    useEffect(() => {
        if (location) {
            if (location.pathname.includes('favorites')) {
                setHeaderButtonTypeSelected(HeaderButtonType.Favorites);
            } else {
                setHeaderButtonTypeSelected(HeaderButtonType.Home);
            }
        }
    }, [location]);

  return (
    <div className='header-background'>
        <div className='header-background-content'>
            <img src={logo} alt='Google Books Logo' className='header-logo' onClick={() => navigate('/')}/>
            <div className='header-buttons'>
                <button className={`primaryColor header-button-item${headerButtonTypeSelected === HeaderButtonType.Home ? '-selected' : ''}`} onClick={() => navigate('/')}>Home</button>
                <button className={`primaryColor header-button-item${headerButtonTypeSelected === HeaderButtonType.Favorites ? '-selected' : ''}`} onClick={() => navigate('/favorites')}>Favoritos</button>
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