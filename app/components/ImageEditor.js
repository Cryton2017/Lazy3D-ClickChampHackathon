import React, { Component } from 'react'

import styles from './ImageEditor.css'

class ImageEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mouseDown: false,
            mouseIn: true,
            drawingPoints: [],
            img: null,
        }
    }

    componentDidMount() {
        this.loadImage()
        this.setupSelectTool()
    }

    componentWillReceiveProps(newProps) {
        if (
            this.props.width !== newProps.width ||
      this.props.height !== newProps.height
        ) {
            this.loadImage(newProps.width, newProps.height)
        } else if (this.props.currentIndex === newProps.currentIndex) {
            return false
        } else {
            this.loadImage()
        }
    }

    loadImage(width = 0, height = 0) {
        const canvas = document.querySelector('#image-canvas')
        const canvas2 = document.querySelector('#editor-canvas')
        const canvasWrapper = document.querySelector('#canvas-wrapper')

        const context = canvas.getContext('2d')

        const imgWidth = width || this.props.width || 900
        const imgHeight = height || this.props.height || imgWidth * 0.5625

        const img = new Image(imgWidth, imgHeight)

        img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            canvas2.width = img.width
            canvas2.height = img.height
            canvasWrapper.style = `width: ${img.width}px; height: ${img.height}px`

            context.drawImage(img, 0, 0, img.width, img.height)

            this.setState({ img, drawingPoints: [] })
        }
        img.src = this.props.imgSrc
    }

    setupSelectTool() {
        const canvas = document.querySelector('#editor-canvas')
        const context = canvas.getContext('2d')

        canvas.addEventListener('mousemove', ev => {
            if (this.state.mouseDown) {
                this.draw(context, ev)
            }
        })

        canvas.addEventListener('mousedown', ev => {
            this.setState({ drawingPoints: [] })
            context.clearRect(0, 0, canvas.width, canvas.height)

            const x = ev.offsetX
            const y = ev.offsetY
            context.moveTo(x, y)
            context.beginPath()
            this.setState({ mouseDown: true })
        })

        canvas.addEventListener('mouseup', () => {
            context.closePath()

            context.fillStyle = 'rgba(0, 0, 255, 0.2)'
            context.fill()

            this.setState({ mouseDown: false })
        })

        canvas.addEventListener('mousein', () => {
            this.setState({ mouseIn: true })
        })

        canvas.addEventListener('mouseout', () => {
            this.setState({ mouseIn: false })
        })
    }

    draw(context, event) {
        const x = event.offsetX
        const y = event.offsetY

        context.lineTo(x, y)

        context.setLineDash([5])
        context.strokeStyle = 'black'
        context.lineWidth = 1

        this.state.drawingPoints.push([x, y])

        context.stroke()
    }

    clearSelect() {
        const canvas = document.querySelector('#editor-canvas')
        const context = canvas.getContext('2d')

        context.clearRect(0, 0, canvas.width, canvas.height)
    }

    redoPath() {
        const canvas = document.querySelector('#editor-canvas')
        const context = canvas.getContext('2d')

        const path = new Path2D()

        const [initX, initY] = this.state.drawingPoints[0]
        path.moveTo(initX, initY)

        this.state.drawingPoints.map(([x, y]) => {
            path.lineTo(x, y)
        })

        context.stroke(path)
        context.fill(path)
    }

    clip() {
        if (!this.state.drawingPoints.length) {
            return false
        }

        const imgCanvas = document.querySelector('#image-canvas')
        const imgContext = imgCanvas.getContext('2d')

        imgContext.clearRect(0, 0, imgCanvas.width, imgCanvas.height)

        const [startX, startY] = this.state.drawingPoints[0]

        imgContext.moveTo(startX, startY)

        this.state.drawingPoints.slice(1).map(([x, y]) => {
            imgContext.lineTo(x, y)
        })

        imgContext.clip()
        const img = this.state.img
        imgContext.drawImage(img, 0, 0, img.width, img.height)
        imgContext.restore()
        this.save()
    }

    clearClip() {
        this.loadImage()
        this.save()
    }

    save() {
        const canvas = document.querySelector('#image-canvas')
        const frameUri = canvas.toDataURL()

        this.props.updateFrame(this.props.currentIndex, frameUri)
    }

    render() {
        return (
            <div>
                <div id="canvas-wrapper" className={styles.canvasWrapper}>
                    <canvas id="image-canvas" className={styles.canvas} />
                    <canvas id="editor-canvas" className={styles.canvas} />
                </div>
                <button
                    onClick={this.clearSelect.bind(this)}
                    className={styles.clearButton}
                >
          Clear Select
                </button>
                <button
                    onClick={this.clearClip.bind(this)}
                    className={styles.clearButton}
                >
          Clear Clip
                </button>
                <button onClick={this.clip.bind(this)} className={styles.clearButton}>
          Clip
                </button>
            </div>
        )
    }
}

export default ImageEditor
