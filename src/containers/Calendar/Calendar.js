import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import {
  updateSavedDates,
} from '../../redux/reducers/UserData/userData';

import './calendar.scss'

import {
  CabinCard,
  Day
} from '../../components';


@connect(
  state => ({
    controlledDate: state.calendar.controlledDate,
    reservation: state.userData.context.reservation,
  }),
  ({
    updateSavedDates,
  })
)
export default class Calendar extends Component {

  static propTypes = {
    controlledDate: PropTypes.object,
    updateSavedDates: PropTypes.func,
    reservation: PropTypes.object,
    cabins: PropTypes.array,
    dates: PropTypes.array,
    bookings: PropTypes.object,
    id: PropTypes.string,
    price: PropTypes.number
  }

  static defaultProps = {
    price: 185,
  }

  handleDateSelect = (item) => {
    // console.log('item: ', item);
    this.props.updateSavedDates(item);
  }

  renderCabinCol() {
    return (
      this.props.cabins.map((cabin, index) => {
         return (
           <CabinCard id={cabin.id}
                      imgs={cabin.imgs}
                      key={index}
                      name={cabin.name}
                      price={cabin.price} />
         );
      })
    )
  }

  renderDayCol(date, indx) {
    const {
      cabins,
      bookings,
      price,
      reservation,
    } = this.props;


    const cabinIds = cabins.map(cabin => cabin.id);

    const isBooked = (cabinId, day) => {
      return bookings[cabinId].some(today => today === day);
    };

    const savedCabins = reservation.cabins;

    return (
      <div className="dayCol" key={indx + date} id={date}>
        <Paper className="dayHeader colHeader" zDepth={0}>{date.slice(0, -3)}</Paper>
        {
          cabinIds.map((cabin, index) => {
            const thisCabin = savedCabins.filter(item => item.id === cabin)[0];
            const isSelected = savedCabins.length && thisCabin
                             ? thisCabin.dates.includes(date)
                             : false;

            return (
              <Day cabinId={cabin}
                   date={date}
                   key={index}
                   onSelect={this.handleDateSelect}
                   price={price}
                   selected={isSelected}
                   booked={isBooked(cabin, date)} />
            );
          })
        }
        <div className="dayHeader colHeader">{date.slice(0, -3)}</div>
      </div>
    );
  }

  render() {

    const {
      controlledDate,
      dates,
    } = this.props;


    // console.log('controlledDate: ', controlledDate.getFullYear());
    const currentYear = controlledDate.getFullYear();
    return (
      <div className="calendar">
        <div className="cabinCol">
          <div className="cabinHeader colHeader">{currentYear}</div>
          { this.renderCabinCol() }
          <div className="cabinHeader colHeader">{currentYear}</div>
        </div>
        <div className="calendarCol">
          { dates && dates.map((date, index) => this.renderDayCol(date, index)) }
        </div>
      </div>
    );
  }
}
