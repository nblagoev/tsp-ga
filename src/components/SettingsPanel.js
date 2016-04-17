import React, { Component, PropTypes } from 'react';

export default class SettingsPanel extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      numberOfCities: 20
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

  render() {
    const {
      settings: {
        numberOfGenerations,
        populationSize,
        mutationRate,
        selectionSize,
        elitismEnabled
      }
    } = this.props;

    return (
      <div className="clearfix settings-container">
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>Travelling Salesman Problem</legend>

          <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="citiesInput">Cities</label>
          <div className="col-md-6">
          <input id="citiesInput" name="citiesInput" type="text" value={this.state.numberOfCities}
                 onChange={(event) => {this.handleCitiesChange(event);}}  className="form-control input-md"/>
          </div>
          </div>

          <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="generationsInput">Generations</label>
          <div className="col-md-6">
          <input id="generationsInput" name="generationsInput" type="text" defaultValue={numberOfGenerations} placeholder="100" className="form-control input-md"/>

          </div>
          </div>

          <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="populationSizeInput">Population Size</label>
          <div className="col-md-6">
          <input id="populationSizeInput" name="populationSizeInput" type="text" defaultValue={populationSize} placeholder="50" className="form-control input-md"/>

          </div>
          </div>

          <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="mutationRateInput">Mutation Rate</label>
          <div className="col-md-6">
          <input id="mutationRateInput" name="mutationRateInput" type="text" defaultValue={mutationRate} placeholder="0.0015" className="form-control input-md"/>

          </div>
          </div>

          <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="selectionSizeInput">Selection Size</label>
          <div className="col-md-6">
          <input id="selectionSizeInput" name="selectionSizeInput" type="text" defaultValue={selectionSize} placeholder="5" className="form-control input-md"/>

          </div>
          </div>

          <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="elitismCheck">Elitism</label>
          <div className="col-md-6">
            <label className="checkbox-inline" htmlFor="elitismCheck">
              <input type="checkbox" name="elitismCheck" id="elitismCheck"
              defaultValue={elitismEnabled}/>
              Enable
            </label>
          </div>
          </div>

          <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="generateBtn"></label>
          <div className="col-md-8">
            <button id="generateBtn" name="generateBtn" className="btn btn-primary"
                    onClick={() => {this.generateCities();}}>Generate</button>
            <span>&nbsp;</span>
            <button id="evolveBtn" name="evolveBtn" className="btn btn-success"
                    onClick={() => {this.evolvePopulation();}}>Evolve</button>
          </div>
          </div>

          </fieldset>
        </form>
      </div>
    );
  }
}
