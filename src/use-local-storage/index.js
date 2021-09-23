import { useEffect, useState } from 'react';

const ONE_DAY = 1000 * 60 * 60 * 24;

const useLocalStorage = key => {
  const [ value, setValue ] = useState( null );

  const setStoredValue = ( val, duration = ONE_DAY ) => {
    try {
      const data = JSON.stringify( {
        expDate: Date.now() + duration,
        data: val,
      } );

      // Save to localStorage.
      const storedValue = typeof window !== 'undefined' && window.localStorage.setItem( key, data );

      if ( ! storedValue ) {
        return;
      }

      setValue( val );
    } catch( err ) {
      // Do nothing if localStorage is not supported.
      console.log( err );
    }
  };

  useEffect( () => {
    try {
      // Get initial value from localStorage, if it exists.
      const storedValue = typeof window !== 'undefined' && window.localStorage.getItem( key );

      if ( ! storedValue ) {
        return;
      }

      const { expDate, data } = JSON.parse( storedValue );

      // Remove data if its expired.
      if ( Date.now() >= expDate ) {
        window.localStorage.removeItem( key );
        setValue( null );
        return;
      }

      // Return stored data.
      setValue( data );
    } catch( err ) {
      // Do nothing if localStorage is not supported.
      console.log( err );
    }
  }, [] );

  return [
    value,
    setStoredValue,
  ];
}

export default useLocalStorage;
