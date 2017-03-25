import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import FontIcon from 'material-ui/FontIcon';
// import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import './success.scss';

import {
  // OccupancySelectField,
  View
} from '../../../components';

import {
  updateView,
} from '../../../redux/reducers/Nav/nav';


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
    updateView,
  })
)

export default class Success extends Component {

  static propTypes = {
    doSomethingElse: PropTypes.func,
    updateView: PropTypes.func,
    title: PropTypes.string
  }

  static defaultProps = {
    doSomethingElse: () => alert('what would you like this to do? I can take it off'),
    title: 'Reservation Sent!',
    updateView: (newView) => console.log('updateView: ', newView),
  }

  render() {

    const {
      title,
    } = this.props;

    return (
      <View>
        <div className="successView">
          <div className="viewTitle">
            {checkIcon} {title}
          </div>
          <div className="viewbody">
            <div className="nextStep">
              You should receive a confirmation email shortly.
              <span>If you dont receive the confirmation email in the next 30 min, check your spam folder and/or give us a call.</span>
            </div>
            <div className="nextStep">
              Call
              <span>Will you call us?</span>
            </div>
            <div className="nextStep">
              Payment
              <span>How will we do payment?</span>
            </div>
            <RaisedButton
              label="Should I Do Something Else?"
              onTouchTap={this.props.doSomethingElse}
              primary={true}
              style={{margin: '2em 0'}}  />
          </div>
        </div>
      </View>
    );
  }
}
