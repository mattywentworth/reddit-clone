import React, { useState } from 'react';
//import { images } from '../../assets/images';
import styles from './SearchBar.module.css';
import { editTerm } from './searchTermSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchTerm } from './searchTermSlice';
//test to see if useState helps update field value appropriately

//Look up approach to a search bar. Should it be a form? If so, how to include the magnifying glass search icon/button as the submit button?
//Think of any interesting/fun behavior you might want the search bar to have

export const SearchBar = () => {
    
    const dispatch = useDispatch();

    //const [searchTerm, setSearchTerm] = useState(''); Was going to use useState to temporarily store the search term, but
    //I think I want to try showing search results in the search bar, which will require updating the search term in state
    //with each character typed

    const searchTermState = useSelector(selectSearchTerm)

    const handleSearchChange = (e) => {
        dispatch(editTerm(e.target.value));
    }
    
    return (
        <form className={styles.form}>
            <input className={styles.input} onChange={handleSearchChange} value={searchTermState} type="text" id="search-input" name="search" /*</form>value="TBD"*/ placeholder="Search The Feed" minLength="1"></input>
            <button className={styles.searchButton} type="submit" aria-label="Search"></button> 
            {/*<i class="fa-solid fa-magnifying-glass"></i>*/}
        </form>
    )
};