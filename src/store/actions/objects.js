import {
  ADD_OBJECT,
  EDIT_OBJECT,
  REMOVE_OBJECT
} from './actionTypes';

const addObjectAction = (objectInfo) => ({
  type: ADD_OBJECT,
  payload: objectInfo
});

const editObjectAction = (objectInfo) => ({
  type: EDIT_OBJECT,
  payload: objectInfo
});

const removeObjectAction = (objectId) => ({
  type: REMOVE_OBJECT,
  payload: objectId
});

export {
  addObjectAction,
  editObjectAction,
  removeObjectAction
};
