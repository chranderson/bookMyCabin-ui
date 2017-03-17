import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import {} from '../../redux/reducers/Calendar/calendar';
// import DatePicker from 'material-ui/DatePicker';
// import RaisedButton from 'material-ui/RaisedButton';
// import getBookedDates from './getBookedDates';

import './main.scss';

import {
  getDates,
  loadEvents
} from '../../../redux/reducers/Calendar/calendar';

import {
  Cabin,
  Calendar,
  View
} from '../../../components';


@connect(
  state => ({
    bookings: state.calendar.bookings,
    cabins: state.cabins,
    days: state.calendar.days,
    time: state.info.time,
  }),
  ({
    getDates,
    loadEvents,
  })
)
export default class Main extends Component {

  static propTypes = {
    bookings: PropTypes.object,
    cabins: PropTypes.array,
    days: PropTypes.array,
    getDates: PropTypes.func,
    loadEvents: PropTypes.func,
    thisWeek: PropTypes.array,
    time: PropTypes.string,
    title: PropTypes.string
  }

  static defaultProps = {
    title: 'Book A Cabin'
  }

  constructor(props) {
    super(props);
    this.state = {
      controlledDate: new Date(),
      events: [],
    }
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


  handleChange = (event, date) => {
    this.setState({
      controlledDate: date,
    });
    this.getDates(date);
  };

  getDates = (date) => {
    this.props.getDates(date, 7);
  }

  renderCabins() {
    const {
      cabins
    } = this.props;

    // return cabins.map((cabin, index) => <div className="cabinListItem" key={index}>{cabin.id}</div>);
    return (
      <div className="cabinCol">
        <div className="cabinHeader"></div>
        {cabins.map((cabin, index) => <Cabin id={cabin.id} imgs={cabin.imgs} key={index} name={cabin.name} price={cabin.price} />)}
      </div>
    );
  }

  render() {

    const {
      bookings,
      cabins,
      days,
      // thisWeek,
      // time,
      title
    } = this.props;
    // const bookedDays = ['3/1/17', '4/3/17', '3/5/17', '3/6/17', '3/7/17', '3/18/17', '3/29/17'];
    const dates = days;
    const cabinIds = cabins.map(cabin => cabin.id);

    // console.log('bookings: ', bookings);
    return (
      <View title={title}
            date={this.state.controlledDate}
            onDateChange={this.handleChange}>
        <div className="mainWrap">
          { this.renderCabins() }
          <div className="calendarCol">
            <Calendar dates={dates} bookings={bookings} cabins={cabinIds} />
          </div>
        </div>
      </View>
    );
  }
}
