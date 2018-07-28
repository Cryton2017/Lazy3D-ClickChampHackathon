/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react'
import { FormattedMessage } from 'react-intl'

import style from 'styles/style.css'
import VideoSplitter from '../../components/VideoSplitter'

import messages from './messages'

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
    render() {
        return (
            <div className='body'>
                <h1 className='heading1'>
                    <FormattedMessage {...messages.header} />
                </h1>
                <p className='paragraph'>
                    <FormattedMessage {...messages.info1} /><br />
                    <FormattedMessage {...messages.info2} /><br />
                    <FormattedMessage {...messages.info3} /><br />
                    <FormattedMessage {...messages.info4} />
                </p>
                <input type="file" name="pic" className='buttons' accept="image/*" />
                <input type='button' id='btnTest' className='buttons' value='Select File' />
            </div>
      
            <div className="body">
                <h1 className="heading1">
                    <FormattedMessage {...messages.header} />
                </h1>
                <VideoSplitter />
            </div>
        )
    }
}
