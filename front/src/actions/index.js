// @flow

import { ADD_TRANSACTION, REMOVE_TRANSACTION } from '../constants';
import type { ReduxAction } from '../types';

export function addTransaction(state: ReduxAction) {
  return {
    type: ADD_TRANSACTION,
    payload: state,
  };
}

export function removeTransaction(state: ReduxAction) {
  return {
    type: REMOVE_TRANSACTION,
    payload: state,
  };
}
