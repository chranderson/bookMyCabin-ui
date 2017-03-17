import React, { Component, PropTypes } from 'react';

import './button.scss';

export default class Button extends Component {

  static propTypes = {
    text: PropTypes.any
  }

  static defaultProps = {
    text: PropTypes.string,
  }

  render() {

    const {
      text
    } = this.props;

    return (
      <button className="button">
        {text}
      </button>
    );
  }
}
