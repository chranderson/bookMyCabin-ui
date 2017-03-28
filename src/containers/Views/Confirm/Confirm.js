import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';

import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import './confirm.scss';

import {
  getCabinTotals
} from '../../utils/maths';

import {
  OccupancySelectField,
  View
} from '../../../components';

import {
  updateView,
} from '../../../redux/reducers/Nav/nav';

import {
  sendEmail,
  updateGuestCount,
} from '../../../redux/reducers/UserData/userData';

// const sampleData = require('./sampleSession.json');

@connect(
  state => ({
    cabins: state.cabins,
    loading: state.userData.loading,
    priceConfig: state.userData.priceConfig,
    reservation: state.userData.reservation,
    values: state.userData.values,
  }),
  ({
    sendEmail,
    updateGuestCount,
    updateView,
  })
)

export default class Confirm extends Component {

  static propTypes = {
    cabins: PropTypes.array,
    // cabinPrice: PropTypes.number,
    loading: PropTypes.bool,
    priceConfig: PropTypes.object,
    review: PropTypes.bool,
    // selected: PropTypes.object,
    sendEmail: PropTypes.func,
    // totalCharge: PropTypes.number,
    updateGuestCount: PropTypes.func,
    updateView: PropTypes.func,
    values: PropTypes.object,
    title: PropTypes.string
  }

  static defaultProps = {
    // cabinPrice: 185,
    loading: false,
    review: false,
    title: 'Please Review the Information',
    updateView: (newView) => console.log('updateView: ', newView),
    updateGuestCount: (cabin, count) => console.log('updateGuestCount: ', cabin, count),
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

  renderCabinDetails(cabinFees) {
    const {
      cabins,
      reservation,
      // selected,
      // totalCharge
    } = this.props;

    const chipStyle = {
      margin: 4,
      fontSize: 10
    };

    // console.log('cabinFees: ', cabinFees);
    const reservedCabins = reservation.cabins;
    const savedCabins = Object.keys(reservation.cabins);
    // console.log('savedCabins: ', savedCabins);
    // console.log('cabins: ', cabins);
    return savedCabins.map((savedCabin, index) => {

      const thisCabin = cabins.filter(cabin => cabin.id === savedCabin)[0];
      // console.log('thisCabin: ', thisCabin);
      const savedDates = reservedCabins[savedCabin].dates.sort((itemA, itemB) => itemA < itemB ? -1 : 1);
      const guestCount = reservedCabins[savedCabin].guests;
      const lastDay = savedDates[savedDates.length - 1];
      const lastDate = new Date(lastDay);
      const checkoutDate = new Date(lastDate.setDate((lastDate.getDate() + 1)));

      const cabinTotalPrice = cabinFees[savedCabin].total;
      // console.log('checkoutDate: ', checkoutDate.toLocaleDateString());
      return (
        <Paper className="cabinDetail" key={index} zDepth={1}>
          <div className="detailTitle">
            <span>{ thisCabin.name }</span>
            <span>{`$${cabinTotalPrice}.00`}</span>
          </div>
          <div className="aboutCabin">
            <Chip style={chipStyle}>{`Sleeps: ${thisCabin.sleeps}`}</Chip>
            <Chip style={chipStyle}>{`Price: $${thisCabin.price}`}</Chip>
          </div>

          <OccupancySelectField
            defaultValue={guestCount}
            id={thisCabin.id}
            onChange={this.updateGuestCount}
            options={thisCabin.sleeps} />

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

    const {
      cabins,
      priceConfig,
      reservation,
      values,
    } = this.props;

    const payload = {
      user: {
        name: `${values.firstName} ${values.lastname}`,
        email: values.email,
        phone: values.phone,
        message: values.message
      },
      cabins: reservation.cabins,
      fees: getCabinTotals(reservation, cabins, priceConfig)
    };

    console.log('payload: ', payload);

    // console.log('sessionData: ', sessionData);
    this.props.sendEmail(payload)
      .then(res => {
        // console.log('res: ', res.result);
        if (res.result.emailSent) {
          this.props.updateView('success');
        } else if (res.result.error) {
          // console.log('res.error: ', res.error);
        }
      })
      .catch(err => console.log('err: ', err));
  }

  updateGuestCount = (cabin, count) => {
    const payload = {
      cabinId: cabin,
      count: count
    };
    this.props.updateGuestCount(payload);
  }

  renderLoading() {
    return (
      <div style={{display: 'flex', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <CircularProgress size={80} thickness={5} />
      </div>
    );
  }

  render() {

    const {
      loading,
      priceConfig,
      review,
      values,

      cabins,
      reservation,
    } = this.props;

    const cabinFees = getCabinTotals(reservation, cabins, priceConfig);
    // const btnStyle = {margin: '1em'};

    return (
      <View>
        {
          !loading
          ? <div className="confirmView">
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
                { this.renderCabinDetails(cabinFees.cabins) }
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
              <span className="tax"><span className="keySpan">{'Net:'}</span>${cabinFees.total}.00</span>
              <span className="tax"><span className="keySpan">{'Tax (3%):'}</span>{cabinFees.tax}</span>
              <span className="total">
                <span>Total: </span>
                {cabinFees.totalWithTax}
              </span>
            </div>
            <div className="confirmBtnWrap">
              <RaisedButton label="Request Reservation" onTouchTap={this.handleSubmit} primary={true} fullWidth />
            </div>
          </div>
          : this.renderLoading()
        }

      </View>
    );
  }
}
