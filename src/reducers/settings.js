import { UPDATE_SETTINGS } from '../actions/settings';

export default function settings(state = {}, action) {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return {...state, ...action.settings};
    default:
      return state;
  }
}
