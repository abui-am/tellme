import { KeyboardEvent } from 'react';

const useKeyPressEnter = <T = HTMLDivElement>(onPressEnter: () => void) => {
  function keyHandler(event: KeyboardEvent<T>): void {
    if (event.key === 'Enter') {
      if (onPressEnter) onPressEnter();
    }
  }
  return keyHandler;
};

export { useKeyPressEnter };
