'use client'

import { useEffect, useState } from 'react';

type keyName = string
type newValue = {
  content: unknown,
  stringify: boolean
}
type storedValue = string | undefined | unknown | null

export const useLocalStorage = (keyName: keyName) => {
  const [storedValue, setStoredValue] = useState<storedValue>();
  const [isLoading, setIsLoading] = useState(true);

  const setValue = ({
    content,
    stringify
  }: newValue) => {
    try {
      setIsLoading(true);
      const stringifiedValue = stringify ? JSON.stringify(content) : content;
      window.localStorage.setItem(keyName, stringifiedValue as unknown as string);
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false);
    }
    setStoredValue(content)
  };

  const removeValue = () => {
    try {
      setIsLoading(true);
      window.localStorage.removeItem(keyName);
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false);
    }
    setStoredValue(undefined)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const value = window.localStorage.getItem(keyName);

    try {
      if (value) {
        const parsedValue = JSON.parse(value);
        setStoredValue(parsedValue);
      }
    } catch (err) {
      return setStoredValue(value)
    } finally {
      setIsLoading(false)
    }
  }, [keyName]);

  return [storedValue, setValue, isLoading, removeValue];
};
