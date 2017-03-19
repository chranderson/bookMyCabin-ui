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

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     selected: props.selected
  //   }
  // }

  handleClick = () => {
    this.props.onSelect({cabinId: this.props.cabinId, date: this.props.date})
    // this.setState({
    //   selected: !this.state.selected
    // });
  };

  render() {

    const {
      cabinId,
      date,
      price,
      booked,
      selected
    } = this.props;

    // const {
    //   selected
    // } = this.state;

    const iconStyles = {
      color: 'grey',
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
      <div id={`${date}_${cabinId}`} className={dayStyle}>
        {
          booked
          ? <div className="notAvail">Not Avail</div>
          : <div className="price">
              ${price}<span>.00</span>
            </div>
        }
        <div className={statusStyle} onClick={!booked && date ? this.handleClick : null}>
          { booked
            ? <FontIcon className="material-icons" style={iconStyles}>block</FontIcon>
            : <FontIcon className="material-icons" style={iconStyles}>
              { selected ? 'check_box' : 'check_box_outline_blank' }
              </FontIcon> }

        </div>
      </div>
    );
  }
}
