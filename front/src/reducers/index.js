// @flow

import { combineReducers } from 'redux';
import transactionsReducer from './transactions';

const rootReducer = combineReducers({
  transactions: transactionsReducer,
});

export default rootReducer;
