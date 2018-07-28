import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from 'containers/HomePage/Loadable'
import NotFoundPage from 'containers/NotFoundPage/Loadable'
import ImageEditPage from 'containers/ImageEditPage/Loadable'

export default function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/ImageEditPage" component={ImageEditPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    )
}
