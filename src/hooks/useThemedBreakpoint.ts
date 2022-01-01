import { useLayoutEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const BREAKPOINTS = { mobile: 0, tablet: 640, desktop: 1280 };

const useThemedBreakpoint = () => {
  const [isClient, setIsClient] = useState(false);

  const isMobile = useMediaQuery({ minWidth: BREAKPOINTS.mobile, maxWidth: BREAKPOINTS.tablet });
  const isTablet = useMediaQuery({ minWidth: BREAKPOINTS.tablet, maxWidth: BREAKPOINTS.desktop });
  const isDesktop = useMediaQuery({ minWidth: BREAKPOINTS.tablet });

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true);
  }, []);

  return {
    isDesktop: isClient ? isDesktop : true,
    isTablet: isClient ? isTablet : false,
    isMobile: isClient ? isMobile : false,
  };
};

export default useThemedBreakpoint;
