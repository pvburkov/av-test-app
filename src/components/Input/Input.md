Input (type="text"):

```jsx
import { useState } from 'react';

const [value, setValue] = useState('');

<Input
  id="test"
  name="test"
  onChange={({ target: { value } }) => setValue(value)}
  type="text"
  value={value}
/>
```

Input (type="password"):

```jsx
import { useState } from 'react';

const [value, setValue] = useState('');

<Input
  id="test"
  name="test"
  onChange={({ target: { value } }) => setValue(value)}
  type="password"
  value={value}
/>
```

Input with error:

```jsx
import { useState } from 'react';

const [value, setValue] = useState('');

<Input
  id="test"
  hasError
  name="test"
  onChange={({ target: { value } }) => setValue(value)}
  type="text"
  value={value}
/>
```

Input (wide mode):

```jsx
import { useState } from 'react';

const [value, setValue] = useState('');

<Input
  id="test"
  name="test"
  onChange={({ target: { value } }) => setValue(value)}
  type="text"
  value={value}
  wideMode
/>
```