import React, { Component, PropTypes } from 'react';

import CityMap from '../components/CityMap';
import SettingsPanel from '../components/SettingsPanel';
import ResultsPanel from '../components/ResultsPanel';
import GeneticAlgorithm from '../tsp/genetic-algorithm';
import Population from '../tsp/population';
import City from '../tsp/city';

export default class App extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      cities: [],
      solution: {},
      evolveEnabled: true,
      percentComplete: 0
    };
  }

  handleOnGenerate(numberOfCities) {
    let {settings} = this.props;
    let result = [];
    for (let i = 0; i < numberOfCities; i++) {
      result.push(new City(settings.limitX, settings.limitY));
    }

    this.setState({cities: result});
  }

  handleOnEvolve(options) {
    let result = {};
    let delay = (options.numberOfGenerations < 500) ? 350 : 75;
    let ga = new GeneticAlgorithm(options.mutationRate, options.selectionSize, options.elitismEnabled);
    ga.setCities(this.state.cities);
    let population = new Population(options.populationSize, true, this.state.cities);

    result.initialDistance = population.getFittest().getDistance();

    population = ga.evolvePopulation(population);
    for (let i = 0; i < options.numberOfGenerations; i++) {
      setTimeout(() => {
        let percentComplete = Math.ceil((i + 1) / options.numberOfGenerations * 100);
        population = ga.evolvePopulation(population);
        result.finalDistance = population.getFittest().getDistance();
        result.solution = population.getFittest();
        if (Math.ceil(i + 1) % 20 == 0) {
          this.setState({solution: result, evolveEnabled: false, percentComplete});
        }
      }, delay);

      setTimeout(() => {this.setState({evolveEnabled: true, percentComplete: 100})}, 500);
    }
  }

  handleOnReset() {
    this.setState({solution: {}, percentComplete: 0, evolveEnabled: true});
  }

  render() {
    return (
      <div className="container">
      	<div className="row">
      		<div className="col-md-7 mainContainer">
      			<CityMap cities={this.state.cities} evolvedPopulation={this.state.solution}
                     settings={this.props.settings} percentComplete={this.state.percentComplete}/>
      		</div>
          <div className="col-md-5 mainContainer">
      			<SettingsPanel evolveEnabled={this.state.evolveEnabled}
                           onGenerate={(n) => {this.handleOnGenerate(n);}}
                           onEvolve={(options) => {this.handleOnEvolve(options); }}
                           onReset={() => { this.handleOnReset(); }} />
            <ResultsPanel evolvedPopulation={this.state.solution} />
      		</div>
      	</div>
      </div>
    );
  }
}
