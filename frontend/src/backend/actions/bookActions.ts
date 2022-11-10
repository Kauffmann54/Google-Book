import { Dispatch } from 'react';
import { BookActionTypes } from '../constants/bookConstants';
import {
  BooksResponseModel,
  BooksResponseAction,
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
