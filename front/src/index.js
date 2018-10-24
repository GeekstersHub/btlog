// @flow

import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';

import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import App from './App';
import rootReducer from './reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(logger)));

const root = document.getElementById('root');

if (root !== null) {
  ReactDOM.render(
    <Provider store={store}>
      <Fragment>
        <Header />
        <Container>
          <App />
        </Container>
      </Fragment>
    </Provider>,
    root,
  );
}
