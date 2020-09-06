Notifications:

```jsx
import { useState } from 'react';

const [notifications, setNotifications] = useState([]);

<div>
  <button onClick={() => {
    if (notifications.length > 0) {
      return;
    }

    setNotifications([ ...notifications, {
      id: 'success',
      type: 'success',
      text: 'Test success notification'
    }]);

    setTimeout(() => setNotifications([]), 3000);
  }}>
    Show success notification
  </button>

  <button onClick={() => {
    if (notifications.length > 0) {
      return;
    }

    setNotifications([ ...notifications, {
      id: 'failure',
      type: 'failure',
      text: 'Test failure notification'
    }]);

    setTimeout(() => setNotifications([]), 3000);
  }}>
    Show failure notification
  </button>

  <Notifications notifications={notifications} />
</div>
```
