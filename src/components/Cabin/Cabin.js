import React, { Component, PropTypes } from 'react';

import './cabin.scss'

import {
  Day
} from '../../components';

export default class Cabin extends Component {

  static propTypes = {
    // children: PropTypes.any,
    id: PropTypes.string,
    name: PropTypes.string,
    imgs: PropTypes.array,
    price: PropTypes.number
  }

  static defaultProps = {
    id: 'cb0',
    name: 'Cabin 0',
    imgs: ['http://placehold.it/100x50'],
    price: ''
  }

  renderCalendar() {
    const {
      price
    } = this.props;
    const bookedDays = ['3/1/17', '4/3/17', '3/5/17', '3/6/17', '3/7/17', '3/18/17', '3/29/17'];
    const dates = ['3/3/17', '3/4/17', '3/5/17', '3/6/17', '3/7/17', '3/8/17', '3/9/17'];

    const isBooked = (date) => bookedDays.some(day => day === date);
    return (
      dates.map((date, index) => <Day date={date} key={index} price={price} booked={isBooked(date)} />)
    );
  }

  render() {

    const {
      // children,
      id,
      imgs,
      name,
    } = this.props;

    return (
      <div className="cabin" id={id}>
        <img id={`img_${id}`} src={imgs[0]} title={name} role="presentation" />
        <div className="cabinTitle">{ name }</div>
      </div>
    );
  }
}
