import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FontIcon from 'material-ui/FontIcon';
// import Paper from 'material-ui/Paper';
// import RaisedButton from 'material-ui/RaisedButton';
import './success.scss';

import {
  // OccupancySelectField,
  View
} from '../../../components';

import {
  updateView,
} from '../../../redux/reducers/Nav/nav';

// import {
//   sendEmail,
// } from '../../../redux/reducers/UserData/userData';


const iconStyle = {
  fontSize: '1.5em',
  color: '#1dab53'
};
const checkIcon = <FontIcon className="material-icons" style={iconStyle}>check</FontIcon>;

@connect(
  state => ({
    // cabins: state.cabins,
    // selected: state.userData.selected,
    // totalCharge: state.userData.totalCharge,
    // values: state.userData.values,
  }),
  ({
    // sendEmail,
    updateView,
  })
)

export default class Success extends Component {

  static propTypes = {
    // doSomethingElse: PropTypes.func,
    sendEmail: PropTypes.func,
    updateView: PropTypes.func,
    title: PropTypes.string
  }

  static defaultProps = {
    // doSomethingElse: () => alert('what would you like this to do? I can take it off'),
    sendEmail: () => console.log('sendEmail called: '),
    title: 'Request Sent!',
    updateView: (newView) => console.log('updateView: ', newView),
  }

  render() {

    const {
      title,
    } = this.props;

    return (
      <View>
        <div className="successView">
          <div className="successMessage">
            <div className="viewTitle">
              {checkIcon} {title}
            </div>
            <div className="viewbody">
              <div className="nextStep">
                We will call you shortly to confirm the reservation and collect a credit card payment over the phone for the 50% deposit.
              </div>
              <div className="contactDetails">
                <address>
                  <a href="https://goo.gl/maps/3hxjomW1Y2r" target="_blank" title="View on Google Maps">35930 Janota Cir, Soldotna, AK 99669</a>
                </address>
                <a href="mailto:silvertiplodgeandcabins@gmail.com?subject=Just%20Requested%20a%20Reservation" target="_blank" title="Email Silvertip Lodge and Cabins">silvertiplodgeandcabins@gmail.com</a>
                <a href="tel:907-262-4450" target="_blank" title="Press to Call, Press and Hold to Copy">(907) 262-4450</a>
              </div>
            </div>
          </div>
        </div>
      </View>
    );
  }
}
