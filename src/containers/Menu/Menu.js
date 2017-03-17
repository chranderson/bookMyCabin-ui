import React, { Component, PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

import './menu.scss';

const bookDatesIcon = <FontIcon className="material-icons">add_shopping_cart</FontIcon>;
const listIcon = <FontIcon className="material-icons">list</FontIcon>;
const nearbyIcon = <IconLocationOn />;

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
      <Paper zDepth={10}>
        <BottomNavigation>
          <BottomNavigationItem
            label="Added Dates"
            icon={listIcon}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Book Dates"
            icon={bookDatesIcon}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Nearby"
            icon={nearbyIcon}
            onTouchTap={() => this.select(2)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}
