import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import configureStore, { history } from './redux'
import {Provider} from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

const store = configureStore(/* provide initial state if any */)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)
