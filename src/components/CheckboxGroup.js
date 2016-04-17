import React, { Component, PropTypes } from 'react';

export default class CheckboxGroup extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {id, checked, label, onChange} = this.props;

    return (
      <div className="form-group">
        <label className="col-md-4 control-label" htmlFor="elitismCheck"></label>
        <div className="col-md-6">
          <label className="checkbox-inline" htmlFor={id}>
            <input type="checkbox" name={id} id={id} checked={checked} onChange={onChange}/>
            {label}
          </label>
        </div>
      </div>
    );
  }
}
