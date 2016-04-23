import React, { Component, PropTypes } from 'react';

export default class EvolveButtonGroup extends Component {
  static propTypes = {
    primaryId: PropTypes.string.isRequired,
    primaryLabel: PropTypes.string.isRequired,
    primaryEnabled: PropTypes.bool.isRequired,
    onPrimaryClick: PropTypes.func.isRequired,
    secondaryId: PropTypes.string.isRequired,
    secondaryLabel: PropTypes.string.isRequired,
    secondaryEnabled: PropTypes.bool.isRequired,
    onSecondaryClick: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {
      primaryId,
      primaryEnabled,
      primaryLabel,
      onPrimaryClick,
      secondaryId,
      secondaryEnabled,
      secondaryLabel,
      onSecondaryClick,
    } = this.props;

    return (
      <div className="form-group">
        <label className="col-md-4 control-label" htmlFor={primaryId}></label>
        <div className="col-md-8">
          <button id={primaryId} name={primaryId} className="btn btn-success"
                  onClick={onPrimaryClick} disabled={!primaryEnabled}>{primaryLabel}</button>
          &nbsp;&nbsp;
          <button id={secondaryId} name={secondaryId} className="btn btn-danger"
                  onClick={onSecondaryClick} disabled={!secondaryEnabled}>{secondaryLabel}</button>
        </div>
      </div>
    );
  }
}
