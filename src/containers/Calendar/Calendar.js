import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import {
  // updateSelected,
  updateSavedDates,
  // removeItem
} from '../../redux/reducers/UserData/userData';

import './calendar.scss'

import {
  Cabin,
  Day
} from '../../components';


@connect(
  state => ({
    reservation: state.userData.reservation,
    selectedItems: state.userData.selected,
  }),
  ({
    updateSavedDates,
  })
)
export default class Calendar extends Component {

  static propTypes = {
    updateSavedDates: PropTypes.func,
    reservation: PropTypes.object,
    selectedItems: PropTypes.object,
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
    this.props.updateSavedDates(item);
  }

  renderCabinCol() {
    return (
      this.props.cabins.map((cabin, index) => {
         return (
           <Cabin id={cabin.id}
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

    // console.log('reservation: ', reservation);
    return (
      <div className="dayCol" key={indx + date} id={date}>
        <Paper className="dayHeader" zDepth={0}>{date.slice(0, -3)}</Paper>
        {
          cabinIds.map((cabin, index) => {
            const isSelected = reservation.cabins[cabin] && reservation.cabins[cabin].dates.includes(date);
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
        <div className="dayHeader">{date.slice(0, -3)}</div>
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
        <div className="cabinCol">
          <Paper zDepth={3}>
            <div className="cabinHeader">2017</div>
            { this.renderCabinCol() }
            <div className="cabinHeader">2017</div>
          </Paper>
        </div>
        <div className="calendarCol">
          { dates && dates.map((date, index) => this.renderDayCol(date, index)) }
        </div>
      </div>
    );
  }
}
