import React, { useEffect } from 'react';
import './HeaderAside.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faHome
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { VscClose } from 'react-icons/vsc';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { Badge } from '@mui/material';
import { useDispatch } from 'react-redux';
import { getBooksFavorites } from '../../backend/actions/bookActions';

interface HeaderAsideProps {
  isToClose: (close: boolean) => void;
}

export default function HeaderAside(props: HeaderAsideProps) {
  const dispatch = useDispatch();

  const favoriteList = useTypedSelector(state => state.favoriteList);
  const { data: favoriteListData } = favoriteList;

  useEffect(() => {
    dispatch(getBooksFavorites(0, 0));
  }, [dispatch]);

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
                <Badge className='subHeader-aside-item-icon' badgeContent={favoriteListData ? favoriteListData.totalItems : 0} color="error" max={999}>
                  <FontAwesomeIcon
                    className="icon-hover-cursor primaryColor"
                    icon={faHeart}
                  />
                </Badge>
                Favoritos
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
