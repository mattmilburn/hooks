import { useEffect, useState } from 'react';

const useViewportWidth = () => {
  const [ width, setWidth ] = useState( null );

  useEffect( () => {
    const onResize = () => setWidth( window.innerWidth );

    window.addEventListener( 'resize', onResize );

    // Call immediately to initialize this behavior.
    onResize();

    return () => window.removeEventListener( 'resize', onResize );
  }, [] );

  return width;
};

export default useViewportWidth;
