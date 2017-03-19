import React, { Component, PropTypes } from 'react';
import DatePicker from 'material-ui/DatePicker';
import { connect } from 'react-redux';

import './header.scss';

import {
  getDates,
  // loadEvents,
  selectDate
} from '../../redux/reducers/Calendar/calendar';

@connect(
  state => ({
    // bookings: state.calendar.bookings,
    // cabins: state.cabins,
    controlledDate: state.calendar.controlledDate,
    // time: state.info.time,
  }),
  ({
    getDates,
    // loadEvents,
    selectDate,
  })
)
export default class Header extends Component {

  static propTypes = {
    controlledDate: PropTypes.any,
    selectDate: PropTypes.func,
    title: PropTypes.string,
    view: PropTypes.string,
  }

  static defaultProps = {
    onDateChange: (evt) => console.log('onDateChange: ', evt),
    title: 'Book A Cabin',
    view: 'main'
  }

  handleChange = (event, date) => {
    console.log('handleChange: ', event, date);
    this.props.selectDate(date);
    this.getDates(date);
  };

  getDates = (date) => {
    this.props.getDates(date, 7);
  }

  render() {


    const {
      controlledDate,
      title,
      // view
    } = this.props;

    return (
      <div className="appHeader">
        <div className="title">
          {title}
        </div>
        <div className="toolBar">
          <div className="datePickerWrap">
            <DatePicker hintText={'yolo'}
                        value={controlledDate}
                        onChange={this.handleChange} />
          </div>
        </div>
      </div>
    );
  }
}
