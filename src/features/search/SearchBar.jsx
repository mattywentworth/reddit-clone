import { React } from 'react';
import { images } from '../../assets/images';

//Look up approach to a search bar. Should it be a form? If so, how to include the magnifying glass search icon/button as the submit button?
//Think of any interesting/fun behavior you might want the search bar to have

export const SearchBar = () => {
    return (
        <form>
            <input type="text" id="search-input" name="search" value="TBD" placeholder="Search Reddit Clone" minlength="1"></input>
            <button type="submit"></button> 
        </form>
    )
};