import { Dispatch } from 'react';
import { BookActionTypes } from '../constants/bookConstants';
import {
  BooksResponseModel,
  BooksResponseAction,
  BookModel,
} from '../models/book/bookResponseModel';
import {
  makeAPICall,
  APICallRequest,
  HTTPMethod,
  formatError,
} from '../../backend/utils/APICall';

export const fetchBooksByQuery = (
  query: string,
  page: number,
  categorySelectedType?: string,
  isDownloadAvailable?: boolean,
  filterVolumeByTypeAndPrice?: string,
  maxResults?: string,
  printType?: string,
  orderBy?: string,
  language?: string
) => {
  return async (dispatch: Dispatch<BooksResponseAction>) => {
    dispatch({ type: BookActionTypes.GET_BOOKS_REQUEST });

    var queryFormatted = query;
    if (categorySelectedType) {
      queryFormatted += `+subject:${categorySelectedType}`;
    }
    if (isDownloadAvailable) {
      queryFormatted += `&download=epub`;
    }
    if (filterVolumeByTypeAndPrice) {
      queryFormatted += `&filter=${filterVolumeByTypeAndPrice}`;
    }
    if (maxResults) {
      queryFormatted += `&maxResults=${maxResults}`;
    }
    queryFormatted += `&startIndex=${page}`;
    if (printType) {
      queryFormatted += `&printType=${printType}`;
    }
    if (orderBy) {
      queryFormatted += `&orderBy=${orderBy}`;
    }
    if (language) {
      queryFormatted += `&langRestrict=${language}`;
    }

    try {
      const request: APICallRequest = {
        method: HTTPMethod.GET,
        path: `/v1/volumes?q=${queryFormatted}`,
      };

      const response = await makeAPICall<BooksResponseModel>(request);

      dispatch({ type: BookActionTypes.GET_BOOKS_SUCCESS, payload: response });
    } catch (error) {
      const errorResponse = formatError(error);
      dispatch({
        type: BookActionTypes.GET_BOOKS_FAIL,
        payload: errorResponse,
      });
    }
  };
};

export const addBookToFavorite = (book: BookModel) => {
  return async (dispatch: Dispatch<BooksResponseAction>) => {
    dispatch({ type: BookActionTypes.ADD_BOOK_FAVORITE_REQUEST });

    try {
      const favoriteList = localStorage.getItem('favoriteList');
      var favoriteListToSave = new Map();
      if (favoriteList) {
        const items: BookModel[] = JSON.parse(favoriteList);
        items.forEach(item => {
          favoriteListToSave.set(item.id, item);
        });
        favoriteListToSave.set(book.id, book);
      }

      localStorage.setItem(
        'favoriteList',
        JSON.stringify({
          loading: false,
          data: Array.from(favoriteListToSave.values()),
        })
      );

      dispatch({
        type: BookActionTypes.ADD_BOOK_FAVORITE_SUCCESS,
        payload: true,
      });
    } catch (error) {
      const errorResponse = formatError(error);
      dispatch({
        type: BookActionTypes.ADD_BOOK_FAVORITE_FAIL,
        payload: errorResponse,
      });
    }
  };
};

export const removeBookFromFavorite = (bookId: string) => {
  return async (dispatch: Dispatch<BooksResponseAction>) => {
    dispatch({ type: BookActionTypes.REMOVE_BOOK_FAVORITE_REQUEST });

    try {
      const favoriteList = localStorage.getItem('favoriteList');
      if (favoriteList) {
        var items: BookModel[] = JSON.parse(favoriteList);
        items = items.filter(bookItem => {
          return bookItem.id !== bookId;
        });
        localStorage.setItem(
          'favoriteList',
          JSON.stringify({ loading: false, data: items })
        );
      }

      dispatch({
        type: BookActionTypes.REMOVE_BOOK_FAVORITE_SUCCESS,
        payload: true,
      });
    } catch (error) {
      const errorResponse = formatError(error);
      dispatch({
        type: BookActionTypes.REMOVE_BOOK_FAVORITE_FAIL,
        payload: errorResponse,
      });
    }
  };
};

export const getBooksFavorites = () => {
    return async (dispatch: Dispatch<BooksResponseAction>) => {
      dispatch({ type: BookActionTypes.GET_BOOK_FAVORITES_REQUEST });
  
      try {
        var items: BookModel[] = [];
        const favoriteList = localStorage.getItem('favoriteList');
        if (favoriteList) {
          items = JSON.parse(favoriteList);
        }
  
        dispatch({
          type: BookActionTypes.GET_BOOK_FAVORITES_SUCCESS,
          payload: items,
        });
      } catch (error) {
        const errorResponse = formatError(error);
        dispatch({
          type: BookActionTypes.GET_BOOK_FAVORITES_FAIL,
          payload: errorResponse,
        });
      }
    };
  };