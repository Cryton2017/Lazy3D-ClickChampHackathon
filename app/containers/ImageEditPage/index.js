import React from 'react'
import { FormattedMessage } from 'react-intl'

import styles from 'styles/editor.css';

import messages from './messages'

/* eslint-disable react/prefer-stateless-function */
export default class VideoEditPage extends React.PureComponent {
    render() {

        return (

            <div className={styles.body}>
                <div className={styles.header}>

                </div>
                <div className={styles.TSF}>
                    <div className={styles.tools}>
                        <p>Tools</p>
                    </div>
                    <div className={styles.screen}>

                    </div>
                </div>
                <div className={styles.bottomToolBar}>
                
                </div>
                <div className={styles.toolBarCenterBox}>

                </div>

            </div>
            
        )

        
    }

    
}
