#### `useClickOutside( ref, callback, shouldListen )`
Run a callback when clicking outside of an element. Useful for dismissing an active state on blur.

#### Parameters
| Param | Description |
|---|---|
| `ref` | DOM reference provided by `useRef` |
| `callback` | Callback function to run |
| `shouldListen` | Flag to toggle  |

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
    <div ref={ ref } onClick={ () => setActive( ! active ) }>
      <h4>Click here to toggle the hidden content.</h4>
      <p className={ ! active && 'hidden' }>This text is made visible when clicking the container and hidden again when clicking outside of it.</p>
    <div>
  );
};
```
