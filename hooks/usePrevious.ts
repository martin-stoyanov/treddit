import { useEffect, useRef } from 'react';

// given a state, return the state's previous value
export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
