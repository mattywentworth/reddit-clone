import React, { useEffect, useState } from 'react';
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

    const [leftPanelVisible, setLeftPanelVisible] = useState(false);

    const windowWidth = window.screen.width;
   

    //I want to write a click handler that expands the left panel and situates the button to the right of it
    //exposing the left panel is easy.
    
    const handleLeftPanelButtonClick = () => {
        //e.preventDefault();
        //alert(leftPanelVisible);
        leftPanelVisible ? setLeftPanelVisible(false) : setLeftPanelVisible(true);
        //alert(leftPanelVisible);
    }
    
    let buttonContent;
    leftPanelVisible ? buttonContent = '▶︎Expand Popular Subs▶︎' : buttonContent = '◀︎Hide Popular Subs◀︎';
    /*if (!leftPanelVisible) {
        return (
            ▶︎Expand Popular Subs▶︎
        )
    }*/
    
    //{!leftPanelVisible ? buttonContent = (<span>'▶︎'</span>'Expand Popular Subs'<span>'▶︎'</span>) : buttonContent = (<span>'◀︎'</span>'Hide Popular Subs'<span>'◀︎'</span>);}

    /*Create another div at the same level as the main div here. Have a p element inside it, and rotate the entire div */
    return (
        <div>
            <div className={leftPanelVisible ? styles.panelContainer : styles.panelContainerExpanded}>
                {/*<p>{test[0]}</p>*/}
                {/*<p>{popularSubs[0].data.display_name_prefixed}</p>*/}
                <PanelSection /*popularSubs={popularSubs}*/ />
                {/*<PanelSection />*/}
            </div>
            <button className={leftPanelVisible ? styles.miniContainer : styles.miniContainerX} onClick={handleLeftPanelButtonClick}>{buttonContent}</button>
        </div>
    );
};