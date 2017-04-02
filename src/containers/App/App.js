import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import {
  Confirm,
  Contact,
  Error,
  Header,
  Menu,
  Main,
  Success,
} from '../../containers';

import './app.scss';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

@connect(
  state => ({
    currentView: state.nav.currentView,
    controlledDate: state.calendar.controlledDate,
  }),
)
export default class App extends Component {

  static propTypes = {
    controlledDate: PropTypes.any,
    currentView: PropTypes.string,
  }

  constructor() {
    super();
    this.state = {
      // controlledDate: new Date(),
      scrollUp: false
    }
    this.handleWheel = this.handleWheel.bind(this);
  }

  // componentDidMount() {}

  handleWheel(event) {
    // if (event.deltaY) console.log('scrolling: ', event.deltaY);
    this.setState({
      scrollUp: event.deltaY < 0,
    });
  }

  renderView() {
    const {
      controlledDate,
      currentView
    } = this.props;

    let view;
    if (currentView === 'main') view = (<Main date={controlledDate} />);
    if (currentView === 'confirm') view = (<Confirm />);
    if (currentView === 'contact') view = (<Contact />);
    if (currentView === 'Error') view = (<Error />);
    if (currentView === 'review') view = (<Confirm review />);
    if (currentView === 'success') view = (<Success />);

    return view;
  }

  render() {

    const {
      scrollUp,
    } = this.state;

    return (
      <div className={`app ${scrollUp ? 'up' : 'down'}`} onWheel={this.handleWheel}>
        <Header />
        { this.renderView() }
        <Menu />
      </div>
    )
  }
}
