import React from 'react'
import { FormattedMessage } from 'react-intl'

import styles from 'styles/style.css';

import messages from './messages'

/* eslint-disable react/prefer-stateless-function */
export default class VideoEditPage extends React.PureComponent {
    render() {

        return (

            <div>
                <h1 className={styles.heading1}>
                    <FormattedMessage {...messages.header} />
                </h1>
            </div>
            
        )

        
    }

    
}
