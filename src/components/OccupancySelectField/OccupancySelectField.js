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
    defaultVal: 2,
    id: '',
    options: 6,
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultVal
    }
  }

  handleChange = (evt, val) => {
    this.setState({
      value: val + 1
    });
    this.props.onChange(this.props.id, val + 1);
  }

  renderOptions(count) {
    const options = [];
    for (let index = 1; index < count + 1; index++) {
      options.push(index);
    }
    return options.map(option => <MenuItem key={option} value={option} primaryText={option} />);
  }

  render() {

    const {
      options,
    } = this.props;

    return (
      <div className="occSelectField">
        <SelectField
          floatingLabelText="Number of Guests"
          value={this.state.value}
          onChange={this.handleChange}>
          {this.renderOptions(options)}
        </SelectField>
      </div>
    );
  }
}
