import React, { Component, PropTypes } from 'react';

export default class ButtonGroup extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {id, enabled, label, onClick} = this.props;

    return (
      <div className="form-group">
        <label className="col-md-4 control-label" htmlFor={id}></label>
        <div className="col-md-6">
          <button id={id} name={id} className="btn btn-primary"
                  onClick={onClick} disabled={!enabled}>{label}</button>
        </div>
      </div>
    );
  }
}
