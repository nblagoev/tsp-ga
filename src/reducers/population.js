import { EVOLVE_POPULATION } from '../actions/population';

export default function population(state = null, action) {
  switch (action.type) {
    case EVOLVE_POPULATION:
      return action.name;
    default:
      return state;
  }
}
