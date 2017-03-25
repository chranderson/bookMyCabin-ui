import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
// import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

import './menu.scss';

// const bookDatesIcon = <FontIcon className="material-icons">add_shopping_cart</FontIcon>;
const listIcon = <FontIcon className="material-icons">list</FontIcon>;
const arrowUpIcon = <FontIcon className="material-icons">arrow_drop_up</FontIcon>;
const removeIcon = <FontIcon className="material-icons">remove</FontIcon>;

import {
  updateView,
} from '../../redux/reducers/Nav/nav';

@connect(
  state => ({
    currentView: state.nav.currentView,
    totalCharge: state.userData.totalCharge,
  }),
  ({
    updateView,
  })
)


export default class Menu extends Component {

  static propTypes = {
    currentView: PropTypes.string,
    totalCharge: PropTypes.number,
    updateView: PropTypes.func,
  }
  static defaultProps = {
    currentView: 'main'
  }

  select = (item) => {
    this.props.updateView(item);
  };

  render() {

    const {
      totalCharge
    } = this.props;

    return (
      <div className="menu">
        <Paper zDepth={5}>
          <BottomNavigation>
            <BottomNavigationItem
              label="Cabins"
              icon={listIcon}
              onTouchTap={() => this.select('main')}
            />
            <BottomNavigationItem
              style={{flex: '2 1 0%'}}
              disabled={totalCharge === 0}
              label="Reservation Request"
              icon={arrowUpIcon}
              onTouchTap={() => this.select('contact')}
            />
            <BottomNavigationItem
              disabled={totalCharge === 0}
              label={'Review'}
              icon={removeIcon}
              onTouchTap={() => this.select('review')}
            />
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}
