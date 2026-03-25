export type TimeFormat = 'dd:hh:mm:ss' | 'hh:mm:ss' | 'mm:ss' | 'ss';
export type TimeUnit = 'days' | 'hours' | 'minutes' | 'seconds';

export interface TimeValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CalculationState {
  currentValue: TimeValue;
  storedValue: TimeValue | null;
  operation: Operation | null;
  isNewEntry: boolean;
}

export type Operation = 'add' | 'subtract' | 'multiply' | 'divide';
