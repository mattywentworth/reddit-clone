import React, { useEffect } from 'react';
import styles from './PanelSection.module.css';
import { PanelTile } from './PanelTile';
import { fetchPopularSubs, selectPopularSubs, isLoading } from './panelSlice';
import { useSelector, useDispatch } from 'react-redux';

export const PanelSection = () => {
    
    const dispatch = useDispatch();
    
    const popularSubs = useSelector(selectPopularSubs);
    const loading = useSelector(isLoading);

    useEffect(() => {
        dispatch(fetchPopularSubs());
    }, [dispatch]);

    
    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className={styles.rowOne}>
                <h5>EXAMPLE</h5>
                <i class="fa-solid fa-caret-up"></i> {/* Will need to add JS when clicked so that it rotates 180 degrees */}
            </div>
            <PanelTile />
        </div>
    )
}