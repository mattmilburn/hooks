import { useEffect } from 'react';

export const findNearestAncestor = ( query, node ) => {
  // Stop searching if we ran out of ancestors.
  if ( ! node || node === document ) {
    return undefined;
  }

  // Match against the DOM node.
  if ( node === query ) {
    return node;
  }

  // Match against a string selector.
  if ( typeof query === 'string' ) {
    // Remove potential leading # or . characters from the query.
    const queryValue = query.slice( 1 );

    // Match against tag name.
    if ( node.tagName.toLowerCase() === query ) {
      return node;
    }

    // Match against ID attribute.
    if ( query.charAt( 0 ) === '#' && node.id === queryValue ) {
      return node;
    }

    // Match against class name.
    if ( node.classList.contains( queryValue ) ) {
      return node;
    }
  }

  // Run recursively until we find a match or run out of nodes to compare against.
  return findNearestAncestor( query, node.parentNode );
}

const useClickOutside = ( ref, onClickOutside ) => {
  useEffect( () => {
    const onClick = event => {
      // Do nothing if we don't have a ref (yet).
      if ( ! ref.current ) {
        return;
      }

      // If user click target exists outside of `ref.current`, run the callback.
      if ( ! findNearestAncestor( ref.current, event.target ) ) {
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
