import { Dispatch } from "react";
import { BookActionTypes } from "../constants/bookConstants";
import { BooksResponseModel, BooksResponseAction } from "../models/book/bookResponseModel";
import { makeAPICall, APICallRequest, HTTPMethod, formatError } from "../../backend/utils/APICall";

export const fetchBooksByQuery = (query: string) => {
    return async (dispatch: Dispatch<BooksResponseAction>) => {
        dispatch({ type: BookActionTypes.GET_BOOKS_REQUEST });

        try {
            const request: APICallRequest = {
                method: HTTPMethod.GET,
                path: `/v1/volumes?q=${query}`,
            };

            const response = await makeAPICall<BooksResponseModel>(request);

            dispatch({ type: BookActionTypes.GET_BOOKS_SUCCESS, payload: response });
        } catch (error) {
            const errorResponse = formatError(error);
            dispatch({ type: BookActionTypes.GET_BOOKS_FAIL, payload: errorResponse });
        }
    };
};