import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import {} from '../../redux/reducers/Calendar/calendar';
// import DatePicker from 'material-ui/DatePicker';
// import RaisedButton from 'material-ui/RaisedButton';
// import getBookedDates from './getBookedDates';
// import Paper from 'material-ui/Paper';

import './main.scss';

import {
  // getDates,
  loadEvents
} from '../../../redux/reducers/Calendar/calendar';

import {
  View
} from '../../../components';

import {
  Calendar
} from '../../../containers';

@connect(
  state => ({
    bookings: state.calendar.bookings,
    cabins: state.cabins,
    days: state.calendar.days,
    time: state.info.time,
  }),
  ({
    // getDates,
    loadEvents,
  })
)
export default class Main extends Component {

  static propTypes = {
    bookings: PropTypes.object,
    cabins: PropTypes.array,
    days: PropTypes.array,
    // getDates: PropTypes.func,
    loadEvents: PropTypes.func,
    thisWeek: PropTypes.array,
    time: PropTypes.string,
    title: PropTypes.string
  }

  static defaultProps = {
    title: 'Book A Cabin'
  }



  componentDidMount() {
    this.getEvents();
  }

  componentDidUpdate(prevState) {
    // if (prevState.controlledDate !== this.state.controlledDate) this.getDates();
  }

  getEvents = () => {
    this.props.cabins.forEach(cabin => {
      fetch(`https://odn75i78e8.execute-api.us-west-2.amazonaws.com/prod/calendar?cabin="${cabin.id}"`)
        .then(response => response.json())
        .then(res => {
          this.props.loadEvents(res, cabin.id);
        });
    });
  }

  render() {

    const {
      bookings,
      cabins,
      days,
    } = this.props;

    return (
      <View>
        <Calendar dates={days} bookings={bookings} cabins={cabins} />
      </View>
    );
  }
}
