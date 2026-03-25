import { useState, useCallback } from 'react';
import type { TimeValue, TimeUnit } from '../types/time';
import { createZeroTime, cloneTime } from '../utils/timeCalculator';

interface UseTimeInputReturn {
  currentTime: TimeValue;
  activeUnit: TimeUnit;
  inputDigit: (digit: number) => void;
  setActiveUnit: (unit: TimeUnit) => void;
  clear: () => void;
  reset: () => void;
  setTime: (time: TimeValue) => void;
}

const UNIT_ORDER: TimeUnit[] = ['seconds', 'minutes', 'hours', 'days'];
const UNIT_MAX: Record<TimeUnit, number> = {
  seconds: 59,
  minutes: 59,
  hours: 23,
  days: 99,
};

export function useTimeInput(initialTime: TimeValue = createZeroTime()): UseTimeInputReturn {
  const [currentTime, setCurrentTime] = useState<TimeValue>(initialTime);
  const [activeUnit, setActiveUnit] = useState<TimeUnit>('seconds');

  const clear = useCallback(() => {
    setCurrentTime(createZeroTime());
    setActiveUnit('seconds');
  }, []);

  const reset = useCallback(() => {
    setCurrentTime(createZeroTime());
    setActiveUnit('seconds');
  }, []);

  const setTime = useCallback((time: TimeValue) => {
    setCurrentTime(cloneTime(time));
  }, []);

  const inputDigit = useCallback(
    (digit: number) => {
      setCurrentTime((prev) => {
        const newTime = cloneTime(prev);
        const currentValue = newTime[activeUnit];
        const newValue = currentValue * 10 + digit;

        if (newValue > UNIT_MAX[activeUnit]) {
          // Overflow to next unit
          const overflow = Math.floor(newValue / (UNIT_MAX[activeUnit] + 1));
          const remainder = newValue % (UNIT_MAX[activeUnit] + 1);

          newTime[activeUnit] = remainder;

          const currentUnitIndex = UNIT_ORDER.indexOf(activeUnit);
          if (currentUnitIndex < UNIT_ORDER.length - 1) {
            const nextUnit = UNIT_ORDER[currentUnitIndex + 1];
            newTime[nextUnit] = Math.min(newTime[nextUnit] + overflow, UNIT_MAX[nextUnit]);
            setActiveUnit(nextUnit);
          }
        } else {
          newTime[activeUnit] = newValue;

          // Auto-advance to next unit when current unit is "full" (2 digits)
          if (newValue >= 10 && activeUnit !== 'days') {
            const currentUnitIndex = UNIT_ORDER.indexOf(activeUnit);
            if (currentUnitIndex < UNIT_ORDER.length - 1) {
              setActiveUnit(UNIT_ORDER[currentUnitIndex + 1]);
            }
          }
        }

        return newTime;
      });
    },
    [activeUnit]
  );

  return {
    currentTime,
    activeUnit,
    inputDigit,
    setActiveUnit,
    clear,
    reset,
    setTime,
  };
}
