import { combineReducers } from 'redux';
import notificationsReducer from './notificationsReducer';

export default combineReducers({
  notifications: notificationsReducer
});
