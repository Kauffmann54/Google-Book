import React from 'react';
import './HeaderAside.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { VscClose } from 'react-icons/vsc';

interface HeaderAsideProps {
  isToClose: (close: boolean) => void;
}

export default function HeaderAside(props: HeaderAsideProps) {
  return (
    <div>
      <div className="header-aside-backgroud">
        <div className="HeaderAsideTop">
          <VscClose
            className="icon-hover-cursor HeaderAsideClose"
            onClick={() => props.isToClose(true)}
          />
        </div>
        <ul>
          <Link to="/" onClick={() => props.isToClose(true)}>
            <li className="subHeader-item primaryColor">
                <FontAwesomeIcon
                  className="icon-hover-cursor subHeader-aside-item-icon primaryColor"
                  icon={faHome}
                />
                Home
            </li>
          </Link>
          <Link to="/favorites" onClick={() => props.isToClose(true)}>
            <li className="subHeader-item primaryColor">
                <FontAwesomeIcon
                  className="icon-hover-cursor subHeader-aside-item-icon primaryColor"
                  icon={faHeart}
                />
                Favoritos
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
