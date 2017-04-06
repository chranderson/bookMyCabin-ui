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

    const dropdownStyle = {
      maxWidth: '150px',
      // margin: 0,
      // padding: 0,
      // border: '1px solid blue',
      // fontSize: '1.1em',
    };
    return (
      <div className="occSelectField">
        <SelectField
          hintText="Guest count"
          value={defaultValue ? defaultValue : undefined}
          onChange={this.handleChange}
          style={dropdownStyle}>
          {this.renderOptions(options)}
        </SelectField>
      </div>
    );
  }
}
