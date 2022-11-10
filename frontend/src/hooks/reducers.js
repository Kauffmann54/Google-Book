import { combineReducers } from 'redux';
import { bookReducer, booksQueryListReducer, booksFavoritesReducer } from '../backend/reducers/booksReducers';

const reducers = combineReducers({
    book: bookReducer,
    booksQuery: booksQueryListReducer,
    favoriteList: booksFavoritesReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;