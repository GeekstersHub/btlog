// @flow

import { ADD_TRANSACTION, REMOVE_TRANSACTION } from '../constants';
import type { ReduxAction, TransactionListItem } from '../types';

type State = {
  items: Array<TransactionListItem>,
};

const initialState: State = {
  items: [],
};
const transactionsReducer = (state: State = initialState, action: ReduxAction) => {
  switch (action.type) {
    case ADD_TRANSACTION: {
      const transaction = action.payload;
      return {
        ...state,
        items: [...state.items, transaction],
      };
    }
    case REMOVE_TRANSACTION: {
      return state;
    }

    default:
      return state;
  }
};

export default transactionsReducer;
