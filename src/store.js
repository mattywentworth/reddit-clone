import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer from './features/search/searchTermSlice';

export default configureStore({
    reducer: {
        searchTerm: searchTermReducer
    }
});