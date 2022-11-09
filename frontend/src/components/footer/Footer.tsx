import React from 'react'
import './Footer.css'
import logo from '../../assets/Google_Books_Logo.png';
import { useNavigate } from 'react-router-dom';
import { getAtualYear } from '../../utils/FormatterValues';

export default function Footer() {
    const navigate = useNavigate();

  return (
    <div className='footer-background'>
        <div className='footer-content1'>
            <img src={logo} alt='Logo Google Book' className='footer-logo' onClick={() => navigate('/')} />
        </div>
        <label className='footer-google-book-label subtitle2Bold secondaryTextLight'>{`© ${getAtualYear()} por Google Book`}</label>
    </div>
  )
}
