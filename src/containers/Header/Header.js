import React, { Component, PropTypes } from 'react';
import DatePicker from 'material-ui/DatePicker';
import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import {
  getCabinTotals
} from '../utils/maths';

import './header.scss';

import {
  getDates,
  getNextDates,
  getPrevDates,
  // loadEvents,
  // selectDate
} from '../../redux/reducers/Calendar/calendar';

@connect(
  state => ({
    // bookings: state.calendar.bookings,
    cabins: state.cabins,
    controlledDate: state.calendar.controlledDate,
    priceConfig: state.userData.priceConfig,
    currentView: state.nav.currentView,
    reservation: state.userData.reservation,
    total: state.userData.totalCharge,
  }),
  ({
    getDates,
    getNextDates,
    getPrevDates,
    // loadEvents,
    // selectDate,
  })
)
export default class Header extends Component {

  static propTypes = {
    cabins: PropTypes.array,
    currentView: PropTypes.string,
    getDates: PropTypes.func,
    getNextDates: PropTypes.func,
    getPrevDates: PropTypes.func,
    controlledDate: PropTypes.any,
    priceConfig: PropTypes.object,
    reservation: PropTypes.object,
    // selectDate: PropTypes.func,
    title: PropTypes.string,
    total: PropTypes.number,
    view: PropTypes.string,
  }

  static defaultProps = {
    onDateChange: (evt) => console.log('onDateChange: ', evt),
    title: 'Book',
    view: 'main'
  }

  handleChange = (event, date) => {
    this.getDates(date);
  };

  getDates = (date) => {
    this.props.getDates(date, 14);
  }

  getToday = () => new Date();

  handleBackClick = () => {
    this.props.getPrevDates();
  }

  handleNextClick = () => {
    this.props.getNextDates();
  }

  render() {

    const {
      cabins,
      controlledDate,
      currentView,
      priceConfig,
      reservation,
      title,
      // total,
      // view
    } = this.props;

    const dialogContainerStyle = {
      border: '1px solid red'
    };

    const totalFees = getCabinTotals(reservation, cabins, priceConfig);

    return (
      <div className="appHeader">
        <div className="title">
          {title}
        </div>
        <div className="toolBar">
          {
            currentView === 'main'
            ? <IconButton onTouchTap={this.handleBackClick}>
                <FontIcon className="material-icons">chevron_left</FontIcon>
              </IconButton>
            : null
          }
          {
            currentView === 'main'
            ? <DatePicker
                autoOk
                className="datePicker"
                dialogContainerStyle={dialogContainerStyle}
                disableYearSelection
                hideCalendarDate
                hintText={'yolo'}
                locale={'en-US'}
                minDate={this.getToday()}
                onChange={this.handleChange}
                value={controlledDate} />
            : null
          }
          {
            currentView === 'main'
            ? <IconButton onTouchTap={this.handleNextClick}>
                <FontIcon className="material-icons">chevron_right</FontIcon>
              </IconButton>
            : <div style={{padding: '0 1em'}}>Total: <span style={{fontWeight: 500}}>{`$${totalFees.total}.00`}</span></div>
          }
        </div>
      </div>
    );
  }
}
