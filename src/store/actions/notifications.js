import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from './actionTypes';

const addNotificationAction = ({ id, type, text }) => ({
  type: ADD_NOTIFICATION,
  payload: { id, type, text }
});

const removeNotificationAction = (notificationId) => ({
  type: REMOVE_NOTIFICATION,
  payload: notificationId
});

export {
  addNotificationAction,
  removeNotificationAction
};
