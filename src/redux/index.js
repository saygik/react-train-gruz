import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
import { createBrowserHistory } from 'history'
import createRootReducer from './reducer'

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
// const enhancer =applyMiddleware( sagaMiddleware, logger)
// const store = createStore(reducer, enhancer)
// sagaMiddleware.run(rootSaga)
// export default store


export default function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(history), // root reducer with router state
        preloadedState,
        compose(
            applyMiddleware(
                routerMiddleware(history), // for dispatching history actions
                sagaMiddleware,
                logger,
            ),
        ),
    )
    sagaMiddleware.run(rootSaga)
    return store
}



