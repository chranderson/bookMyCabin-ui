import React, { Component, PropTypes } from 'react';
import './view.scss';


export default class View extends Component {

  static propTypes = {
    // date: PropTypes.any,
    title: PropTypes.string,
    flexDir: PropTypes.string,
  }

  static defaultProps = {
    title: '--'
  }

  render() {

    const {
      children,
      // date,
      // title
    } = this.props;

    return (
      <div className="view">
        { children }
      </div>
    );
  }
}
