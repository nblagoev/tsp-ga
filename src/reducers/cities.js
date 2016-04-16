import { GENERATE_CITIES } from '../actions/cities';
import City from '../tsp/city';

export default function cities(state = [], action) {
  switch (action.type) {
    case GENERATE_CITIES:
      let result = [];
      console.log(action);
      for (let i = 0; i < action.count; i++) {
        result.push(new City());
      }
      return result;
    default:
      return state;
  }
}
