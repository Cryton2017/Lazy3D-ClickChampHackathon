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
                <div className={styles.heading1}>
                    <img src={require('images/Logo/logo.png')} />
                </div>
                
                <p className={styles.paragraph}>
                    <FormattedMessage {...messages.info5} />
                </p>
                <div className={styles.videoSplitter}>
                    <VideoSplitter
                        frames={this.setFrames}
                        percentage={this.waitForRender}
                    />
                </div>
                <div className={styles.InfoImage}>
                    <div className={styles.InfoImage1}>
                        <img id="img"src={require('images/Info/1-film icon.png')} />
                    </div>
                    <div className={styles.InfoImage2}>
                        <img id="img"src={require('images/Info/2-film-editor icon.png')} />
                    </div>
                    <div className={styles.InfoImage3}>
                        <img id="img"src={require('images/Info/3-film with pen icon.png')} />
                    </div>
                    <div className={styles.InfoImage4}>
                        <img id="img1"src={require('images/Info/4-pink tick icon.png')} />
                    </div>
                </div>
                <div className={styles.InfoText}>
                    <div className={styles.InfoText1}>
                        <p id="text">
                            <FormattedMessage {...messages.info1} />
                        </p>    
                    </div>
                    <div className={styles.InfoText2}>
                        <p id="text">
                            <FormattedMessage {...messages.info2} />
                        </p>    
                    </div>
                    <div className={styles.InfoText3}>
                        <p id="text">
                            <FormattedMessage {...messages.info3} />
                        </p>    
                    </div>
                    <div className={styles.InfoText4}>
                        <p id="text">
                            <FormattedMessage {...messages.info4} />
                        </p>    
                    </div>
                </div>
            </div>
        )
    }
}
