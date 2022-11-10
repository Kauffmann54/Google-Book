import { combineReducers } from 'redux';
import { booksQueryListReducer, bookModifyFavoriteReducer, booksFavoritesReducer } from '../backend/reducers/booksReducers';

const reducers = combineReducers({
    booksQuery: booksQueryListReducer,
    bookFavorite: bookModifyFavoriteReducer,
    favoriteList: booksFavoritesReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;