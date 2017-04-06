import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
// import RaisedButton from 'material-ui/RaisedButton';
import './contact.scss';

import {
  View
} from '../../../components';

import {
  updateFormData,
} from '../../../redux/reducers/UserData/userData';

import {
  updateView,
} from '../../../redux/reducers/Nav/nav';

// const nextIcon = <FontIcon className="material-icons">navigate_next</FontIcon>;

@connect(
  state => ({
    values: state.userData.values,
  }),
  ({
    updateFormData,
    updateView,
  })
)

export default class Contact extends Component {

  static propTypes = {
    updateFormData: PropTypes.func,
    updateView: PropTypes.func,
    title: PropTypes.string
  }

  static defaultProps = {
    updateFormData: (field, value) => console.log('updateformData: ', field, value),
    updateView: (newView) => console.log('updateView: ', newView),
    title: 'Contact Information'
  }

  handleSubmit = () => {
    console.log('values submitted: ', this.props.values);
    this.props.updateView('confirm');
  };

  onFormChange = (evt, field) => this.props.updateFormData(evt.target.id, field);

  render() {

    const {
      title,
      values
    } = this.props;

    // const btnStyle = {margin: 12};

    return (
      <View>
        <div className="contactView">
          <form className="formWrap">
            <div className="formHeader">{ title }</div>
            <div className="rowWrap">
              <TextField className={'textInput'}
                         errorText={''}
                         hintText="first"
                         id="firstName"
                         floatingLabelText="First Name"
                         fullWidth
                         name="firstName"
                         value={values.firstName}
                         onChange={this.onFormChange} />
              <TextField className={'textInput'}
                         errorText={''}
                         hintText="last"
                         id="lastName"
                         fullWidth
                         floatingLabelText="Last Name"
                         name="lastName"
                         value={values.lastName}
                         onChange={this.onFormChange} />
            </div>
            <div className="rowWrap">
            <TextField className={'textInput'}
                       errorText={''}
                       fullWidth
                       hintText="Email"
                       id="email"
                       type="email"
                       floatingLabelText="email address"
                       name="email"
                       value={values.email}
                       onChange={this.onFormChange} />
            <TextField className={'textInput'}
                       errorText={''}
                       fullWidth
                       hintText="Phone"
                       id="phone"
                       name="phone"
                       floatingLabelText="phone number"
                       value={values.phone}
                       onChange={this.onFormChange} />
            </div>

            <TextField hintText="message here"
                       errorText={''}
                       floatingLabelText="Questions & Comments"
                       fullWidth={true}
                       id="message"
                       name="message"
                       multiLine={true}
                       rows={2}
                       rowsMax={10}
                       value={values.message}
                       onChange={this.onFormChange} />
            { /* <br />
            <div className="btnWrap">
              <RaisedButton
                label="Confirm Request"
                labelPosition="before"
                icon={nextIcon}
                primary={true}
                onTouchTap={this.handleSubmit}
                style={{margin:'1.5em 0'}}
                type="submit" />
            </div>*/ }
          </form>
        </div>
      </View>
    );
  }
}
