import React from 'react'
import { FormattedMessage } from 'react-intl'

import styles from 'styles/editor.css'

import messages from './messages'

import ImageEditor from 'components/ImageEditor'
import BadPractice from 'components/BadPractice'
import JSZip from 'jszip'
import { saveAs } from 'file-saver/FileSaver'

/* eslint-disable react/prefer-stateless-function */
export default class VideoEditPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            frames: [],
            currentFrameIdx: 0,
            editorWidth: 0,
            editorHeight: 0,
            html: '',
        }

        this.addImageToEditor = this.addImageToEditor.bind(this)
        this.editor = React.createRef()
    }

    componentWillMount() {
        const frames = BadPractice.get().sort((a, b) => {
            return a.i - b.i
        })

        this.setState({ frames })
    }

    componentDidMount() {
        const { clientWidth, clientHeight } = document.querySelector(
            '#editor-screen',
        )
        this.setState({ editorWidth: clientWidth, editorHeight: clientHeight })
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
    // console.log('UpdateFrames:', this)
        const newFrames = [...this.state.frames]
        newFrames[index] = { i: index, frameUri: newFrame }
        this.setState({ frames: newFrames })
    }

    exportFrames() {
        const pad = num => {
            return `000${num}`.slice(-3)
        }

        const zip = new JSZip()
        this.state.frames.map(({ i, frameUri }) => {
            const png = frameUri.split(',')[1]
            zip.file(`frame${pad(i)}.png`, png, { base64: true })
        })

        zip.generateAsync({ type: 'blob' }).then(content => {
            saveAs(content, 'lazy3d-frames-export.zip')
        })
    }

    addImageToEditor() {
        var length = this.state.frames.length;
        var FrameDisplay = []

        const divArray = []

        const frames = this.state.frames
        console.log(frames)
        for (var i = 0; i < length; i++) {
            divArray.push(<div className={styles.photoFrame}><img id={`img${i}`} className={styles.images} src={frames[i].frameUri} /></div>)
        }
        var temp = <div className={styles.photoFramesContainer}>
            {divArray}
        </div>

        return temp
    }

    doClip() {
        this.editor.current.clip()
    }

    render() {
        const { frames, currentFrameIdx } = this.state
        const currentFrame = frames[currentFrameIdx]
        console.log('render', currentFrame)

        return (
            <div className={styles.body}>
                <div className={styles.header} />
                <div className={styles.TSF}>
                    <div className={styles.tools}>
                        <div className={styles.toolsHeader}>
                            <p>Tools</p>
                        </div>
                        <div className={styles.toolSelection}>
                            <div className={styles.lassoWhite}>
                                <img
                                    id="lassoWhiteBtn"
                                    src={require('images/Editor/lassoWhite.png')}
                                />
                            </div>
                            <div className={styles.lassoBlack}>
                                <img
                                    id="lassoBlackBtn"
                                    src={require('images/Editor/lassoBlack.png')}
                                />
                            </div>
                            <div className={styles.brushWhite}>
                                <img
                                    id="brushWhiteBtn"
                                    src={require('images/Editor/brushWhite.png')}
                                />
                            </div>
                            <div className={styles.brushBlack}>
                                <img
                                    id="brushBlackBtn"
                                    src={require('images/Editor/brushBlack.png')}
                                />
                            </div>
                            <div
                                className={styles.eyedropper}
                                onClick={this.doClip.bind(this)}
                            >
                                <img
                                    id="eyedropperBtn"
                                    src={require('images/Editor/clip.png')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.screen} id="editor-screen">
                        <ImageEditor
                            imgSrc={currentFrame.frameUri}
                            currentIndex={currentFrameIdx}
                            updateFrame={this.updateFrame.bind(this)}
                            width={this.state.editorWidth}
                            height={this.state.editorHeight}
                            ref={this.editor}
                        />
                    </div>
                    <div className={styles.frameSelector}>
                        <div className={styles.frameSelectorHeader}>
                            <p>Frame</p>
                        </div>
                        {this.addImageToEditor()}
                    </div>
                </div>
                <div className={styles.BTS}>
                    <div className={styles.bottomToolBar}>
                        <div className={styles.RUD}>
                            <div className={styles.undoButton}>
                                <img
                                    id="undoBtn"
                                    src={require('images/Editor/undo-arrow.png')}
                                />
                            </div>
                            <div className={styles.redoButton}>
                                <img
                                    id="redoBtn"
                                    src={require('images/Editor/redo-arrow.png')}
                                />
                            </div>
                            <div className={styles.deleteButton}>
                                <img id="deleteBtn" src={require('images/Editor/delete.png')} />
                            </div>
                        </div>
                    </div>
                    <div
                        className={styles.saveBox}
                        onClick={this.exportFrames.bind(this)}
                    >
                        <div className={styles.saveBoxHeader}>
                            <p>Save</p>
                        </div>
                        <div className={styles.saveButton}>
                            <img id="saveBtn" src={require('images/Editor/save.png')} />
                        </div>
                    </div>
                </div>

                <div className={styles.toolBarCenterBox}>
                    <div className={styles.mediaControls}>
                        <div
                            className={styles.leftArrow}
                            onClick={this.prevFrame.bind(this)}
                        >
                            <img id="laBtn" src={require('images/Editor/left arrow.png')} />
                        </div>
                        <div className={styles.playButton}>
                            <img
                                id="playBtn"
                                src={require('images/Editor/play-button.png')}
                            />
                        </div>
                        <div
                            className={styles.rightArrow}
                            onClick={this.nextFrame.bind(this)}
                        >
                            <img id="raBtn" src={require('images/Editor/right arrow.png')} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
