import { useEffect } from 'react';

const useClickOutside = ( ref, onClickOutside ) => {
  useEffect( () => {
    const onClick = event => {
      if ( ! ref.current ) {
        return;
      }

      // If `ref.current` does not contain `event.target` as a descendant, run the callback.
      if ( ! ref.current.contains( event.target ) ) {
        onClickOutside();
      }
    };

    document.addEventListener( 'click', onClick );
    document.addEventListener( 'touchend', onClick );

    return () => {
      document.removeEventListener( 'click', onClick );
      document.removeEventListener( 'touchend', onClick );
    };
  }, [] );
};

export default useClickOutside;
