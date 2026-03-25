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
        const newTime = base;

        // Start from seconds and work up
        const newValue = newTime.seconds * 10 + digit;

        if (newValue > 59) {
          newTime.seconds = newValue % 60;
          const minuteOverflow = Math.floor(newValue / 60);
          const newMinutes = newTime.minutes + minuteOverflow;

          if (newMinutes > 59) {
            newTime.minutes = newMinutes % 60;
            const hourOverflow = Math.floor(newMinutes / 60);
            const newHours = newTime.hours + hourOverflow;

            if (newHours > 23) {
              newTime.hours = newHours % 24;
              newTime.days += Math.floor(newHours / 24);
            } else {
              newTime.hours = newHours;
            }
          } else {
            newTime.minutes = newMinutes;
          }
        } else {
          newTime.seconds = newValue;
        }

        return {
          ...prev,
          currentValue: newTime,
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
