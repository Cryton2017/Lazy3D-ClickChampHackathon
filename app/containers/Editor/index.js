import React, { PureComponent } from 'react'

import ImageEditor from '../../components/ImageEditor'
import TestImg from './TestImg'

export default class Editor extends PureComponent {
    render() {
        return <ImageEditor imgSrc={TestImg} />
    }
}
