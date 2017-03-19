import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
// import ContentInbox from 'material-ui/svg-icons/content/inbox';
// import ActionGrade from 'material-ui/svg-icons/action/grade';
// import ContentSend from 'material-ui/svg-icons/content/send';
// import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
// import ActionInfo from 'material-ui/svg-icons/action/info';

import {
  View
} from '../../../components';

import './review.scss';

@connect(
  state => ({
    cabins: state.cabins,
    selected: state.userData.selected,
    totalAmount: state.userData.totalCharge,
  }),
)
export default class Review extends Component {

  static propTypes = {
    cabins: PropTypes.array,
    selected: PropTypes.object,
    title: PropTypes.string,
    totalAmount: PropTypes.number,
  }

  static defaultProps = {
    title: 'Review Added Dates',
    totalAmount: 0,
  }

  renderCabinDates(cabinDates) {
    // const cabinDates = this.props.selected[cabinId];
    return cabinDates.map((date, index) => <ListItem key={index} primaryText={date} />)
  }

  renderSelectedCabins(cabinIds) {
    const {
      cabins,
      selected,
    } = this.props;

    return cabinIds.map((cabinId, index) => {
  
      const thisCabin = cabins.filter(cabin => cabin.id === cabinId)[0];
      const cabinDates = selected[cabinId];
      const totalAmt = cabinDates.length * 185;
      return (
        <List key={cabinId}>
          {thisCabin.name}
          <Subheader>sleeps {`${thisCabin.sleeps}`}</Subheader>
          <Subheader>price per night: {`$${thisCabin.price}.00`}</Subheader>
          <Subheader>total: {`$${totalAmt}.00`}</Subheader>
          {this.renderCabinDates(cabinDates)}
          <Divider />
        </List>
      );
    });
  }

  render() {

    const {
      totalAmount,
      selected,
      // title
    } = this.props;

    const cabinKeys = Object.keys(selected);
    // console.log('cabinKeys: ', cabinKeys);
    return (
      <View>
        <div className="reviewView">
          <div className="title">
            Reservation Details
          </div>
          <div className="totalPrice">
            {`Total: $${totalAmount}.00`}
          </div>
          <div className="title">
            Selected Cabins & Dates
          </div>
          {
            cabinKeys.length
            ? this.renderSelectedCabins(cabinKeys)
            : 'no cabins have been selected'
          }
        </div>
      </View>
    );
  }
}
