import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  Field,
  Form,
  reduxForm
} from 'redux-form';
import normalizePhone from './normalizePhone'

import TextField from 'material-ui/TextField';
import './contact.scss';
import validate from './validate';
import warn from './warn';

import {
  View
} from '../../../components';

import {
  changeValidStatus,
  handleContactSubmit,
  updateFormData,
} from '../../../redux/reducers/UserData/userData';

import {
  updateView,
} from '../../../redux/reducers/Nav/nav';

@reduxForm({
  form: 'contact',
  validate,
  warn
})
@connect(
  state => ({
    initialValues: state.userData.context.user // pull initial values from account reducer
  }),
  ({
    changeValidStatus,
    handleContactSubmit,
    updateFormData,
    updateView,
  })
)

export default class Contact extends Component {

  static propTypes = {
    changeValidStatus: PropTypes.func,
    handleContactSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    updateFormData: PropTypes.func,
    updateView: PropTypes.func,
    title: PropTypes.string
  }

  static defaultProps = {
    updateFormData: (field, value) => console.log('updateformData: ', field, value),
    updateView: (newView) => console.log('updateView: ', newView),
    title: 'Contact Information'
  }

  componentWillMount() {
    this.props.initialize(this.props.initialValues);
  }

  componentWillUpdate(nextProps) {
    if (this.props.valid !== nextProps.valid) {
      this.changeValidStatus(nextProps.valid);
    }
  }

  changeValidStatus(status) {
    // console.log('changeValidStatus: ', status);
    this.props.changeValidStatus(status);
  }


  onFieldUpdate = (evt) => {
    this.props.updateFormData(evt.target.name, evt.target.value);
  }

  onSubmit = (values) => {
    console.log('values: ', values);
    this.props.handleContactSubmit(values);
    this.props.updateView('confirm');
  }

  renderTextField = ({ input, label, type, placeholder, meta: { touched, error, warning }, ...custom }) => {
    // console.log('input: ', input);
    return (
      <TextField className={'textInput'}
                 floatingLabelText={label}
                 fullWidth
                 errorText={touched && (error || warning)}
                 hintText={placeholder}
                 multiLine={input.name === 'message'}
                 rows={input.name === 'message' ? 2 : undefined}
                 rowsMax={input.name === 'message' ? 10 : undefined}
                 {...input}
                 {...custom}
                 />
    );
  };

  render() {

    const {
      title,
      handleSubmit,
      // pristine,
      // submitting,
      // valid,
    } = this.props;

    // console.log('initialValues: ', initialValues);
    // console.log('pristine: ', pristine);
    // console.log('submitting: ', submitting);
    // console.log('props: ', this.props);
    return (
      <View>
        <div className="contactView">
          <Form className="formWrap"
                onSubmit={handleSubmit(this.onSubmit)}>
            <div className="formHeader">{ title }</div>
            <div className="rowWrap">
              <Field name="firstName"
                     label="First Name "
                     onChange={this.onFieldUpdate}
                     component={this.renderTextField}
                     placeholder="Johnny"
                     type="text"
                     />
              <Field name="lastName"
                     label="Last Name "
                     onChange={this.onFieldUpdate}
                     component={this.renderTextField}
                     placeholder="Hellfire"
                     type="text" />
            </div>
            <div className="rowWrap">
              <Field name="email"
                     label="Email Address"
                     onChange={this.onFieldUpdate}
                     component={this.renderTextField}
                     placeholder="johnny@hellfire.com"
                     type="email"
                     />
              <Field name="phone"
                     label="Phone Number"
                     onChange={this.onFieldUpdate}
                     component={this.renderTextField}
                     normalize={normalizePhone}
                     placeholder="720-400-2738"
                     type="tel"
                     />
            </div>
            <Field name="message"
                   label="Questions & Comments"
                   onChange={this.onFieldUpdate}
                   component={this.renderTextField}
                   placeholder="your mesage"
                   type="tel"
                   />
          </Form>
        </div>
      </View>
    );
  }
}
