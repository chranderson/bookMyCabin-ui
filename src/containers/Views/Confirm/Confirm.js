import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Recaptcha from 'react-recaptcha';

import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
// import Paper from 'material-ui/Paper';
// import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
// import Subheader from 'material-ui/Subheader';
import './confirm.scss';

import createCabinPayload from './createCabinPayload';

import {
  getCabinTotals
} from '../../utils/maths';

import {
  CabinReviewCard,
  // OccupancySelectField,
  View
} from '../../../components';

import {
  updateView,
} from '../../../redux/reducers/Nav/nav';

import {
  sendEmail,
  updateGuestCount,
} from '../../../redux/reducers/UserData/userData';


let recaptchaInstance;

const resetRecaptcha = () => {
  // console.log('reset called');
  recaptchaInstance.reset();
};

const sendIcon = <FontIcon className="material-icons">send</FontIcon>;

@connect(
  state => ({
    cabins: state.cabins,
    loading: state.userData.loading,
    priceConfig: state.userData.priceConfig,
    reservation: state.userData.context.reservation,
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
    loading: PropTypes.bool,
    priceConfig: PropTypes.object,
    review: PropTypes.bool,
    sendEmail: PropTypes.func,
    updateGuestCount: PropTypes.func,
    updateView: PropTypes.func,
    values: PropTypes.object,
    title: PropTypes.string
  }

  static defaultProps = {
    loading: false,
    review: false,
    title: 'Please Review the Information',
    updateView: (newView) => console.log('updateView: ', newView),
    updateGuestCount: (cabin, count) => console.log('updateGuestCount: ', cabin, count),
  }

  constructor(props) {
    super(props);
    this.state = {
      verified: false
    }
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
    let newView;
    if (this.props.review) {
      newView = 'contact';
      this.props.updateView(newView);
    } else {
      this.sendEmail();
    }
    resetRecaptcha();

  };

  renderCabinDetails(cabinFees) {
    const {
      cabins,
      reservation,
      // review
    } = this.props;

    const reservedCabins = reservation.cabins;
    // filter -> return id for cabins that have one or more dates
    const savedCabinIds = reservedCabins.filter(cabin => cabin.dates.length)
                                        .map(rCabin => rCabin.id);
    // const savedCabinIds = reservedCabins.map(rCabin => rCabin.id);
    return savedCabinIds.map((savedCabinId, index) => {

      const thisCabin = cabins.filter(cabin => cabin.id === savedCabinId)[0];
      const thisSavedCabin = reservedCabins.filter(resCabin => resCabin.id === savedCabinId)[0];

      return (
        <CabinReviewCard
          cabin={thisCabin}
          fees={cabinFees[savedCabinId]}
          key={index}
          reservation={thisSavedCabin}
          updateGuestCount={this.updateGuestCount} />
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

    const fees = getCabinTotals(reservation, cabins, priceConfig);
    // console.log('reservation: ', reservation);
    const payload = {
      user: {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        phone: values.phone,
        message: values.message
      },
      reservation: {
        firstDay: reservation.cabins[0].dates[0],
        cabins: createCabinPayload(reservation.cabins, fees.cabins, cabins),
        price: {
          total: fees.total.toFixed(2),
          tax: fees.tax.toFixed(2),
          totalWithTax: fees.totalWithTax.toFixed(2)
        }
      }
    };

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
      id: cabin,
      count: count
    };
    this.props.updateGuestCount(payload);
  }

  renderLoading() {
    return (
      <div className="loadingView">
        <CircularProgress size={80} thickness={5} />
      </div>
    );
  }

  callback = () => {
    console.log('Done!!!!');
  }

  verifyCallback = (response) => {
    // console.log(response);
    this.setState({
      verified: true,
    });
  }

  expiredCallback = () => {
    // console.log(`Recaptcha expired`);
    this.setState({
      verified: false,
    });
  }

  // resetRecaptcha = () => {
  //   console.log('reset called');
  //   recaptchaInstance.reset();
  // }

  renderRecaptcha() {
    const captchaKey = '6LeqRRsUAAAAACRJEcUKlPiDxfPoNVvfpouSAGFt';
    return (
      <div className="confirmBtnWrap">
        <Recaptcha
          ref={e => recaptchaInstance = e}
          sitekey={captchaKey}
          size="compact"
          render="explicit"
          verifyCallback={this.verifyCallback}
          onloadCallback={this.callback}
          expiredCallback={this.expiredCallback}
        />
      </div>
    );
  }

  renderInfo(fees) {
    return (
      <div>
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
        <div className="grandTotal">
          <div className="net">
            <div className="totalKey">{'Net:'}</div>
            <div className="totalVal">${fees.total.toFixed(2)}</div>
          </div>
          <span className="tax">
            <span className="totalKey">{'Tax (3%):'}</span>
            <span className="totalVal">${fees.tax.toFixed(2)}</span>
          </span>
          <span className="total">
            <span className="totalKey">Total: </span>
            <span className="totalVal">${fees.totalWithTax.toFixed(2)}</span>
          </span>
        </div>
      </div>
    );
  }

  renderUserInfo(user) {
    return (
      <div className="userDetails">
        <span><span className="keySpan">Name:</span>{`${user.firstName} ${user.lastName}`}</span>
        <span><span className="keySpan">Email:</span>{`${user.email}`}</span>
        <span><span className="keySpan">Phone:</span>{`${user.phone}`}</span>
        <span><span className="keySpan">Message:</span>{`${user.message}`}</span>
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
    // console.log('cabinFees: ', cabinFees);
    // const btnStyle = {margin: '1em'};

    console.log('reservation: ', reservation);
    const hasEmptyGuestCount = reservation.cabins.some(cabin => cabin.guests === 0);
    // console.log('guestCounts: ', guestCounts);
    return (
      <View>
        {
          !loading
          ? <div className="confirmView">
            <div className="info">
              {
                !review
                ? this.renderUserInfo(values)
                : null
              }


              {
                hasEmptyGuestCount
                ? <span>Please enter number of guests</span>
                : <span>Review Saved Cabins</span>
              }

            </div>
            <div className="detailsWrap">
              <div className="reservationDetails">
                { this.renderCabinDetails(cabinFees.cabins) }
              </div>
            </div>

            {
              !review
              ? this.renderInfo(cabinFees)
              : null
            }

            {
              !review
              ? this.renderRecaptcha()
              : null
            }

            {
            !review
            ? <div className="confirmBtnWrap">
                <RaisedButton
                  label="Submit Request"
                  labelPosition="before"
                  icon={sendIcon}
                  onTouchTap={this.handleSubmit}
                  primary={true} fullWidth
                  disabled={!review ? !this.state.verified : false} />
              </div>
             : null
            }
          </div>
          : this.renderLoading()
        }

      </View>
    );
  }
}
