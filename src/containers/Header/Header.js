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
} from '../../redux/reducers/Calendar/calendar';

@connect(
  state => ({
    cabins: state.cabins,
    controlledDate: state.calendar.controlledDate,
    priceConfig: state.userData.priceConfig,
    currentView: state.nav.currentView,
    reservation: state.userData.context.reservation,
    total: state.userData.totalCharge,
  }),
  ({
    getDates,
    getNextDates,
    getPrevDates,
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
    title: 'Cabin Availability',
    view: 'main'
  }


  formatDate = (thing) => `${thing.toDateString().slice(4, -5)}`;

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
    } = this.props;

    const dialogContainerStyle = {
      border: '1px solid red'
    };
    const buttonStyle = {
      borderLeft: '1px dotted black',
    };
    const dateIconStyle = {
      transform: 'translateX(-100%)',
      opacity: 0.3,
      fontSize: 20,
    };
    const datePickerStyle = {
      fontFamily: 'monospace',
      opacity: 0.8,
      // fontWeight: 500,
      // fontSize: 20,
    };
    const totalFees = getCabinTotals(reservation, cabins, priceConfig);
    return (
      <div className="appHeader">
        <div className="appHeaderTitle">
          {title}
        </div>
        <div className="toolBar">
          {
            currentView === 'main'
            ? <IconButton onTouchTap={this.handleBackClick} tooltip={'previous fortnight'} className="backBtn">
                <FontIcon className="material-icons">chevron_left</FontIcon>
              </IconButton>
            : null
          }
          {
            currentView === 'main'
            ? <div className="datePickerWrapper">
                <DatePicker
                      autoOk
                      className="datePicker"
                      formatDate={this.formatDate}
                      textFieldStyle={datePickerStyle}
                      dialogContainerStyle={dialogContainerStyle}
                      disableYearSelection
                      hideCalendarDate={false}
                      hintText=""
                      locale={'en-US'}
                      minDate={this.getToday()}
                      onChange={this.handleChange}
                      value={controlledDate} />
                <FontIcon className="material-icons" style={dateIconStyle}>date_range</FontIcon>
              </div>
          : null
          }

          {
            currentView === 'main'
            ? <IconButton onTouchTap={this.handleNextClick} style={{buttonStyle}} tooltip={'next fortnight'} className="backBtn">
                <FontIcon className="material-icons">chevron_right</FontIcon>
              </IconButton>
            : null
          }
          {
            currentView !== 'main' && currentView !== 'success'
            ? <div className="headerTotal">
                <span className="totalLabel">Total:</span>
                <span style={{fontWeight: 500}}>${totalFees.total}</span>
                <span className="totalChange">.{`${totalFees.total.toFixed(2).slice(-2)}`}</span>
              </div>
            : null
          }
        </div>
      </div>
    );
  }
}
