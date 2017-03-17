import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {
  // Link
} from '../../components';

import {
  Menu,
  Main
} from '../../containers';

import './app.scss';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

@connect(
  state => ({
    time: state.info.time,
  }),
)
export default class App extends Component {

  static propTypes = {
    // something: PropTypes.any,
    time: PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      scrollUp: false
    }
    this.handleWheel = this.handleWheel.bind(this);
  }

  componentDidMount() {
    // console.log('time: ', this.props.time);
  }

  handleWheel(event) {
    // if (event.deltaY) console.log('scrolling: ', event.deltaY);

    this.setState({
      scrollUp: event.deltaY < 0,
    });
  }

  renderView() {
    return <Main />
  }

  render() {

    const {
      scrollUp,
    } = this.state;

    return (
      <div className={`app ${scrollUp ? 'up' : 'down'}`} onWheel={this.handleWheel}>

        <div className="viewWrap">
          { this.renderView() }
        </div>
        <Menu />
      </div>
    )
  }
}
