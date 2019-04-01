import "@babel/polyfill";
import "isomorphic-fetch";

import React, {Component} from 'react'
import Root from './components/Root'
import configureStore, { history } from './redux'
import {Provider} from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

const store = configureStore(/* provide initial state if any */)


class App extends Component {
    render() {
        return <Provider store={store}>
            <ConnectedRouter history={history}>
                <Root/>
            </ConnectedRouter>
        </Provider>
    }
}
export default App
