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
        const items: {
          data: BookModel[];
        } = JSON.parse(favoriteList);
        items.data.forEach(item => {
          favoriteListToSave.set(item.id, item);
        });
      }
      favoriteListToSave.set(book.id, book);

      localStorage.setItem(
        'favoriteList',
        JSON.stringify({
          loading: false,
          data: Array.from(favoriteListToSave.values()),
        })
      );

      const list = Array.from(favoriteListToSave.values());
      dispatch({
        type: BookActionTypes.ADD_BOOK_FAVORITE_SUCCESS,
        payload: {
          totalItems: list.length,
          items: list,
        },
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
        var items: {
          data: BookModel[];
        } = JSON.parse(favoriteList);
        const listFiltered = (items.data = items.data.filter(bookItem => {
          return bookItem.id !== bookId;
        }));
        localStorage.setItem(
          'favoriteList',
          JSON.stringify({ loading: false, data: items.data })
        );

        dispatch({
          type: BookActionTypes.REMOVE_BOOK_FAVORITE_SUCCESS,
          payload: {
            totalItems: listFiltered.length,
            items: listFiltered,
          },
        });
      }
    } catch (error) {
      const errorResponse = formatError(error);
      dispatch({
        type: BookActionTypes.REMOVE_BOOK_FAVORITE_FAIL,
        payload: errorResponse,
      });
    }
  };
};

export const getBooksFavorites = (page: number, maxResults: number) => {
  return async (dispatch: Dispatch<BooksResponseAction>) => {
    dispatch({ type: BookActionTypes.GET_BOOK_FAVORITES_REQUEST });

    try {
      var items: BookModel[] = [];
      const favoriteList = localStorage.getItem('favoriteList');
      if (favoriteList) {
        const favoriteListFormatted: {
          data: BookModel[];
        } = JSON.parse(favoriteList);
        items = favoriteListFormatted.data;
      }

      const listPaginated = paginate(items, maxResults, page);

      dispatch({
        type: BookActionTypes.GET_BOOK_FAVORITES_SUCCESS,
        payload: {
          totalItems: items.length,
          items: listPaginated,
        },
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

const paginate = (
  array: BookModel[],
  pageSize: number,
  pageNumber: number
): BookModel[] => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

export const fetchBook = (id: string) => {
  return async (dispatch: Dispatch<BooksResponseAction>) => {
    dispatch({ type: BookActionTypes.GET_BOOK_DETAILS_REQUEST });

    try {
      const request: APICallRequest = {
        method: HTTPMethod.GET,
        path: `/v1/volumes/${id}`,
      };

      const response = await makeAPICall<BookModel>(request);

      dispatch({
        type: BookActionTypes.GET_BOOK_DETAILS_SUCCESS,
        payload: response,
      });
    } catch (error) {
      const errorResponse = formatError(error);
      dispatch({
        type: BookActionTypes.GET_BOOK_DETAILS_FAIL,
        payload: errorResponse,
      });
    }
  };
};

export const fetchBooksRecommended = (category: string) => {
  return async (dispatch: Dispatch<BooksResponseAction>) => {
    dispatch({ type: BookActionTypes.GET_BOOKS_RECOMMENDED_REQUEST });

    try {
      const request: APICallRequest = {
        method: HTTPMethod.GET,
        path: `/v1/volumes?q=subject:${category.split('/')[0].trim()}`,
      };

      const response = await makeAPICall<BooksResponseModel>(request);

      dispatch({
        type: BookActionTypes.GET_BOOKS_RECOMMENDED_SUCCESS,
        payload: response,
      });
    } catch (error) {
      const errorResponse = formatError(error);
      dispatch({
        type: BookActionTypes.GET_BOOKS_RECOMMENDED_FAIL,
        payload: errorResponse,
      });
    }
  };
};
