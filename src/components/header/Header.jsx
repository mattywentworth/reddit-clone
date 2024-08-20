import { React } from 'react';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';
import { HeaderButton } from './TBDButton';


export const Header = () => {
    return (
        <header>
            <Logo />
            <SearchBar />
            <HeaderButton />
        </header>
    );
};