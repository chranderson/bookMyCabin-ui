import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';

import './menu.scss';

const sendIcon = <FontIcon className="material-icons">send</FontIcon>;
const nextIcon = <FontIcon className="material-icons">navigate_next</FontIcon>;
const beforeIcon = <FontIcon className="material-icons">navigate_before</FontIcon>;
const clearIcon = <FontIcon className="material-icons">clear</FontIcon>;

import { submit } from 'redux-form'

import createPayload from './createPayload';
import {
  getCabinTotals
} from '../utils/maths';

import {
  updateView,
} from '../../redux/reducers/Nav/nav';

import {
  clearSavedCabins,
  sendEmail,
} from '../../redux/reducers/UserData/userData';

@connect(
  state => ({
    cabins: state.cabins,

    contactFormIsValid: state.userData.contactFormIsValid,
    currentView: state.nav.currentView,
    isNotARobot: state.userData.isNotARobot,
    priceConfig: state.userData.priceConfig,
    reservation: state.userData.context.reservation,
    user: state.userData.context.user,
  }),
  ({
    clearSavedCabins,
    sendEmail,
    submit,
    updateView,
  })
)


export default class Menu extends Component {

  static propTypes = {
    contactFormIsValid: PropTypes.bool,
    clearSavedCabins: PropTypes.func,
    currentView: PropTypes.string,
    isNotARobot: PropTypes.bool,
    sendRequest: PropTypes.func,
    updateView: PropTypes.func,
  }
  static defaultProps = {
    contactFormIsValid: false,
    clearSavedCabins: () => console.log('clear saved cabins'),
    currentView: 'main',
    sendRequest: () => console.log('send request'),
  }

  handleContactSubmit = () => {
    this.props.submit('contact');
    // this.select('confirm');
  }

  select = (item) => {
    this.props.updateView(item);
  };

  onClear = () => this.props.clearSavedCabins();


  sendEmail = () => {

    const {
      cabins,
      priceConfig,
      reservation,
      user,
    } = this.props;

    const fees = getCabinTotals(reservation, cabins, priceConfig);
    // console.log('reservation: ', reservation);
    const payload = createPayload(user, reservation, fees, cabins);
    console.log('payload: ', payload);
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


  render() {

    const {
      contactFormIsValid,
      currentView,
      isNotARobot,
      reservation,
    } = this.props;

    const totalBookedDates = reservation.cabins.reduce((acc, cabin) => [...acc, ...cabin.dates], []);
    const hasCabinSaved = totalBookedDates.length > 0;
    // console.log('totalBookedDates: ', totalBookedDates);
    // console.log('currentView: ', currentView);

    const allCabinGuestValuesSet = reservation.cabins.filter(cabin => cabin.dates.length)
                                                     .map(cabin => cabin.guests)
                                                     .every(count => count > 0);
    console.log('reservation.cabins: ', reservation.cabins);
    // console.log('contactFormIsValid: ', contactFormIsValid);
    return (
        <Paper zDepth={3} className="menu">

          {
            currentView === 'main'  ?
            <IconButton
              disabled={!hasCabinSaved}
              onTouchTap={this.onClear}>
              {clearIcon}
            </IconButton>
            : null
          }
          { /*
            currentView !== 'main' ?
            <BottomNavigationItem
              label="Cabins"
              icon={listIcon}
              onTouchTap={() => this.select('main')}
            />
            : emptyDiv
          */ }

          {
            currentView === 'main' ?
            <RaisedButton
              onTouchTap={() => this.select('review')}
              label="Request Reservation"
              labelPosition="before"
              primary={true}
              icon={nextIcon}
              disabled={!hasCabinSaved}
            />
            : null
          }


            {
              currentView === 'review' ?
              <IconButton
                onTouchTap={() => this.select('main')}>
                {beforeIcon}
              </IconButton>
              : null
            }
            {
              currentView === 'review' ?
              <RaisedButton
                onTouchTap={() => this.select('contact')}
                label="Confirm Details"
                labelPosition="before"
                primary={true}
                icon={nextIcon}
                disabled={!allCabinGuestValuesSet}
              />
              : null
            }

            {
              currentView === 'contact' ?
              <IconButton
                onTouchTap={() => this.select('review')}>
                {beforeIcon}
              </IconButton>
              : null
            }
            {
              currentView === 'contact' ?
              <RaisedButton
                onTouchTap={this.handleContactSubmit}
                label="Save Contact Info"
                labelPosition="before"
                primary={true}
                icon={nextIcon}
                disabled={!contactFormIsValid}
              />
              : null
            }
            {
              currentView === 'confirm' ?
              <IconButton
                label="Back"
                onTouchTap={() => this.select('contact')}>
                {beforeIcon}
              </IconButton>
              : null
            }
            {
              currentView === 'confirm' ?
                <RaisedButton
                  onTouchTap={this.sendEmail}
                  label="Submit Request"
                  labelPosition="before"
                  primary={true}
                  icon={sendIcon}
                  disabled={!isNotARobot}
                />
              : null
            }

        </Paper>
    );
  }
}
