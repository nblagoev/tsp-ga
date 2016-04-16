import { GENERATE_CITIES } from '../actions/cities';

export default function cities(state = [], action) {
  switch (action.type) {
    case GENERATE_CITIES:
      return action.name;
    default:
      return state;
  }
}
