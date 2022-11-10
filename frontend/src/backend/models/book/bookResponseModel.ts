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

export type BooksResponseAction =
  | BookListQueryRequestAction
  | BookListQuerySuccessAction
  | BookListQueryFailAction
  | BookListQueryResetAction;

// Response state
export interface BooksListQueryResponseState {
  type?: string;
  loading?: boolean;
  error?: ErrorResponseModel;
  data?: BooksResponseModel;
}
