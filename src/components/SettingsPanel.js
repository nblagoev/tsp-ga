import React, { Component, PropTypes } from 'react';
import NumberInputGroup from './NumberInputGroup';
import SuccessButtonGroup from './SuccessButtonGroup';
import PrimaryButtonGroup from './PrimaryButtonGroup';
import CheckboxGroup from './CheckboxGroup';
import City from '../tsp/city';

export default class SettingsPanel extends Component {
  static propTypes = {
    onEvolve: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    evolveEnabled: PropTypes.bool.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      numberOfCities: 75,
      numberOfGenerations: 600,
      populationSize: 50,
      mutationRate: 0.015,
      selectionSize: 5,
      elitismEnabled: true
    };
  }

  generateCities() {
    this.props.onGenerate(this.state.numberOfCities);
    this.props.onReset();
  }

  evolvePopulation() {
    this.props.onEvolve(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleCitiesChange(event) {
    this.setState({numberOfCities: parseInt(event.target.value)});
  }

  handleGenerationsChange(event) {
    this.setState({numberOfGenerations: parseInt(event.target.value)});
  }

  handlePopulationSizeChange(event) {
    this.setState({populationSize: parseInt(event.target.value)});
  }

  handleMutationRateChange(event) {
    if (event.target.value.endsWith(".")) {
      this.setState({mutationRate: event.target.value});
      return;
    }

    this.setState({mutationRate: parseFloat(event.target.value)});
  }

  handleSelectionSizeChange(event) {
    this.setState({selectionSize: parseInt(event.target.value)});
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

            <SuccessButtonGroup id="evolveBtn" label="Evolve" enabled={this.props.evolveEnabled}
                                onClick={() => {this.evolvePopulation();}}/>

          </fieldset>
        </form>
      </div>
    );
  }
}
