import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer from './features/search/searchTermSlice';
import feedReducer from './features/feed/feedSlice';
import panelReducer from './features/panel/panelSlice';
import commentsReducer from './features/comments/commentsSlice';
import favoritesReducer from './features/favorites/favoritesSlice';

export default configureStore({
    reducer: {
        searchTerm: searchTermReducer,
        feed: feedReducer,
        panel: panelReducer,
        comments: commentsReducer,
        favorites: favoritesReducer
    }
});