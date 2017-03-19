import React, { Component, PropTypes } from 'react';

import './contact.scss';

import {
  View
} from '../../../components';

export default class Contact extends Component {

  static propTypes = {
    title: PropTypes.string
  }

  static defaultProps = {
    title: 'Contact Form'
  }

  render() {

    const {
      title
    } = this.props;

    return (
      <View>
        <div className="contactView">
          { title }
        </div>
      </View>
    );
  }
}
