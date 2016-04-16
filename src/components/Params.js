import React, { Component, PropTypes } from 'react';

export default class Params extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  generateCities() {
    this.props.actions.generateCities(this.props.settings.numberOfCities);
  }

  evolvePopulation() {
    this.props.actions.evolvePopulation(this.props.settings.numberOfGenerations);
  }

  render() {
    return (
      <div className="counter-container">
        <div className="counter-num-label">{this.props.settings.numberOfCities}</div>
        {/* Below, the even or odd statement is simply used to demonstrate how one could
        easily use a ternary operator to conditionally show an 'even' or 'odd' string
        based on the counter's value on state. */}
        <div className="counter-even-label">{this.props.settings.numberOfGenerations}</div>
        <br />
        <div className="counter-buttons">
          <button type="button" className="btn btn-default"
                  onClick={() => {this.generateCities();}}>Generate Cities</button>
          <button type="button" className="btn btn-default"
                  onClick={() => {this.evolvePopulation();}}>Evolve Population</button>
        </div>
      </div>
    );
  }
}
