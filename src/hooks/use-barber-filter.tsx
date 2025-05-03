
import { useState, useEffect } from "react";
import { BarberFilterValue } from "@/components/ui/barbers-filter-toggle";

/**
 * Hook for managing barber filter state with localStorage persistence
 * 
 * @param {string} defaultValue - Default filter value ("all" or "self")
 * @param {string} storageKey - Key used for localStorage (allows multiple filters)
 * @returns {[BarberFilterValue, (value: BarberFilterValue) => void]} Filter state and setter
 */
export function useBarberFilter(
  defaultValue: BarberFilterValue = "all",
  storageKey: string = "barberFilter"
): [BarberFilterValue, (value: BarberFilterValue) => void] {
  // Initialize state from localStorage or default
  const [filter, setFilter] = useState<BarberFilterValue>(() => {
    const savedFilter = localStorage.getItem(storageKey);
    return (savedFilter === "all" || savedFilter === "self") 
      ? savedFilter 
      : defaultValue;
  });

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(storageKey, filter);
  }, [filter, storageKey]);

  return [filter, setFilter];
}
