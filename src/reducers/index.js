import { combineReducers } from 'redux';
import cities from './cities';
import population from './population';
import settings from './settings'

const rootReducer = combineReducers({
  cities,
  settings,
  evolvedPopulation: population,
});

export default rootReducer;
