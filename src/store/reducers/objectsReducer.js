import {
  ADD_OBJECT,
  EDIT_OBJECT,
  REMOVE_OBJECT
} from '../actions/actionTypes';

const objectsReducer = (state = [], { type, payload }) => {
  switch(type) {
    case ADD_OBJECT:
      return [...state, payload];
      
    case EDIT_OBJECT:
      const newState = state.map(obj =>
        obj.id === payload.id
          ? { ...payload }
          : { ...obj }
      );
      return newState;

    case REMOVE_OBJECT:
      return state.filter(({ id }) => id !== payload.id);

    default:
      return state;
  }
};

export default objectsReducer;
