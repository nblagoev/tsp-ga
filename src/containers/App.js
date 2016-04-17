import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CityActions from '../actions/cities';
import * as SettingsActions from '../actions/settings';
import * as PopulationActions from '../actions/population';

import CityMap from '../components/CityMap';
import SettingsPanel from '../components/SettingsPanel';
import Population from '../tsp/population';
import City from '../tsp/city';

export default class App extends Component {
  static propTypes = {
    cities: PropTypes.arrayOf(PropTypes.instanceOf(City)).isRequired,
    evolvedPopulation: PropTypes.instanceOf(Population),//.isRequired,
    settings: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  render() {
    const { cities, evolvedPopulation, settings, actions } = this.props;
    return (
      <div className="container">
      	<div className="row">
      		<div className="col-md-9 mainContainer">
      			<CityMap cities={cities} evolvedPopulation={evolvedPopulation} settings={settings} />
      		</div>
          <div className="col-md-3">
      			<SettingsPanel settings={settings} actions={actions} />
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
    evolvedPopulation: state.evolvedPopulation,
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
      { ...SettingsActions, ...CityActions, ...PopulationActions },
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
