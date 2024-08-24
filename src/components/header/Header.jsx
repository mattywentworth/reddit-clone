import { React } from 'react';
import { Logo } from './Logo';
import { SearchBar } from '../../features/search/SearchBar';
import { HeaderButton } from './TBDButton';
import styles from './Header.module.css';


export const Header = () => {
    return (
        <header className={styles.header}>
            <Logo />
            <SearchBar />
            <HeaderButton />
        </header>
    );
};