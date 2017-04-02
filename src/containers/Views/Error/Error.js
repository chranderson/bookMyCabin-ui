import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';

import FontIcon from 'material-ui/FontIcon';
// import Paper from 'material-ui/Paper';
// import RaisedButton from 'material-ui/RaisedButton';
import './error.scss';

import {
  // OccupancySelectField,
  View
} from '../../../components';

// import {
//   updateView,
// } from '../../../redux/reducers/Nav/nav';

// import {
//   sendEmail,
// } from '../../../redux/reducers/UserData/userData';


const iconStyle = {
  fontSize: '1.5em',
  color: '#ff5555'
};
const errorIcon = <FontIcon className="material-icons" style={iconStyle}>error_outline</FontIcon>;

// @connect(
//   state => ({
    // cabins: state.cabins,
    // selected: state.userData.selected,
    // totalCharge: state.userData.totalCharge,
    // values: state.userData.values,
  // }),
  // ({
  //   // sendEmail,
  //   updateView,
  // })
// )

export default class Error extends Component {

  static propTypes = {
    // doSomethingElse: PropTypes.func,
    // sendEmail: PropTypes.func,
    // updateView: PropTypes.func,
    title: PropTypes.string
  }

  static defaultProps = {
    // doSomethingElse: () => alert('what would you like this to do? I can take it off'),
    // sendEmail: () => console.log('sendEmail called: '),
    title: 'Error!',
    // updateView: (newView) => console.log('updateView: ', newView),
  }

  render() {

    const {
      title,
    } = this.props;

    return (
      <View>
        <div className="errorView">
          <div className="viewTitle">
            {errorIcon} {title}
          </div>
          <div className="viewbody">
            this is the error message
          </div>
        </div>
      </View>
    );
  }
}
