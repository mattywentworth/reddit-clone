import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer from './features/search/searchTermSlice';
import feedReducer from './features/feed/feedSlice';
import panelReducer from './features/panel/panelSlice';

export default configureStore({
    reducer: {
        searchTerm: searchTermReducer,
        feed: feedReducer,
        panel: panelReducer
    }
});