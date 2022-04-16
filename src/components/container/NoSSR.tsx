import React, { useEffect, useState } from 'react';

const NoSSR: React.FC = ({ children = <div /> }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return <>{isMounted ? children : <div />}</>;
};

export default NoSSR;
