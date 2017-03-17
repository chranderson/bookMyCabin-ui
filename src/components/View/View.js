import React, { Component, PropTypes } from 'react';
import './view.scss';
import DatePicker from 'material-ui/DatePicker';

export default class View extends Component {

  static propTypes = {
    date: PropTypes.any,
    onDateChange: PropTypes.func,
    title: PropTypes.string,
  }

  static defaultProps = {
    title: '--'
  }

  render() {

    const {
      children,
      date,
      title
    } = this.props;

    return (
      <div className="view">
        <div className="header">
          <div className="title">
            {title}
          </div>
          <div className="toolBar">
            <div className="datePickerWrap">
              <DatePicker hintText={'yolo'}
                          value={date}
                          onChange={this.props.onDateChange} />
            </div>
          </div>
        </div>
        <div className="content">
          { children }
        </div>
      </div>
    );
  }
}
