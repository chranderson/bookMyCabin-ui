import React, { Component, PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
// import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

import './menu.scss';

// const bookDatesIcon = <FontIcon className="material-icons">add_shopping_cart</FontIcon>;
const listIcon = <FontIcon className="material-icons">list</FontIcon>;
const arrowUpIcon = <FontIcon className="material-icons">arrow_drop_up</FontIcon>;
const removeIcon = <FontIcon className="material-icons">remove</FontIcon>;


export default class Menu extends Component {

  static propTypes = {
    pages: PropTypes.array,
  }
  // static defaultProps = {}

  select = (item) => console.log('item: ', item);

  render() {

    // const {
    //   pages
    // } = this.props;

    return (
      <Paper zDepth={2}>
        <BottomNavigation>
          <BottomNavigationItem
            label="Added Dates"
            icon={listIcon}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Book Now"
            icon={arrowUpIcon}
            onTouchTap={() => this.select('bookNow')}
          />
          <BottomNavigationItem
            label="$520.00"
            icon={removeIcon}
            onTouchTap={() => this.select('bill')}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}
