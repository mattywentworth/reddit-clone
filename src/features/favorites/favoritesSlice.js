import { createSlice } from '@reduxjs/toolkit';

//Idea here was to be able to programmatically populate two PanelSection components in the left panel, but the way 
//I was thinking about it would require similar data structures being populated as props in each component, and I don't
//think I will have that. So I may need to create a new component for the favorites section

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        sectionName: 'Favorites',
        favoritesList: []
    },
    reducers: {
        addToFavorites: (state, action) => {
            //payload will be some specified detail of the individual post. it will be the id for now
            state.favorites.favoritesList.push(action.payload); //need to make this so it renders in descending order
        }
    }
})


export const selectFavorites = (state) => {
    return state.favorites;
}

export const { addToFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;