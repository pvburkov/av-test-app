import { combineReducers } from 'redux';
import notificationsReducer from './notificationsReducer';
import objectsReducer from './objectsReducer';

export default combineReducers({
  notifications: notificationsReducer,
  objects: objectsReducer
});
