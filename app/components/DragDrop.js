import React, { Component } from 'react'
import styles from './DragDrop.css'

class DragDrop extends Component {
    constructor(props) {
        super(props)
    }

    allowDrop(ev) {
        ev.preventDefault()
    }

    drag(ev) {
        ev.dataTransfer.setData('text', ev.target.id)
    }

    drop(ev) {
        ev.preventDefault()
        var data = ev.dataTransfer.getData('text')
        ev.target.appendChild(document.getElementById(data))
    }

    render() {
        return (
            <div>
                <div
                    id="div1"
                    className={styles.trash}
                    ondrop={this.drop(event)}
                    ondragover={this.allowDrop(event)}
                />

                <div className={styles.testImage}>
                    <image
                        id="drag1"
                        src="images/testImage.jpg"
                        draggable={true}
                        ondragover={this.allowDrop(event)}
                    />
                </div>
            </div>
        )
    }
}

export default DragDrop
