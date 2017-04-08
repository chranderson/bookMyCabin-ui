import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Recaptcha from 'react-recaptcha';

import CircularProgress from 'material-ui/CircularProgress';
import './confirm.scss';


import {
  getCabinTotals
} from '../../utils/maths';

import {
  CabinReviewCard,
  View
} from '../../../components';

import {
  updateView,
} from '../../../redux/reducers/Nav/nav';

import {
  changeRobotStatus,
  sendEmail,
  updateGuestCount,
  updateSavedDates,
} from '../../../redux/reducers/UserData/userData';


let recaptchaInstance;

const resetRecaptcha = () => {
  // console.log('reset called');
  recaptchaInstance.reset();
};

@connect(
  state => ({
    cabins: state.cabins,
    loading: state.userData.loading,
    priceConfig: state.userData.priceConfig,
    reservation: state.userData.context.reservation,
    user: state.userData.context.user,
  }),
  ({
    changeRobotStatus,
    sendEmail,
    updateGuestCount,
    updateSavedDates,
    updateView,
  })
)

export default class Confirm extends Component {

  static propTypes = {
    cabins: PropTypes.array,
    changeRobotStatus: PropTypes.func,
    loading: PropTypes.bool,
    priceConfig: PropTypes.object,
    review: PropTypes.bool,
    sendEmail: PropTypes.func,
    updateGuestCount: PropTypes.func,
    updateView: PropTypes.func,
    user: PropTypes.object,
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

  goToCabins = () => this.props.updateView('main');

  handleSubmit = () => {
    let newView;
    if (this.props.review) {
      newView = 'contact';
      this.props.updateView(newView);
    } else {
      // this.sendEmail();
    }
    resetRecaptcha();

  };

  deleteCabinDate = (id, date) => {
    console.log('id: ', id);
    console.log('date: ', date);
    this.props.updateSavedDates({
      id: id,
      date: date
    })
  }

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
          addCabinDate={this.goToCabins}
          cabin={thisCabin}
          deleteCabinDate={this.deleteCabinDate}
          fees={cabinFees[savedCabinId]}
          key={index}
          reservation={thisSavedCabin}
          updateGuestCount={this.updateGuestCount} />
      );
    })
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
    this.props.changeRobotStatus(true);
  }

  expiredCallback = () => {
    // console.log(`Recaptcha expired`);
    this.props.changeRobotStatus(false)
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
    // console.log('renderUserInfo: ', user);
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
      user,
      cabins,
      reservation,
    } = this.props;

    const cabinFees = getCabinTotals(reservation, cabins, priceConfig);

    const hasEmptyGuestCount = reservation.cabins.some(cabin => cabin.guests === 0);

    return (
      <View>
        {
          !loading
          ? <div className="confirmView">
            <div className="info">
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
              ? this.renderUserInfo(user)
              : null
            }
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
          </div>
          : this.renderLoading()
        }

      </View>
    );
  }
}
