// useLocalStorage.js
// Custom hook: behaves exactly like useState but persists
// value to localStorage on every update (Phase 2 - State Persistence)

import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  // Initialize state: read from localStorage if exists, else use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`useLocalStorage: could not read key "${key}"`, error)
      return initialValue
    }
  })

  // setValue: updates React state AND writes to localStorage
  const setValue = (value) => {
    try {
      // Support functional updates: setValue(prev => newVal)
      const valueToStore =
        value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn(`useLocalStorage: could not write key "${key}"`, error)
    }
  }

  return [storedValue, setValue]
}
