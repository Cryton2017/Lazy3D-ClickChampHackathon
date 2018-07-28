import React from 'react'
import { FormattedMessage } from 'react-intl'

import styles from 'styles/style.css'

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
            <div>
                <h1 className={styles.heading1}>
                    <FormattedMessage {...messages.header} />
                </h1>
                <ImageEditor imgSrc={TestImg} />
            </div>
        )
    }
}
