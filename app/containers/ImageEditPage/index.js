import React from 'react'
import { FormattedMessage } from 'react-intl'

import styles from 'styles/editor.css'

import messages from './messages'

import ImageEditor from 'components/ImageEditor'
import BadPractice from 'components/BadPractice'
import JSZip from 'jszip'
import { saveAs } from 'file-saver/FileSaver'

import TestImg from './TestImg'

/* eslint-disable react/prefer-stateless-function */
export default class VideoEditPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            frames: [],
            currentFrameIdx: 0,
        }
    }

    componentWillMount() {
        const frames = BadPractice.get().sort((a, b) => {
            return a.i - b.i
        })

        this.setState({ frames })
    }

    nextFrame() {
        const idx = this.state.currentFrameIdx
        const newIdx = Math.min(idx + 1, this.state.frames.length - 1)
        this.setState({ currentFrameIdx: newIdx })
    }

    prevFrame() {
        const idx = this.state.currentFrameIdx
        const newIdx = Math.max(idx - 1, 0)
        this.setState({ currentFrameIdx: newIdx })
    }

    updateFrame(index, newFrame) {
        const newFrames = [...this.state.frames]
        newFrames[index] = { i: index, frameUri: newFrame }
        this.setState({ frames: newFrames })
    }

    exportFrames() {
        const zip = new JSZip()
        this.state.frames.map(({ i, frameUri }) => {
            const png = frameUri.split(',')[1]
            zip.file(`frame-${i}.png`, png, { base64: true })
        })

        zip.generateAsync({ type: 'blob' }).then(content => {
            saveAs(content, 'images-export.zip')
        })
    }

    render() {
        const { frames, currentFrameIdx } = this.state
        const currentFrame = frames[currentFrameIdx]

        return (
            <div className={styles.body}>
                <div className={styles.header} />
                <div className={styles.TSF}>
                    <div className={styles.tools}>
                        <p>Tools</p>
                    </div>
                    <div className={styles.screen}>
                        <ImageEditor
                            imgSrc={currentFrame.frameUri}
                            currentIndex={currentFrameIdx}
                            updateFrame={this.updateFrame.bind(this)}
                        />
                    </div>
                </div>
                {this.state.currentFrameIdx}
                <div className={styles.bottomToolBar}>
                    <button onClick={this.prevFrame.bind(this)}>Prev</button>
                    <button onClick={this.nextFrame.bind(this)}>Next</button>
                </div>
                <div className={styles.toolBarCenterBox} />
                <button onClick={this.exportFrames.bind(this)}>Export</button>
            </div>
        )
    }
}
