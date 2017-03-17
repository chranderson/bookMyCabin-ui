import React, {
  Component,
  // PropTypes
} from 'react';

import styles from './pageStyle.js';

export default class Page extends Component {

  render() {

    return (
      <div style={ styles.page }>
        { this.props.children }
      </div>
    );
  }
}
