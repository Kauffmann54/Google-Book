import { combineReducers } from 'redux';
import { booksQueryListReducer, booksFavoritesReducer } from '../backend/reducers/booksReducers';

const reducers = combineReducers({
    booksQuery: booksQueryListReducer,
    favoriteList: booksFavoritesReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;