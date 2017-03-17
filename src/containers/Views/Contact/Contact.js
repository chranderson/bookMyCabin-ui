import React, { Component, PropTypes } from 'react';


export default class Contact extends Component {

  static propTypes = {
    msg: PropTypes.string
  }

  static defaultProps = {
    msg: 'Contact Page'
  }

  render() {
  // const styles = require('Contact.scss');

    const {
      msg
    } = this.props;

    return (
      <div>
        { msg }
      </div>
    );
  }
}
