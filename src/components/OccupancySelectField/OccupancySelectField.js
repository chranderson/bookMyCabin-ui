import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import './selectField.scss';

export default class OccupancySelectField extends Component {

  static propTypes = {
    defaultVal: PropTypes.number,
    id: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.number,
  }

  static defaultProps = {
    onChange: (val) => console.log('onChange called: ', val),
    // defaultVal: 2,
    id: '',
    options: 6,
  }

  // constructor(props) {
  //   super(props);
  // }

  handleChange = (evt, val) => {
    this.props.onChange(this.props.id, val + 1);
  }

  renderOptions(count) {
    const options = [];
    for (let index = 1; index < count + 1; index++) {
      options.push(index);
    }
    return options.map(option => <MenuItem key={option} value={option} primaryText={`${option} guest${option > 1 ? 's' : ''}`} />);
  }

  render() {

    const {
      defaultValue,
      options,
    } = this.props;

    return (
      <div className="occSelectField">
        <SelectField
          errorText={!defaultValue ? 'required field' : ''}
          hintText="Enter Number of Guests"
          value={defaultValue ? defaultValue : undefined}
          onChange={this.handleChange}
        >
          {this.renderOptions(options)}
        </SelectField>
      </div>
    );
  }
}
