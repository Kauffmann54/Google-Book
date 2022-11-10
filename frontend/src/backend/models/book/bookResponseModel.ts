import { BookActionTypes } from '../../constants/bookConstants';
import { ErrorResponseModel } from '../error/ErrorResponseModel';

// Model
export interface BookModel {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers?: {
      type: string;
      identifier: string;
    }[];
    pageCount?: number;
    printType: string;
    categories: string[];
    averageRating: number;
    ratingsCount: number;
    imageLinks?: {
      thumbnail: string;
    };
    language: string;
    previewLink: string;
  };
  saleInfo: {
    country: string;
    saleability: string;
    isEbook: boolean;
    listPrice?: {
      amount: number;
      currencyCode: string;
    };
    buyLink?: string;
  };
  accessInfo: {
    pdf: {
      isAvailable: boolean;
      acsTokenLink?: string;
    };
  };
}

export interface BooksResponseModel {
  kind: string;
  totalItems: number;
  items?: BookModel[];
}

// Action
// Book List Query
export interface BookListQueryRequestAction {
  type: BookActionTypes.GET_BOOKS_REQUEST;
}

export interface BookListQuerySuccessAction {
  type: BookActionTypes.GET_BOOKS_SUCCESS;
  payload: BooksResponseModel;
}

export interface BookListQueryFailAction {
  type: BookActionTypes.GET_BOOKS_FAIL;
  payload: ErrorResponseModel;
}

export interface BookListQueryResetAction {
  type: BookActionTypes.GET_BOOKS_RESET;
}

// Add Book to favorite
export interface AddBookToFavoriteRequestAction {
  type: BookActionTypes.ADD_BOOK_FAVORITE_REQUEST;
}

export interface AddBookToFavoriteSuccessAction {
  type: BookActionTypes.ADD_BOOK_FAVORITE_SUCCESS;
  payload: boolean;
}

export interface AddBookToFavoriteFailAction {
  type: BookActionTypes.ADD_BOOK_FAVORITE_FAIL;
  payload: ErrorResponseModel;
}

// Remove Book to favorite
export interface RemoveBookFromFavoriteRequestAction {
  type: BookActionTypes.REMOVE_BOOK_FAVORITE_REQUEST;
}

export interface RemoveBookFromFavoriteSuccessAction {
  type: BookActionTypes.REMOVE_BOOK_FAVORITE_SUCCESS;
  payload: boolean;
}

export interface RemoveBookFromFavoriteFailAction {
  type: BookActionTypes.REMOVE_BOOK_FAVORITE_FAIL;
  payload: ErrorResponseModel;
}

// Get Books favorites
export interface GetBooksFavoritesRequestAction {
  type: BookActionTypes.GET_BOOK_FAVORITES_REQUEST;
}

export interface GetBooksFavoritesSuccessAction {
  type: BookActionTypes.GET_BOOK_FAVORITES_SUCCESS;
  payload: BookModel[];
}

export interface GetBooksFavoritesFailAction {
  type: BookActionTypes.GET_BOOK_FAVORITES_FAIL;
  payload: ErrorResponseModel;
}

export type BooksResponseAction =
  | BookListQueryRequestAction
  | BookListQuerySuccessAction
  | BookListQueryFailAction
  | BookListQueryResetAction
  | AddBookToFavoriteRequestAction
  | AddBookToFavoriteSuccessAction
  | AddBookToFavoriteFailAction
  | RemoveBookFromFavoriteRequestAction
  | RemoveBookFromFavoriteSuccessAction
  | RemoveBookFromFavoriteFailAction
  | GetBooksFavoritesRequestAction
  | GetBooksFavoritesSuccessAction
  | GetBooksFavoritesFailAction;

// Response state
export interface BooksListQueryResponseState {
  type?: string;
  loading?: boolean;
  error?: ErrorResponseModel;
  data?: BooksResponseModel;
}

export interface BooksModifyFavoriteResponseState {
  type?: string;
  loading?: boolean;
  error?: ErrorResponseModel;
  data?: boolean;
}

export interface BooksFavoriteResponseState {
  type?: string;
  loading?: boolean;
  error?: ErrorResponseModel;
  data?: BookModel[];
}
