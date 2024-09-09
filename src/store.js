import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer from './features/search/searchTermSlice';
import feedReducer from './features/feed/feedSlice';

export default configureStore({
    reducer: {
        searchTerm: searchTermReducer,
        feed: feedReducer
    }
});