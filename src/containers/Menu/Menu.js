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

    // const {
    //   pages
    // } = this.props;

    return (
      <div className="menu">
        <Paper zDepth={2}>
          <BottomNavigation>
            <BottomNavigationItem
              label="Review Dates"
              icon={listIcon}
              onTouchTap={() => this.select('review')}
            />
            <BottomNavigationItem
              label="Book Now"
              icon={arrowUpIcon}
              onTouchTap={() => this.select('main')}
            />
            <BottomNavigationItem
              label={`$${this.props.totalCharge}.00`}
              icon={removeIcon}
              onTouchTap={() => this.select('contact')}
            />
          </BottomNavigation>
        </Paper>
      </div>
    );
  }
}
