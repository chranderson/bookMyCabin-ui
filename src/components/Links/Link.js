import React, { Component, PropTypes } from 'react';

import styles from './linkStyle.js';

export default class Link extends Component {

  static propTypes = {
    id: PropTypes.string,
    link: PropTypes.string,
    title: PropTypes.string
  }

  static defaultProps = {
    id: 'xx',
    url: 'http://',
    title: 'link'
  }

  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };
    // this.function = this.function.bind(this);
  }

  toggleHover = () => {
    this.setState({
      hovered: !this.state.hovered
    });
  }

  render() {
  // const styles = require('Link.scss');

    const {
      id,
      url,
      title
    } = this.props;

    const {
      hovered
    } = this.state;

    const dynamicStyle = hovered
                       ? { ...styles.link, ...styles.hover }
                       : styles.link;

    return (
      <a href={ url }
         onMouseOver={ this.toggleHover }
         onMouseLeave={ this.toggleHover }
         ref={ `${id}Link` }
         style={ dynamicStyle }
         target={ '_blank' }
         title={ title }>
        { title }
      </a>
    );
  }
}
