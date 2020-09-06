import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from '../actions/actionTypes';

const notificationsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ADD_NOTIFICATION:
      return [
        ...state,
        payload
      ];
        
    case REMOVE_NOTIFICATION:
      return state.filter(({ id }) => id !== payload);

    default:
      return state;
  }
};

export default notificationsReducer;
