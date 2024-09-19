import React, { useState, useEffect } from 'react';
import styles from './PanelSection.module.css';
import { PanelTile } from './PanelTile';
import { fetchPopularSubs, selectPopularSubs, isLoading, hasError } from './panelSlice';
import { useSelector, useDispatch } from 'react-redux';

//THIS COMPONENT IS OCCASIONALLY CAUSING ISSUES WITH THE POPULATION OF STATE VALUES - NEED TO SEPARATE INTO A DIFFERENT SLICE???
////It seems like something gets messed up in the order of populating state and then rendering the state in this component
////The popular subs (and the feed) aren't updating their respective arrays with values, and then there is an error on the map method

export const PanelSection = ( /*{popularSubs}*/ ) => {
    
    const [arrowUp, setArrowUp] = useState(true);

    const dispatch = useDispatch();


    const popularSubs = useSelector(selectPopularSubs);
    const popularSubsArray = popularSubs[1];
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);


    const handleCollapseClick = (e) => {
        const clickedElement = document.getElementById(e.target.id);
        //const target = document.getElementById('testTargetForCollapse');
        arrowUp ? setArrowUp(false) : setArrowUp(true);
        //alert(arrowUp);
        //ISSUE - the way i've written this, you have to click the arrow twice in order for it to start responding to the function
        /*if (target.style.display === 'block') {
            //target.style.display = 'none';
            clickedElement.style.transform = 'rotate(180deg)';
        } else {
            clickedElement.style.transform = 'rotate(0deg)';
            //target.style.display = 'block';
        }*/
    }

    useEffect(() => {
        dispatch(fetchPopularSubs());
    }, [dispatch]);


    if (popularSubs.length === 0 || loading) {//Why is popularSubsArray being calculated so slowly that it doesn't render the .map, even though the data is there?
        return <p>Loading...</p>
    } else if (error) {
        return <p>Error</p>
    }


    return (
        <div key='updateThisTest' id='anotherTest'>
            {/*<p>{popularSubs}</p>*/}
            <div className={styles.rowOne}>
                <h5>{popularSubs[0]}</h5>
                <i class={arrowUp ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"} onClick={handleCollapseClick} id='popSubsArrow' className={arrowUp ? styles.arrowUpFlip : styles.arrowDownFlip}></i>
            </div>
            <div id="testTargetForCollapse" className={arrowUp ? styles.arrowUpVisible : styles.arrowDownDisappear}>
                {popularSubsArray.map(popularSub => {
                return <PanelTile popularSub={popularSub} key={popularSub.data.id} />
                })}
            </div>
        </div>
    )
}