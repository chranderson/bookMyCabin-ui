import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import {
  Tab
} from '../../components';

import './menuBar.scss';

export default class MenuBar extends Component {

  static propTypes = {
    echo: PropTypes.func,
    options: PropTypes.array
  }

  static defaultProps = {
    options: [],
  }

  constructor() {
    super();
    this.state = {
      selectedTab: '',
      showMenu: false
    };
    this.handleHover = this.handleHover.bind(this);
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  goHome = () => {
    console.log('Link to home');
  }

  handleHover(event) {
    // console.log('event type: ', event.type);
    this.setState({
      showMenu: event.type === 'mouseenter'
    });
  }

  handleTabClick(clickedTab: string) {
    // console.log('clickedTab: ', clickedTab);
    this.props.echo(clickedTab);
    this.setState({
      selectedTab: clickedTab
    });
  }

  renderTabs(selectedTab: string, tabs: Array<Object>) {
    // console.log('tabs: ', tabs);
    return tabs.map((tab, index) => {
      return <Tab key={index}
                  selected={tab === selectedTab}
                  tabName={tab}
                  handleClick={this.handleTabClick}
                  leftSlash={index === 0}
                  />;
    });

  }


  render() {

    const {
      options
    } = this.props;

    const {
      selectedTab,
      showMenu
    } = this.state;

    let menuBarStyle = 'MenuBar';
      menuBarStyle += showMenu
                    ? ' open'
                    : ' closed'

    return (
      <div className={menuBarStyle}
           onMouseEnter={this.handleHover}
           onMouseLeave={this.handleHover}>
        <div className="tabWrap">
          {this.renderTabs(selectedTab, options)}
        </div>
        <Link to={'/'}>
          <div className="menuIcon" />
        </Link>
      </div>
    );
  }
}
