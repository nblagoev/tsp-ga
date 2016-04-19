import React, { Component, PropTypes } from 'react';

export default class ResultsPanel extends Component {
  static propTypes = {
    evolvedPopulation: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="clearfix">
        <ul className="list-group">
          <li className="list-group-item"><b>Initial Distance:</b>&nbsp;{this.props.evolvedPopulation.initialDistance}</li>
          <li className="list-group-item"><b>Final Distance:</b>&nbsp;&nbsp;{this.props.evolvedPopulation.finalDistance}</li>
        </ul>
      </div>
    );
  }
}
