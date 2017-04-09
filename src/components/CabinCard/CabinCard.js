import React, { Component, PropTypes } from 'react';

import './cabin.scss'

import {
  Day
} from '../../components';

export default class CabinCard extends Component {

  static propTypes = {
    // children: PropTypes.any,
    id: PropTypes.string,
    name: PropTypes.string,
    imgs: PropTypes.array,
    price: PropTypes.number,
    showOverlay: PropTypes.bool,
  }

  static defaultProps = {
    id: 'cb0',
    name: 'Cabin 0',
    imgs: ['http://placehold.it/100x50'],
    price: '',
    showOverlay: true,
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
      // showOverlay
    } = this.props;

  // const cardTitleStyle = {
  //   fontFamily: 'monospace'
  // };

  const bgImgStyle = {
    background: `url(${imgs[0]}) right top`,
    backgroundSize: 'cover'
  };

    return (
      <div className="cabin" id={id} style={bgImgStyle}>
        <div className="cabinTitle">
          <div>{name.slice(-1)}</div>
        </div>
      </div>
    );
  }
}
