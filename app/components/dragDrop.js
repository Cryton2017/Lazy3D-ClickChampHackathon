import React, { Component } from 'react'
import styles from './DragDrop.css'

class dragDrop extends Component {

	allowDrop(ev) {
		ev.preventDefault();
	}
	
	drag(ev) {
		ev.dataTransfer.setData("text", ev.target.id);
	}
	
	drop(ev) {
		ev.preventDefault();
		var data = ev.dataTransfer.getData("text");
		ev.target.appendChild(document.getElementById(data));
	}

	render() {
        return (
            <div className='trash' ondrop={this.drop(event)} ondragover={this.allowDrop(event)}>   
            </div>
        )
    }
}

export default DragDrop