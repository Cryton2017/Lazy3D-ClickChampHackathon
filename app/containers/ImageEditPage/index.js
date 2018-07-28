import React from 'react'
import { FormattedMessage } from 'react-intl'

import styles from 'styles/editor.css'

import messages from './messages'

import ImageEditor from 'components/ImageEditor'
import BadPractice from 'components/BadPractice'

import TestImg from './TestImg'

/* eslint-disable react/prefer-stateless-function */
export default class VideoEditPage extends React.PureComponent {
    componentWillMount() {
        const frames = BadPractice.get()
        console.log(frames)
    }

    render() {
        return (
            <div className={styles.body}>
                <div className={styles.header} />
                <div className={styles.TSF}>
                    <div className={styles.tools}>
                        <p>Tools</p>
                    </div>
                    <div className={styles.screen} />
                </div>
                <div className={styles.bottomToolBar} />
                <div className={styles.toolBarCenterBox} />
            </div>
        )
    }
}
