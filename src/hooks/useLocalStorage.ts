import {useState, useEffect, Dispatch, SetStateAction} from 'react';

function getStorageValue<T>(key: string, defaultValue: T) {
  const saved = localStorage.getItem(key) || '';
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

export default function useLocalStorage<T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      setValue(item ? JSON.parse(item) : defaultValue);
    } catch (error) {
      setValue(defaultValue);
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
