import { useState, useCallback } from 'react';
import type { TimeValue, Operation, CalculationState } from '../types/time';
import {
  addTime,
  subtractTime,
  multiplyTime,
  divideTime,
  createZeroTime,
  cloneTime,
} from '../utils/timeCalculator';

interface UseCalculatorReturn {
  displayValue: TimeValue;
  storedValue: TimeValue | null;
  operation: Operation | null;
  hasStoredValue: boolean;
  inputDigit: (digit: number) => void;
  setOperation: (op: Operation) => void;
  calculate: () => void;
  clear: () => void;
  clearEntry: () => void;
}

export function useCalculator(): UseCalculatorReturn {
  const [state, setState] = useState<CalculationState>({
    currentValue: createZeroTime(),
    storedValue: null,
    operation: null,
    isNewEntry: true,
  });

  const getCurrentSeconds = useCallback((time: TimeValue): number => {
    return time.days * 86400 + time.hours * 3600 + time.minutes * 60 + time.seconds;
  }, []);

  const inputDigit = useCallback(
    (digit: number) => {
      setState((prev) => {
        // If a new entry is expected (e.g. after operator pressed), start fresh
        const base = prev.isNewEntry ? createZeroTime() : cloneTime(prev.currentValue);

        // Shift all digits left and add new digit on the right
        // Treat time as 8 digits: DD HH MM SS (2 digits each)
        // Example: 00:00:01:23 pressing 4 -> 00:00:12:34

        // Extract current digits (each time unit has 2 digits)
        const d0 = base.days % 10;                    // days ones
        const h1 = Math.floor(base.hours / 10) % 10; // hours tens
        const h0 = base.hours % 10;                   // hours ones
        const m1 = Math.floor(base.minutes / 10) % 10; // minutes tens
        const m0 = base.minutes % 10;                 // minutes ones
        const s1 = Math.floor(base.seconds / 10) % 10; // seconds tens
        const s0 = base.seconds % 10;                 // seconds ones

        // Shift all digits left by one position, add new digit at rightmost position
        const newDays = d0 * 10 + h1;
        const newHours = h0 * 10 + m1;
        const newMinutes = m0 * 10 + s1;
        const newSeconds = s0 * 10 + digit;

        return {
          ...prev,
          currentValue: {
            days: newDays,
            hours: newHours,
            minutes: newMinutes,
            seconds: newSeconds,
          },
          isNewEntry: false,
        };
      });
    },
    []
  );

  const setOperation = useCallback(
    (op: Operation) => {
      setState((prev) => {
        if (prev.operation && !prev.isNewEntry) {
          // Calculate previous operation first
          let result: TimeValue;
          if (prev.storedValue) {
            switch (prev.operation) {
              case 'add':
                result = addTime(prev.storedValue, prev.currentValue);
                break;
              case 'subtract':
                result = subtractTime(prev.storedValue, prev.currentValue);
                break;
              case 'multiply':
                // Multiply current value by scalar (storedValue converted to number)
                const scalar = getCurrentSeconds(prev.storedValue);
                result = multiplyTime(prev.currentValue, scalar);
                break;
              case 'divide':
                const divisor = getCurrentSeconds(prev.storedValue);
                result = divideTime(prev.currentValue, divisor);
                break;
            }
          } else {
            result = cloneTime(prev.currentValue);
          }

          return {
            currentValue: result,
            storedValue: cloneTime(result),
            operation: op,
            isNewEntry: true,
          };
        }

        return {
          ...prev,
          storedValue: cloneTime(prev.currentValue),
          operation: op,
          isNewEntry: true,
        };
      });
    },
    [getCurrentSeconds]
  );

  const calculate = useCallback(() => {
    setState((prev) => {
      if (!prev.operation || !prev.storedValue) {
        return prev;
      }

      let result: TimeValue;
      switch (prev.operation) {
        case 'add':
          result = addTime(prev.storedValue, prev.currentValue);
          break;
        case 'subtract':
          result = subtractTime(prev.storedValue, prev.currentValue);
          break;
        case 'multiply':
          const scalar = getCurrentSeconds(prev.storedValue);
          result = multiplyTime(prev.currentValue, scalar);
          break;
        case 'divide':
          const divisor = getCurrentSeconds(prev.storedValue);
          result = divideTime(prev.currentValue, divisor);
          break;
      }

      return {
        currentValue: result,
        storedValue: null,
        operation: null,
        isNewEntry: true,
      };
    });
  }, [getCurrentSeconds]);

  const clear = useCallback(() => {
    setState({
      currentValue: createZeroTime(),
      storedValue: null,
      operation: null,
      isNewEntry: true,
    });
  }, []);

  const clearEntry = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentValue: createZeroTime(),
      isNewEntry: true,
    }));
  }, []);

  return {
    displayValue: state.currentValue,
    storedValue: state.storedValue,
    operation: state.operation,
    hasStoredValue: state.storedValue !== null,
    inputDigit,
    setOperation,
    calculate,
    clear,
    clearEntry,
  };
}
