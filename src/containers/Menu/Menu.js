import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
// import * as aboutActionCreators from '../../redux/reducers/About/about';

import {
  MenuBar
} from '../../components';

// import {
  //
// } from '../../containers';


// @connect(
//   state => ({
//     about: state.about.time,
//   }),
// )

export default class Menu extends Component {

  static propTypes = {
    pages: PropTypes.array,
  }
  static defaultProps = {
    pages: [
      'about',
      'news',
      'shows',
      'music',
      'photos',
      'videos',
    ]
  }

  render() {

    const {
      pages
    } = this.props;

    // const {} = this.state;

    const style = {
      // border: '1px solid yellow',
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      zIndex: 10,
      display: 'flex',
      justifyContent: 'center',
      // margin: '0 auto',
      // width: '100%',

    };

    return (
      <div style={style}>
        <MenuBar options={pages} />
      </div>
    );
  }
}
