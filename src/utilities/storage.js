import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = window.localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (err) {
        console.error('localStorage error:', key, stored, err); //eslint-disable-line no-console
      }
    }
    window.localStorage.setItem(key, JSON.stringify(initialValue));
    return initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export function setObject(key, value) {
  localStorage[key] = JSON.stringify(value);
}

export function getObject(key, defaultValue) {
  const value = localStorage[key];

  if (!value) {
    return defaultValue;
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    return defaultValue;
  }
}
