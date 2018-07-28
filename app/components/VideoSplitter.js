import React, { Component } from 'react'
import styles from './VideoSplitter.css'

class VideoSplitter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blobUrl: '',
            percentage: 0,
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
                const frameTimes = this.range(0, video.duration, 0.5)

                for (let i = 0; i < frameTimes.length; i++) {
                    const time = frameTimes[i]
                    video.currentTime = time
                    await this.timeout(400)
                    await this.generateFrame(video)
                    this.setState({ percentage: (i + 1) / frameTimes.length })
                    this.props.percentage(this.state.percentage)
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

    async generateFrame(video) {
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        canvas.getContext('2d').drawImage(video, 0, 0)

        const frameUri = canvas.toDataURL()

        const img = new Image()
        img.src = frameUri
        img.className = styles.thumbnail
        document.querySelector('#app').appendChild(img)

        return frameUri
    }

    frameImgs(urls) {
        if (!(urls instanceof Array)) {
            urls = [urls]
        }
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
                <input type="file" onChange={this.handleChange} accept="video/*"/>
                <video className={styles.video} />
            </div>
        )
    }
}

export default VideoSplitter
