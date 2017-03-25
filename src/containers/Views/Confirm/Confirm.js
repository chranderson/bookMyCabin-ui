import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import './confirm.scss';

import {
  OccupancySelectField,
  View
} from '../../../components';

import {
  updateView,
} from '../../../redux/reducers/Nav/nav';

const sampleData = require('./sampleSession.json');

@connect(
  state => ({
    cabins: state.cabins,
    selected: state.userData.selected,
    totalCharge: state.userData.totalCharge,
    values: state.userData.values,
  }),
  ({
    updateView,
  })
)

export default class Contact extends Component {

  static propTypes = {
    cabins: PropTypes.array,
    cabinPrice: PropTypes.number,
    review: PropTypes.bool,
    selected: PropTypes.object,
    totalCharge: PropTypes.number,
    updateView: PropTypes.func,
    values: PropTypes.object,
    title: PropTypes.string
  }

  static defaultProps = {
    cabinPrice: 185,
    review: false,
    title: 'Please Review the Information',
    updateView: (newView) => console.log('updateView: ', newView),
  }

  getTax = (total) => {
    const lessTax = total / 1.03;
    const tax = (total - lessTax).toFixed(2);
    return parseFloat(tax);
  }

  getGrandTotal = (total) => {
    return total + this.getTax(total);
  }

  handleSubmit = () => {
    console.log('values submitted: ', this.props.values);
    console.log('send make email sending call');
    let newView;
    if (this.props.review) {
      newView = 'contact';
      this.props.updateView(newView);
    } else {
      this.sendEmail();
    }

  };

  renderCabinDetails() {
    const {
      cabinPrice,
      cabins,
      selected,
      // totalCharge
    } = this.props;

    const chipStyle = {
      margin: 4,
      fontSize: 10
    };

    const savedCabins = Object.keys(selected);

    return savedCabins.map((savedCabin, index) => {
      const thisCabin = cabins.filter(cabin => cabin.id === savedCabin)[0];
      const savedDates = selected[savedCabin].sort((itemA, itemB) => itemA < itemB ? -1 : 1);
      const lastDay = savedDates[savedDates.length - 1];
      const lastDate = new Date(lastDay);
      const checkoutDate = new Date(lastDate.setDate((lastDate.getDate() + 1)));
      console.log('checkoutDate: ', checkoutDate.toLocaleDateString());
      return (
        <Paper className="cabinDetail" key={index} zDepth={1}>
          <div className="detailTitle">
            <span>{ thisCabin.name }</span>
            <span>{`$${savedDates.length * cabinPrice}.00`}</span>
          </div>
          <div className="aboutCabin">
            <Chip style={chipStyle}>{`Sleeps: ${thisCabin.sleeps}`}</Chip>
            <Chip style={chipStyle}>{`Price: $${thisCabin.price}`}</Chip>
          </div>
          <OccupancySelectField options={thisCabin.sleeps} />
          <div className="savedDates">
            <span>{`Reserve the Night${savedDates.length > 1 ? 's' : ''} of:`}</span>
            <div className="datesList">
              {
                savedDates.map((date, ind) => {
                  return <span key={ind}>{date}{ind !== savedDates.length - 1 ? ', ' : null}</span>;
                })
              }
            </div>
            <span style={{fontSize: '0.6em', fontWeight: 400, opacity: '0.7', padding: '0.5em 0'}}>
              Check Out By <strong>11AM</strong> on the morning of <strong>{checkoutDate.toLocaleDateString()}</strong>
            </span>
          </div>
        </Paper>
      );
    })
  }

  sendEmail = () => {
    // const {
    //   values
    // } = this.props;
    // const emailUrl = `https://odn75i78e8.execute-api.us-west-2.amazonaws.com/prod/message?email="${values.email}"&name="${values.firstName} ${values.lastName}"&startDate=1487732127257&endDate=1487732129814&message="${values.message}"&subject="Cabin Booking"&phone="${values.phone}"`;
    const emailUrl = `https://odn75i78e8.execute-api.us-west-2.amazonaws.com/prod/message`;

    fetch(emailUrl, {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(sampleData),
    })
    .then(response => {
      console.log('response: ', response);
      this.props.updateView('success');
    })
    .catch(err => console.log('err: ', err));
  }

  render() {

    const {
      review,
      // title,
      totalCharge,
      values
    } = this.props;

    // const btnStyle = {margin: '1em'};

    return (
      <View>
        <div className="confirmView">
          <div className="info">
            <span><strong>{ review ? 'Selected Dates:' : 'Please review selected dates and info:' }</strong></span>
            {
              !review
              ? <div className="userDetails">
                  <span><span className="keySpan">Name:</span>{`${values.firstName} ${values.lastName}`}</span>
                  <span><span className="keySpan">Email:</span>{`${values.email}`}</span>
                  <span><span className="keySpan">Phone:</span>{`${values.phone}`}</span>
                  <span><span className="keySpan">Message:</span>{`${values.message}`}</span>
                </div>
              : null
            }
            <ul>
              <li>All cabins are <strong>$185</strong> plus tax per night based on double occupancy.</li>
              <li>Each additional person is <strong>$25</strong> per night.</li>
            </ul>
          </div>
          <div className="detailsWrap">
            <div className="reservationDetails">
              { this.renderCabinDetails() }
            </div>
          </div>

          <div className="info">
            <span><strong>A Few Things</strong></span>
            <ul>
              <li>50% deposit is required to confirm a reservation</li>
              <li>Payment in full is due 30 days prior to arrival</li>
            </ul>
          </div>
          <div className="info">
            <span><strong>Cancellation Policy</strong></span>
            <ul>
              <li>To receive a refund of your deposit, less a 5% booking fee, you must give written notice more than 60 days prior to arrival.</li>
              <li>No refund is given on cancellations less than 30 days prior to your reservation.</li>
              <li>No partial refunds will be issued for late arrival or early departure.</li>
            </ul>

          </div>

          <div className="confirmTotal">
            <span className="tax"><span className="keySpan">{'Net:'}</span>${totalCharge}.00</span>
            <span className="tax"><span className="keySpan">{'Tax (3%):'}</span>{this.getTax(totalCharge)}</span>
            <span className="total">
              <span>Total: </span>
              {`$${this.getGrandTotal(totalCharge)}`}
            </span>
          </div>
          <div className="confirmBtnWrap">
            <RaisedButton label="Request Reservation" onTouchTap={this.handleSubmit} primary={true} fullWidth />
          </div>
        </div>
      </View>
    );
  }
}
