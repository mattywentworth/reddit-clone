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
    //const [popularSubsUrls, setPopularSubsUrls] = useState([]);

    const dispatch = useDispatch();


    const popularSubs = useSelector(selectPopularSubs);
    const popularSubsArray = popularSubs[1];
    const loading = useSelector(isLoading);
    const error = useSelector(hasError);

    /*popularSubs.map(popularSub => {
        const newArrayElement = {}
        
        setPopularSubs([
            ...popularSubsUrls
        ])
    })*/

    const handleCollapseClick = (e) => { 
        arrowUp ? setArrowUp(false) : setArrowUp(true);
    }

    useEffect(() => {
        dispatch(fetchPopularSubs());
    }, [dispatch]);


    if (popularSubs.length === 0 || loading) {//Why is popularSubsArray being calculated so slowly that it doesn't render the .map, even though the data is there?
        return (
            <div className={styles.panelLoading}>
                <img src='https://cdn.theatlantic.com/thumbor/7ehJ3wB43COlHP49_ZwAefSxS7g=/0x0:2000x1125/960x540/media/img/mt/2020/06/0620_Katie_Reddit_alt3/original.png'></img>
            </div>
        )
    } else if (error) {
        return <p>Error</p>
    }


    return (
        <div key='updateThisTest' id='anotherTest' >
            {/*<p>{popularSubs}</p>*/}
            <div className={styles.rowOne} onClick={handleCollapseClick}>
                <h5>{popularSubs[0]}</h5>
                <i class={arrowUp ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"}  id='popSubsArrow' className={arrowUp ? styles.arrowUpFlip : styles.arrowDownFlip}></i>
            </div>
            <div id="testTargetForCollapse" className={arrowUp ? styles.arrowUpVisible : styles.arrowDownDisappear}>
                {popularSubsArray.map(popularSub => {
                return <PanelTile popularSub={popularSub} key={popularSub.data.id} testUrl={`reddit.com/r/NoStupidQuestions.json`} />
                })}
            </div>
        </div>
    )
}