import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CityActions from '../actions/cities';
import * as SettingsActions from '../actions/settings';
import * as PopulationActions from '../actions/population';

import CityMap from '../components/CityMap';
import SettingsPanel from '../components/SettingsPanel';
import ResultsPanel from '../components/ResultsPanel';
import GeneticAlgorithm from '../tsp/genetic-algorithm';
import Population from '../tsp/population';
import City from '../tsp/city';

export default class App extends Component {
  static propTypes = {
    cities: PropTypes.arrayOf(PropTypes.instanceOf(City)).isRequired,
    settings: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      solution: {},
      evolveEnabled: true,
      percentComplete: 0
    };
  }

  handleOnEvolve(options) {
    let result = {};
    let delay = (options.numberOfGenerations < 500) ? 350 : 75;
    let ga = new GeneticAlgorithm(options.mutationRate, options.selectionSize, options.elitismEnabled);
    ga.setCities(this.props.cities);
    let population = new Population(options.populationSize, true, this.props.cities);

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

      setTimeout(() => {this.setState({evolveEnabled: true})}, 500);
    }
  }

  handleOnReset() {
    this.setState({solution: {}, percentComplete: 0, evolveEnabled: true});
  }

  render() {
    const { cities, settings, actions } = this.props;
    return (
      <div className="container">
      	<div className="row">
      		<div className="col-md-7 mainContainer">
      			<CityMap cities={cities} evolvedPopulation={this.state.solution}
                     settings={settings} percentComplete={this.state.percentComplete}/>
      		</div>
          <div className="col-md-5 mainContainer">
      			<SettingsPanel cities={cities} settings={settings} actions={actions}
                           onEvolve={(options) => {this.handleOnEvolve(options); }}
                           onReset={() => { this.handleOnReset(); }} evolveEnabled={this.state.evolveEnabled}/>
            <ResultsPanel evolvedPopulation={this.state.solution} />
      		</div>
      	</div>
      </div>
    );
  }
}

/**
 * Keep in mind that 'state' isn't the state of local object, but your single
 * state in this Redux application. 'cities' is a property within our store/state
 * object. By mapping it to props, we can pass it to the child component CityMap.
 */
function mapStateToProps(state) {
  return {
    settings: state.settings,
    cities: state.cities,
  };
}

/**
 * Turns an object whose values are 'action creators' into an object with the same
 * keys but with every action creator wrapped into a 'dispatch' call that we can invoke
 * directly later on. Here we imported the actions specified in 'CityActions.js' and
 * used the bindActionCreators function Redux provides us.
 *
 * More info: http://redux.js.org/docs/api/bindActionCreators.html
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      //Object.assign({}, SettingsActions, CityActions, PopulationActions),
      { ...SettingsActions, ...CityActions },
      dispatch
    )
  };
}

/**
 * 'connect' is provided to us by the bindings offered by 'react-redux'. It simply
 * connects a React component to a Redux store. It never modifies the component class
 * that is passed into it, it actually returns a new connected componet class for use.
 *
 * More info: https://github.com/rackt/react-redux
 */

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
