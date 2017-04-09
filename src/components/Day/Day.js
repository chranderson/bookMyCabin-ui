import React, { Component, PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';

import './day.scss'

export default class Day extends Component {

  static propTypes = {
    cabinId: PropTypes.string,
    date: PropTypes.string,
    price: PropTypes.number,
    onSelect: PropTypes.func,
    booked: PropTypes.bool,
    selected: PropTypes.bool
  }

  static defaultProps = {
    date: '--',
    price: '999',
    onSelect: (date) => console.log('onSelect: ', date),
    booked: true,
    selected: false,
  }

  // constructor() {
  //   super();
  //   this.state = {
  //     isHovered: false
  //   };
  // }

  handleClick = () => {
    this.props.onSelect({
      id: this.props.cabinId,
      date: this.props.date
    })
  };

  // handleHover = (evt) => {
  //   this.setState({
  //     isHovered: evt.type === 'mouseover'
  //   });
  // };

  render() {

    const {
      cabinId,
      date,
      // price,
      booked,
      selected
    } = this.props;

    // const {
    //   isHovered
    // } = this.state;
    const iconStyles = {
      color: selected ? '#ffffff' : 'grey',
      fontSize: selected ? '3em' : '2em',
    };

    let dayStyle = 'day cabinRowItem';

    let statusStyle = 'status';
    statusStyle += booked
                 ? ' disabled notAvailable'
                 : ' enabled';
    statusStyle += selected
                 ? ' selected'
                 : ' notSelected';

    return (
      <div
        id={`${date}_${cabinId}`}
        className={dayStyle}>

        <div className={statusStyle} onClick={!booked && date ? this.handleClick : null}>
          { booked
            ? <FontIcon className="material-icons" style={iconStyles}>block</FontIcon>
            : <FontIcon className="material-icons" style={iconStyles}>
              { selected ? 'check' : 'check_box_outline_blank' }
              </FontIcon> }

              {
                booked
                ? <div className="notAvail">Not Avail</div>
                : selected
                  ? <div className="cabinDayDate">{date.slice(0, -3)}</div>
                  : null
              }
        </div>
      </div>
    );
  }
}
