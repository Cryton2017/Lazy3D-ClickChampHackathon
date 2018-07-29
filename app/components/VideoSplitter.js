import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Progress from 'react-progressbar'
import styles from './VideoSplitter.css'

class VideoSplitter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blobUrl: '',
            percentage: 0,
            frames: [],
        }

        this.handleChange = this.handleChange.bind(this)
    }

    timeout(ms) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, ms)
        })
    }

    range(start, stop, step = 1) {
        return Array(Math.ceil((stop - start) / step))
            .fill(start)
            .map((x, y) => x + y * step)
    }

    handleChange(event) {
        const file = event.target.files[0]
        const reader = new FileReader()

        reader.onloadend = ev => {
            const fileArrayBuffer = ev.target.result
            const blob = new Blob([fileArrayBuffer], { type: file.type })

            const url = window.URL.createObjectURL(blob)
            // this.setState({ blobUrl: url })

            const video = document.querySelector('video')

            video.onloadeddata = async () => {
                // Create frame every .5s
                this.setState({ frames: [] })
                const frameTimes = this.range(0, video.duration, 0.5)

                for (let i = 0; i < frameTimes.length; i++) {
                    const time = frameTimes[i]
                    video.currentTime = time
                    await this.timeout(400)
                    await this.generateFrame(video, i)
                    this.setState({ percentage: ((i + 1) / frameTimes.length) * 100 })

                    if (this.props.percentage) {
                        this.props.percentage(this.state.percentage)
                    }
                }

                if (this.props.frames) {
                    this.props.frames(this.state.frames)
                }
            }
            video.src = url
        }

        reader.readAsArrayBuffer(file)
    }

    waitForEvent(el, event = 'onload') {
        return new Promise(resolve => {
            el[event] = () => {
                resolve()
            }
        })
    }

    async generateFrame(video, i) {
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        canvas.getContext('2d').drawImage(video, 0, 0)

        const frameUri = canvas.toDataURL()

        this.state.frames.push({ i, frameUri })
        // const img = new Image()
        // img.src = frameUri
        // img.className = styles.thumbnail
        // document.querySelector('#app').appendChild(img)

        return frameUri
    }

    render() {
        return (
            <div>
                <div className="upload-btn-wrapper">
                    {/* <button className="btn" >Upload a file</button> */}
                    <label className="btn">Choose File
                        <input type="file" onChange={this.handleChange} name="myfile"  accept="video/*"/>
                    </label>
                </div>
                <div>
                    {/* <input type="file" onChange={this.handleChange} accept="video/*" /> */}
                    <video className={styles.video} />
                </div>
                <div className={styles.progress}>
                    <Progress completed={this.state.percentage} color="blue" />
                </div>
            </div>
        )
    }
}

export default VideoSplitter
