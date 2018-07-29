import React from 'react'
import { FormattedMessage } from 'react-intl'

import styles from 'styles/editor.css'

import messages from './messages'

import ImageEditor from 'components/ImageEditor'
import BadPractice from 'components/BadPractice'

import TestImg from './TestImg'

/* eslint-disable react/prefer-stateless-function */
export default class VideoEditPage extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            Frames: [],
            html: "",
        }

        this.addImageToEditor = this.addImageToEditor.bind(this)
    }


    componentWillMount() {
        const frames = BadPractice.get()
        this.addImageToEditor(frames);
    }

    addImageToEditor(Frames){
        var length = Frames.length;
        var FrameDisplay = [];

        var temp = "<div className='styles.photoFramesContainer'>";
        for(var i=1; i<=length; i++){
            temp = temp +"<div className='styles.photoFrame'>" +
                            "<img id='img"+i+"' src='"+ Frames[i] + "' />" +
                         "</div>";
        }
        temp = temp + "</div>";
        return temp;
    }

    render() {
        return (
            <div className={styles.body}>
                <div className={styles.header} />
                <div className={styles.TSF}>
                    <div className={styles.tools}>
                        <div className={styles.toolsHeader}>
                            <p >Tools</p>
                        </div>
                        <div className={styles.toolSelection}>
                        <div className={styles.lassoWhite}>
                            <img id='lassoWhiteBtn' src={require('images/Editor/lassoWhite.png')} />
                        </div>
                        <div className={styles.lassoBlack}>
                            <img id='lassoBlackBtn' src={require('images/Editor/lassoBlack.png')} />
                        </div>
                        <div className={styles.brushWhite}>
                            <img id='brushWhiteBtn' src={require('images/Editor/brushWhite.png')} />
                        </div>
                        <div className={styles.brushBlack}>
                            <img id='brushBlackBtn' src={require('images/Editor/brushBlack.png')} />
                        </div>
                        <div className={styles.eyedropper}>
                            <img id='eyedropperBtn' src={require('images/Editor/eyedropper.png')} />
                        </div>
                        </div>
                    </div>
                    <div className={styles.screen}> 

                    </div>
                    <div className={styles.frameSelector}>
                        <div className={styles.frameSelectorHeader}>
                            <p>Frame</p>
                        </div>
                        this.addImageToEditor()
                    </div>
                </div>
                <div className={styles.BTS}>
                    <div className={styles.bottomToolBar}>
                        <div className={styles.RUD}>
                            <div className={styles.undoButton}>
                                <img id='undoBtn' src={require('images/Editor/undo-arrow.png')} />
                            </div>
                            <div className={styles.redoButton}>
                                <img id='redoBtn' src={require('images/Editor/redo-arrow.png')} />
                            </div>
                            <div className={styles.deleteButton}>
                                <img id='deleteBtn' src={require('images/Editor/delete.png')} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.saveBox}>
                        <div className={styles.saveBoxHeader}>
                            <p>Save</p>
                        </div>
                        <div className={styles.saveButton}>
                            <img id='saveBtn' src={require('images/Editor/save.png')} />
                        </div>
                    </div>
                </div>

                <div className={styles.toolBarCenterBox}>
                    <div className={styles.mediaControls}>
                        <div className={styles.leftArrow}>
                            <img id='laBtn' src={require('images/Editor/left arrow.png')} />
                        </div>
                        <div className={styles.playButton}>
                            <img id='playBtn' src={require('images/Editor/play-button.png')} />
                        </div>
                        <div className={styles.rightArrow}>
                            <img id='raBtn' src={require('images/Editor/right arrow.png')} />
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}
