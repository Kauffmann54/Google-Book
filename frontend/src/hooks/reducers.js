import { combineReducers } from 'redux';
import { booksQueryListReducer } from '../backend/reducers/booksReducers';

const reducers = combineReducers({
    booksQuery: booksQueryListReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;