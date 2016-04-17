import React, { Component, PropTypes } from 'react';
import NumberInputGroup from './NumberInputGroup';
import SuccessButtonGroup from './SuccessButtonGroup';
import PrimaryButtonGroup from './PrimaryButtonGroup';
import CheckboxGroup from './CheckboxGroup';

export default class SettingsPanel extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      numberOfCities: 20,
      numberOfGenerations: 100,
      populationSize: 50,
      mutationRate: 0.015,
      selectionSize: 5,
      elitismEnabled: true
    };
  }

  generateCities() {
    this.props.actions.generateCities(
      this.state.numberOfCities,
      this.props.settings.limitX - 2,
      this.props.settings.limitY - 2
    );
  }

  evolvePopulation() {
    this.props.actions.evolvePopulation(this.state.numberOfGenerations);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleCitiesChange(event) {
    this.setState({numberOfCities: event.target.value});
  }

  handleGenerationsChange(event) {
    this.setState({numberOfGenerations: event.target.value});
  }

  handlePopulationSizeChange(event) {
    this.setState({populationSize: event.target.value});
  }

  handleMutationRateChange(event) {
    this.setState({mutationRate: event.target.value});
  }

  handleSelectionSizeChange(event) {
    this.setState({selectionSize: event.target.value});
  }

  handleElitismChange(event) {
    this.setState({elitismEnabled: event.target.checked});
  }

  render() {
    return (
      <div className="clearfix settings-container">
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Travelling Salesman Problem</legend>

            <NumberInputGroup id="citiesInput" label="Cities" value={this.state.numberOfCities}
                              onChange={(event) => {this.handleCitiesChange(event);}}/>

            <PrimaryButtonGroup id="generateBtn" label="Generate" onClick={() => {this.generateCities();}}/>

            <NumberInputGroup id="generationsInput" label="Generations" value={this.state.numberOfGenerations}
                              onChange={(event) => {this.handleGenerationsChange(event);}}/>

            <NumberInputGroup id="populationSizeInput" label="Population Size" value={this.state.populationSize}
                              onChange={(event) => {this.handlePopulationSizeChange(event);}}/>

            <NumberInputGroup id="mutationRateInput" label="Mutation Rate" value={this.state.mutationRate}
                              onChange={(event) => {this.handleMutationRateChange(event);}}/>

            <NumberInputGroup id="selectionSizeInput" label="Selection Size" value={this.state.selectionSize}
                              onChange={(event) => {this.handleSelectionSizeChange(event);}}/>

            <CheckboxGroup id="elitismCheck" label="Enable Elitism" checked={this.state.elitismEnabled}
                           onChange={(event) => {this.handleElitismChange(event);}}/>

            <SuccessButtonGroup id="evolveBtn" label="Evolve" onClick={() => {this.evolvePopulation();}}/>

          </fieldset>
        </form>
      </div>
    );
  }
}