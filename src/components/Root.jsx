import { React } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './header/Header';
import { LeftPanel } from './left_panel/LeftPanel';

export const Root = () => {
    return (
        <>
            <Header />
            <main>
                <LeftPanel />
                <Outlet />
            </main>
        </>
    );
};