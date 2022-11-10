import { BookActionTypes } from "../constants/bookConstants";
import { BooksListQueryResponseState, BooksResponseAction } from "../models/book/bookResponseModel";

export const booksQueryListReducer = (state = {}, action: BooksResponseAction): BooksListQueryResponseState => {
    switch (action.type) {
        case BookActionTypes.GET_BOOKS_REQUEST:
            return { loading: true };

        case BookActionTypes.GET_BOOKS_SUCCESS:
            return { loading: false, data: action.payload };

        case BookActionTypes.GET_BOOKS_FAIL:
            return { loading: false, error: action.payload };

        case BookActionTypes.GET_BOOKS_RESET:
            return {};

        default:
            return state;
    }
};