import React, { useEffect } from 'react';
import styles from './PanelSection.module.css';
import { PanelTile } from './PanelTile';
import { fetchPopularSubs, selectPopularSubs, isLoading } from './panelSlice';
import { useSelector, useDispatch } from 'react-redux';

//THIS COMPONENT IS OCCASIONALLY CAUSING ISSUES WITH THE POPULATION OF STATE VALUES - NEED TO SEPARATE INTO A DIFFERENT SLICE???
////It seems like something gets messed up in the order of populating state and then rendering the state in this component
////The popular subs (and the feed) aren't updating their respective arrays with values, and then there is an error on the map method

export const PanelSection = ( /*{popularSubs}*/ ) => {

    const dispatch = useDispatch();


    const popularSubs = useSelector(selectPopularSubs);
    const popularSubsArray = popularSubs[1];
    const loading = useSelector(isLoading);

    useEffect(() => {
        dispatch(fetchPopularSubs());
    }, [dispatch]);


    if (popularSubs.length === 0 || loading) {//Why is popularSubsArray being calculated so slowly that it doesn't render the .map, even though the data is there?
        return <p>Loading...</p>
    }


    return (
        <div>
            {/*<p>{popularSubs}</p>*/}
            <div className={styles.rowOne}>
                <h5>{popularSubs[0]}</h5>
                <i class="fa-solid fa-caret-up"></i> {/* Will need to add JS when clicked so that it rotates 180 degrees */}
            </div>
            {popularSubsArray.map(popularSub => {
                return <PanelTile popularSub={popularSub} />
            })}
        </div>
    )
}