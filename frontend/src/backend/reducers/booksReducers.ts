import { BookActionTypes } from "../constants/bookConstants";
import { BooksListQueryResponseState, BooksResponseAction, BooksFavoriteResponseState, BookResponseState } from "../models/book/bookResponseModel";

export const booksQueryListReducer = (state = {}, action: BooksResponseAction): BooksListQueryResponseState => {
    switch (action.type) {
        case BookActionTypes.GET_BOOKS_REQUEST:
        case BookActionTypes.GET_BOOKS_RECOMMENDED_REQUEST:
            return { loading: true };

        case BookActionTypes.GET_BOOKS_SUCCESS:
        case BookActionTypes.GET_BOOKS_RECOMMENDED_SUCCESS:
            return { loading: false, data: action.payload };

        case BookActionTypes.GET_BOOKS_RECOMMENDED_FAIL:
            return { loading: false, error: action.payload };

        case BookActionTypes.GET_BOOKS_RECOMMENDED_RESET:
            return {};

        default:
            return state;
    }
};

export const booksFavoritesReducer = (state = {}, action: BooksResponseAction): BooksFavoriteResponseState => {
    switch (action.type) {
        case BookActionTypes.ADD_BOOK_FAVORITE_REQUEST:
        case BookActionTypes.REMOVE_BOOK_FAVORITE_REQUEST:
        case BookActionTypes.GET_BOOK_FAVORITES_REQUEST:
            return { loading: true };

        case BookActionTypes.ADD_BOOK_FAVORITE_SUCCESS:
        case BookActionTypes.REMOVE_BOOK_FAVORITE_SUCCESS:
        case BookActionTypes.GET_BOOK_FAVORITES_SUCCESS:
            return { loading: false, data: action.payload };

        case BookActionTypes.ADD_BOOK_FAVORITE_FAIL:
        case BookActionTypes.REMOVE_BOOK_FAVORITE_FAIL:
        case BookActionTypes.GET_BOOK_FAVORITES_FAIL:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
};

export const bookReducer = (state = {}, action: BooksResponseAction): BookResponseState => {
    switch (action.type) {
        case BookActionTypes.GET_BOOK_DETAILS_REQUEST:
            return { loading: true };

        case BookActionTypes.GET_BOOK_DETAILS_SUCCESS:
            return { loading: false, data: action.payload };

        case BookActionTypes.GET_BOOK_DETAILS_FAIL:
            return { loading: false, error: action.payload };

        case BookActionTypes.GET_BOOK_DETAILS_RESET:
            return {};

        default:
            return state;
    }
};