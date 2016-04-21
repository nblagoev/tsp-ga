import React, { Component, PropTypes } from 'react';

export default class NumberInputGroup extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {id, enabled, value, label, onChange} = this.props;

    return (
      <div className="form-group">
        <label className="col-md-4 control-label" htmlFor={id}>{label}</label>
        <div className="col-md-6">
          <input id={id} name={id} type="text" value={value} disabled={!enabled}
                 onChange={onChange} className="form-control input-md"/>
        </div>
      </div>
    );
  }
}
