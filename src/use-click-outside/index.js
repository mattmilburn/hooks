import { useEffect } from 'react';

const useClickOutside = ( ref, onClickOutside ) => {
  const inBounds = node => {
    // Return false if we ran out of ancestors.
    if ( ! node || node === document ) {
      return false;
    }

    // Return true if we found boundary.
    if ( node === ref.current ) {
      return true;
    }

    // Run recursively until we reach a boundary or run out of nodes to compare against.
    return inBounds( node.parentNode );
  };

  useEffect( () => {
    const onClick = event => {
      // Do nothing if we don't have a ref (yet).
      if ( ! ref.current ) {
        return;
      }

      // If the click target exists outside of `ref.current`, run the callback.
      if ( ! inBounds( event.target ) ) {
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
