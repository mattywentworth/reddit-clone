import React, { useEffect } from 'react';
import styles from './LeftPanel.module.css';
import { PanelSection } from '../../features/panel/PanelSection';
import { fetchPopularSubs, selectPopularSubs, isLoading, hasError, selectTest } from '../../features/panel/panelSlice';
import { useSelector, useDispatch } from 'react-redux';

//Still need to figure out what will be in this component. Just using as a placeholder for now.
//Want to have a part of state render another PanelSection component showing recent subs/posts viewed comments for


export const LeftPanel = () => {
    /*
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchPopularSubs());
    }, [dispatch]);

    const popularSubs = useSelector(selectPopularSubs);
    const loadingPopularSubs = useSelector(isLoading);
    const errorLoading = useSelector(hasError);
    const test = useSelector(selectTest);

    useEffect(() => {
        dispatch(fetchPopularSubs());
    }, [dispatch]);

    if (loadingPopularSubs) {
        return <div>Loading...</div>
    } else if (errorLoading) {
        return <div>Error</div>
    }
    */

    return (
        <div className={styles.panelContainer}>
            {/*<p>{test[0]}</p>*/}
            {/*<p>{popularSubs[0].data.display_name_prefixed}</p>*/}
            <PanelSection /*popularSubs={popularSubs}*/ />
            {/*<PanelSection />*/}
            <ul>
                <li>jibber</li>
                <li>jabber</li>
                <li>flim</li>
                <li>flam</li>
            </ul>
        </div>
    );
};