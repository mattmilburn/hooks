import { useEffect } from 'react';

const useClickOutside = ( ref, callback, shouldListen = true ) => {
  const onClick = event => {
    // If `ref.current` does not contain `event.target` as a descendant, run the callback.
    if ( ref.current && ! ref.current.contains( event.target ) ) {
      callback( event );
    }
  };

  const enable = () => {
    document.addEventListener( 'click', onClick );
    document.addEventListener( 'touchend', onClick );
  };

  const disable = () => {
    document.removeEventListener( 'click', onClick );
    document.removeEventListener( 'touchend', onClick );
  };

  useEffect( () => {
    if ( shouldListen ) {
      enable();
    } else {
      disable();
    }

    return disable;
  }, [ shouldListen ] );
}

export default useClickOutside;
