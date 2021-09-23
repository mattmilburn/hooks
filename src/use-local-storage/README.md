#### `useLocalStorage( key )`
The same as `useState` except it manages data using local storage.

#### Parameters
| Param | Description |
|---|---|
| `key` | Name of data entry in localStorage |

#### Returns
Data stored at `localStorage[key]`.

#### Example
```
import { useEffect, useState } from 'react';

import useLocalStorage from './use-local-storage';

const Example = () => {
  const [ storedData, setStoredData ] = useLocalStorage( 'example' );
  const [ data, setData ] = useState( null );

  // Using useEffect here keeps data from localStorage in sync across components.
  useEffect( () => setData( storedData ), [ storedData ] );

  return (
    <div>
      <h4>Render some data from local storage.</h4>
      <p>{ JSON.stringify( data ) }</p>
    <div>
  );
};
```
