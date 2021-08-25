# Useful React hooks

### `useClickOutside( ref, onClickOutside )`
Run a callback when clicking outside of an element. Useful for dismissing an active state on blur.

#### Parameters
| Param | Description |
|---|---|
| `ref` | DOM reference provided by `useRef` |
| `onClickOutside` | Callback function to run when clicking outside |

#### Returns
None.

#### Example
```
import { useRef, useState } from 'react';

import useClickOutside from './use-click-outside';

const Example = () => {
  const ref = useRef( null );
  const [ active, setActive ] = useState( false );

  useClickOutside( ref, () => setActive( false ) );

  return (
    <div ref={ ref } onClick={ setActive( ! active ) }>
      <h4>Click to toggle the content below.</h4>
      <p isActive={ active }>This text could be visible based on isActive and it can be hidden when clicking away from it.</p>
    <div>
  );
};
```
