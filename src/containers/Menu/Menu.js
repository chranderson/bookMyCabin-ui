import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
// import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
// import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

import './menu.scss';

// const bookDatesIcon = <FontIcon className="material-icons">add_shopping_cart</FontIcon>;
// const listIcon = <FontIcon className="material-icons">list</FontIcon>;
// const arrowUpIcon = <FontIcon className="material-icons">arrow_drop_up</FontIcon>;
const sendIcon = <FontIcon className="material-icons">send</FontIcon>;
const nextIcon = <FontIcon className="material-icons">navigate_next</FontIcon>;
const beforeIcon = <FontIcon className="material-icons">navigate_before</FontIcon>;
const clearIcon = <FontIcon className="material-icons">clear</FontIcon>;
// const removeIcon = <FontIcon className="material-icons">remove</FontIcon>;

import {
  updateView,
} from '../../redux/reducers/Nav/nav';

import {
  clearSavedCabins,
} from '../../redux/reducers/UserData/userData';

@connect(
  state => ({
    currentView: state.nav.currentView,
    reservation: state.userData.context.reservation,
  }),
  ({
    clearSavedCabins,
    updateView,
  })
)


export default class Menu extends Component {

  static propTypes = {
    clearSavedCabins: PropTypes.func,
    currentView: PropTypes.string,
    sendRequest: PropTypes.func,
    updateView: PropTypes.func,
  }
  static defaultProps = {
    clearSavedCabins: () => console.log('clear saved cabins'),
    currentView: 'main',
    sendRequest: () => console.log('send request'),
  }

  select = (item) => {
    this.props.updateView(item);
  };

  onClear = () => this.props.clearSavedCabins();

  render() {

    const {
      currentView,
      reservation,
    } = this.props;

    const totalBookedDates = reservation.cabins.reduce((acc, cabin) => [...acc, ...cabin.dates], []);
    const hasCabinSaved = totalBookedDates.length > 0;
    // console.log('totalBookedDates: ', totalBookedDates);
    // console.log('currentView: ', currentView);

    const allCabinGuestValuesSet = reservation.cabins.map(cabin => cabin.guests)
                                                     .every(count => count > 0);

    return (
        <Paper zDepth={3} className="menu">

          {
            currentView === 'main'  ?
            <IconButton
              disabled={!hasCabinSaved}
              onTouchTap={this.onClear}
              tooltip="Clear Saved Cabins"
              tooltipPosition="top-right">
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
                onTouchTap={() => this.select('confirm')}
                label="Save Contact Info"
                labelPosition="before"
                primary={true}
                icon={nextIcon}
                disabled={!hasCabinSaved}
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
                  onTouchTap={this.props.sendRequest}
                  label="Submit Request"
                  labelPosition="before"
                  primary={true}
                  icon={sendIcon}
                  disabled={!hasCabinSaved}
                />
              : null
            }

        </Paper>
    );
  }
}
