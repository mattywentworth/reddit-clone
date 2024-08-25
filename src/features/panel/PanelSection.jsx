import { React } from 'react';
import styles from './PanelSection.module.css';

export const PanelSection = () => {
    return (
        <div>
            <div className={styles.rowOne}>
                <h5>EXAMPLE</h5>
                <i class="fa-solid fa-caret-up"></i> {/* Will need to add JS when clicked so that it rotates 180 degrees */}
            </div>
        </div>
    )
}