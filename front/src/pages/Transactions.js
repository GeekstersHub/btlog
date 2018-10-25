// @flow

import _ from 'lodash';
import moment from 'moment';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Websocket from 'react-websocket';
import { Table } from 'reactstrap';
import type { TransactionListItem } from '../types';
import { addTransaction } from '../actions';

type PropsT = {
  transactions: {
    items: Array<TransactionListItem>,
  },
  attachTransaction: (data: Object) => void,
};

class Transactions extends React.Component<PropsT> {
  constructor(props) {
    super(props);
    this.handleData.bind(this);
  }

  handleData = (data) => {
    const { attachTransaction } = this.props;
    const parsedData = JSON.parse(data);
    console.log(parsedData);

    if (parsedData.tokenAmount) {
      attachTransaction(parsedData);
    }
  };

  renderWebsocketComponent = () => {
    const { host } = window.location;
    return <Websocket url={`ws://${host}/ws`} onMessage={this.handleData} />;
  };

  render() {
    const { transactions } = this.props;
    if (transactions.items.length) {
      return (
        <Fragment>
          {this.renderWebsocketComponent()}
          <Table bordered>
            <thead>
              <tr>
                <th>Token Amount</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {_.map(transactions.items, (t: TransactionListItem) => (
                <tr key={t.time}>
                  <td>{t.tokenAmount}</td>
                  <td>{moment(t.time).format('MM-DD-YYYY HH:mm:ss')}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <div>No Transactions</div>
        {this.renderWebsocketComponent()}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  transactions: state.transactions,
});

const mapDispatchToProps = (dispatch) => ({
  attachTransaction: (payload) => dispatch(addTransaction(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Transactions);
