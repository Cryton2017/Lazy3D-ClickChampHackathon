import React from 'react'
import { FormattedMessage } from 'react-intl'
import { history } from '../../app'

import styles from 'styles/style.css'

import messages from './messages'
import VideoSplitter from 'components/VideoSplitter.js'
import BadPractice from 'components/BadPractice.js'
import DragDrop from 'components/DragDrop.js'

export default class HomePage extends React.PureComponent {
    waitForRender(percentage) {
        if (percentage >= 100) {
            setTimeout(() => {
                history.push('/ImageEditPage')
            }, 500)
        }
    }

    setFrames(frames) {
        BadPractice.set(frames)
    }

    render() {
        return (
            <div className={styles.body}>
                <h1 className={styles.heading1}>
                    <FormattedMessage {...messages.header} />
                </h1>
                <p className={styles.paragraph}>
                    <FormattedMessage {...messages.info1} />
                    <br />
                    <FormattedMessage {...messages.info2} />
                    <br />
                    <FormattedMessage {...messages.info3} />
                    <br />
                    <FormattedMessage {...messages.info4} />
                </p>
                <div className={styles.videoSplitter}>
                    <VideoSplitter
                        frames={this.setFrames}
                        percentage={this.waitForRender}
                    />
                </div>
                {/* <div className={styles.trash}>
                    <DragDrop />
                </div> */}
            </div>
        )
    }
}
