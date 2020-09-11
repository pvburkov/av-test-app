import {
  ADD_OBJECT,
  EDIT_OBJECT,
  REMOVE_OBJECT,
  LOAD_OBJECTS
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

    case LOAD_OBJECTS:
      return payload;

    default:
      return state;
  }
};

export default objectsReducer;
