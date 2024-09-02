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

    //const [searchTerm, setSearchTerm] = useState('');

    const searchTermState = useSelector(selectSearchTerm)

    const handleSearchChange = (e) => {
        dispatch(editTerm(e.target.value));
    }
    
    return (
        <form>
            <input className={styles.input} onChange={handleSearchChange} value={searchTermState} type="text" id="search-input" name="search" /*</form>value="TBD"*/ placeholder="Search Reddit Clone" minLength="1"></input>
            <button className={styles.searchButton} type="submit"></button> 
        </form>
    )
};