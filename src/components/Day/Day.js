import React, { Component, PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';

import './day.scss'

export default class Day extends Component {

  static propTypes = {
    date: PropTypes.string,
    price: PropTypes.number,
    select: PropTypes.func,
    booked: PropTypes.bool
  }

  static defaultProps = {
    date: '--',
    price: '999',
    select: (date) => console.log('select: ', date),
    booked: true
  }

  handleClick = () => {
    this.props.select(this.props.date);
  }

  render() {

    const {
      date,
      price,
      booked
    } = this.props;

    const iconStyles = {
      fill: 'red',
    };

    let dayStyle = 'day';
    dayStyle += booked
              ? ' disabled'
              : ' enabled';

    let statusStyle = 'status';
    statusStyle += booked
                 ? ' disabled'
                 : ' enabled';

    return (
      <div className={dayStyle}>
        {
          booked
          ? <div className="notAvail">Not Avail</div>
          : <div className="price">
              ${price}<span>.00</span>
            </div>
        }
        <div className={statusStyle} onClick={booked && date ? this.handleClick : null}>
          { booked
            ? <FontIcon className="material-icons" style={iconStyles}>block</FontIcon>
            : <FontIcon className="material-icons" style={iconStyles}>add_box</FontIcon> }

        </div>
      </div>
    );
  }
}
