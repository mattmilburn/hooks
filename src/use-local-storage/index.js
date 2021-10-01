import { useEffect, useState } from 'react';

const ONE_DAY = 1000 * 60 * 60 * 24;

const useLocalStorage = ( key, initialValue = null ) => {
  const [ value, setValue ] = useState( initialValue );

  let storedValue = null;

  // Try to get value from localStorage.
  try {
    storedValue = typeof window !== 'undefined' && window.localStorage.getItem( key );
  } catch( err ) {
    console.log( err );
  }

  const setStoredValue = ( val, duration = ONE_DAY ) => {
    const data = JSON.stringify( {
      expDate: Date.now() + duration,
      data: val,
    } );

    // Save to localStorage.
    try {
      storedValue = typeof window !== 'undefined' && window.localStorage.setItem( key, data );
    } catch( err ) {
      console.log( err );
    }
  };

  useEffect( () => {
    if ( ! storedValue ) {
      return;
    }

    const { expDate, data } = JSON.parse( storedValue );

    // Remove data if it expired.
    if ( Date.now() >= expDate ) {
      try {
        window.localStorage.removeItem( key );
      } catch( err ) {
        console.log( err );
      }

      setValue( null );
      return;
    }

    // Return stored data.
    setValue( data );
  }, [ storedValue ] );

  return [
    value,
    setStoredValue,
  ];
}

export default useLocalStorage;
