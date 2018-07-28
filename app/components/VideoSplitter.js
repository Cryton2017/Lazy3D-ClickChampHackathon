import React, { Component } from 'react'
import styles from './VideoSplitter.css'

class VideoSplitter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fileObject: null,
            fileArrayBuffer: null,
            blobUrl: '',
            frameSrc: '',
        }

        this.handleChange = this.handleChange.bind(this)
    }

    range(start, stop, step = 1) {
        console.log(start, stop, step)
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
            video.onloadeddata = () => {
                // Create frame every .5s
                const frameTimes = this.range(0, video.duration, 0.5)

                const frames = frameTimes.map(time => {
                    video.currentTime = time
                    return this.generateFrames(video)
                })
                this.frameImgs(frames)
            }
            video.src = url
        }

        reader.readAsArrayBuffer(file)
    }

    generateFrames(video) {
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        canvas.getContext('2d').drawImage(video, 0, 0)

        const frameUri = canvas.toDataURL()
        return frameUri
    // this.setState({ frameSrc: frameUri })
    }

    frameImgs(urls) {
        urls.map(url => {
            const img = document.createElement('img')

            img.onload = () => {
                document.querySelector('#app').appendChild(img)
            }

            img.src = url
            img.className = styles.thumbnail
        })
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.handleChange} />
                <video className={styles.video} />
            </div>
        )
    }
}

export default VideoSplitter
