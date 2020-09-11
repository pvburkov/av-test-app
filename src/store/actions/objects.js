import {
  ADD_OBJECT,
  EDIT_OBJECT,
  REMOVE_OBJECT,
  LOAD_OBJECTS
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

const loadObjectsAction = (objectsData) => ({
  type: LOAD_OBJECTS,
  payload: objectsData
});

export {
  addObjectAction,
  editObjectAction,
  removeObjectAction,
  loadObjectsAction
};
