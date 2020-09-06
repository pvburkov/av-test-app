import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withNaming } from '@bem-react/classname';
import './Notifications.css';

const notificationsClasses = withNaming({
  e: '__',
  m: '--',
  v: '-'
})('notifications');

const Notifications = ({
  notifications
}) => (
  <div className={notificationsClasses()}>
    {notifications.map(({ id, type, text }) => (
      <div
        className={notificationsClasses('item', { type })}
        key={id}
      >
        {text}
      </div>
    ))}
  </div>
);

export default memo(Notifications);

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.oneOf(['success', 'failure']),
      text: PropTypes.string
    })
  ).isRequired
};
