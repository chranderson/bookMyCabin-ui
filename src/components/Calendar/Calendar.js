import React, { Component, PropTypes } from 'react';

import './calendar.scss'

import {
  Day
} from '../../components';

export default class Calendar extends Component {

  static propTypes = {
    cabins: PropTypes.array,
    dates: PropTypes.array,
    bookings: PropTypes.object,
    id: PropTypes.string,
    price: PropTypes.number
  }

  static defaultProps = {
    price: 185
  }

  handleDateSelect = (evt) => {
    console.log('handleDateSelect: ', evt);
  }

  renderDayCol(date, indx) {
    const {
      cabins,
      // dates,
      bookings,
      price
    } = this.props;


    const isBooked = (cabinId, day) => {
      // console.log('cabinId: ', cabinId);
      // console.log('day: ', day);
      // console.log('bookings: ', bookings[cabinId]);
      return bookings[cabinId].some(today => today === day);
    };
    return (
      <div className="dayCol" key={indx} id={date}>
        <div className="contentHeader">{date}</div>
        { cabins.map((cabin, index) => <Day cabinId={cabin} date={date} key={index} onSelect={this.handleDateSelect} price={price} booked={isBooked(cabin, date)} /> ) }
      </div>
    );
  }

  render() {

    const {
      dates,
      // id,
    } = this.props;

    return (
      <div className="calendar">
        { dates.map((date, index) => this.renderDayCol(date, index)) }
      </div>
    );
  }
}
