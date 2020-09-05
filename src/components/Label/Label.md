Simple label:

```jsx
<Label>
  Simple label
</Label>
```

Label with error info:

```jsx
<Label isErrorInfo>
  Error information
</Label>
```

Hidden label (playground):

```jsx
import { useState } from 'react';

const [isHidden, setIsHidden] = useState(false);

<>
  <div>
    <Label isHidden={isHidden}>
      Some information
    </Label>
  </div>
  <button
    onClick={() => setIsHidden(!isHidden)}
    style={{ 'margin-top': '5px' }}
  >
    Switch label
  </button>
</>
```
