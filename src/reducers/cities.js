import { GENERATE_CITIES } from '../actions/cities';
import City from '../tsp/city';

export default function cities(state = [], action) {
  switch (action.type) {
    case GENERATE_CITIES:
      let result = [];
      for (let i = 0; i < action.count; i++) {
        result.push(new City(action.limitX, action.limitY));
      }
      return result;
    default:
      return state;
  }
}
