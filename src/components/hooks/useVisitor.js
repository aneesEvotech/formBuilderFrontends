import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { base_urlLink } from '../helper/config';

const useVisitor = () => {
  const location = useLocation();
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) {

      const visitedKey = `visited-${location.pathname}`;
      const isReload = performance.getEntriesByType("navigation")[0]?.type === 'reload';

      if (!sessionStorage.getItem(visitedKey) || isReload) {
        axios.post(`${base_urlLink}/api/visitor/track`, {
          url: location.pathname,
        }).then(res => {
          console.log('Visitor:', res.data);
          sessionStorage.setItem(visitedKey, 'true');
        }).catch(err => console.error('Tracking error:', err));
      }
    }

    return () => {
      effectRan.current = true;  // Mark that effect ran once
    };
  }, [location.pathname]);
};

export default useVisitor;
