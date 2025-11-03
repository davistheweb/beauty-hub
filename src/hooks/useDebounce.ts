import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number = 600) {
  const [debouncedValue, setDebouncedValue] = useState<T>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
}
