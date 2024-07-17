import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import configureStore from './redux'
import { Provider } from 'react-redux'

import { BrowserRouter } from 'react-router-dom';

const store = configureStore(/* provide initial state if any */)
window.store = store
ReactDOM.render(

    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
