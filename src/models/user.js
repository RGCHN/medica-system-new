import { useRef, useCallback } from 'react';

export default () => {
  const user = useRef(null);

  const setUser = value => {
    const { username = '' } = value;
    user.current = {
      username,
    };
  }

  const getUser = () => {
    return user.current;
  }

  return {
    getUser,
    setUser,
  }
}
