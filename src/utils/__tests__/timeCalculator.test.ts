import { describe, it, expect } from 'vitest';
import {
  addTime,
  subtractTime,
  multiplyTime,
  divideTime,
  timeToSeconds,
  secondsToTime,
  formatTime,
  isZero,
  createZeroTime,
} from '../timeCalculator';
import type { TimeValue } from '../../types/time';

describe('timeCalculator', () => {
  describe('timeToSeconds', () => {
    it('should convert time to total seconds', () => {
      const time: TimeValue = { days: 1, hours: 2, minutes: 30, seconds: 45 };
      const expected = 1 * 86400 + 2 * 3600 + 30 * 60 + 45;
      expect(timeToSeconds(time)).toBe(expected);
    });

    it('should handle zero time', () => {
      const time: TimeValue = createZeroTime();
      expect(timeToSeconds(time)).toBe(0);
    });
  });

  describe('secondsToTime', () => {
    it('should convert seconds to time value', () => {
      const seconds = 1 * 86400 + 2 * 3600 + 30 * 60 + 45;
      const expected: TimeValue = { days: 1, hours: 2, minutes: 30, seconds: 45 };
      expect(secondsToTime(seconds)).toEqual(expected);
    });

    it('should handle negative seconds', () => {
      const seconds = -(2 * 3600 + 30 * 60);
      const result = secondsToTime(seconds);
      expect(result.days).toBe(-0);
      expect(result.hours).toBe(2);
      expect(result.minutes).toBe(30);
      expect(result.seconds).toBe(0);
    });

    it('should handle zero seconds', () => {
      expect(secondsToTime(0)).toEqual(createZeroTime());
    });
  });

  describe('formatTime', () => {
    const time: TimeValue = { days: 1, hours: 2, minutes: 30, seconds: 45 };

    it('should format time as dd:hh:mm:ss', () => {
      expect(formatTime(time, 'dd:hh:mm:ss')).toBe('01:02:30:45');
    });

    it('should format time as hh:mm:ss', () => {
      expect(formatTime(time, 'hh:mm:ss')).toBe('26:30:45');
    });

    it('should format time as mm:ss', () => {
      expect(formatTime(time, 'mm:ss')).toBe('1590:45');
    });

    it('should format time as ss', () => {
      expect(formatTime(time, 'ss')).toBe('95445');
    });

    it('should pad single digit values', () => {
      const time: TimeValue = { days: 0, hours: 1, minutes: 2, seconds: 3 };
      expect(formatTime(time, 'dd:hh:mm:ss')).toBe('00:01:02:03');
    });

    it('should handle negative time values', () => {
      const time: TimeValue = { days: -1, hours: 2, minutes: 30, seconds: 45 };
      expect(formatTime(time, 'dd:hh:mm:ss')).toBe('-01:02:30:45');
    });
  });

  describe('addTime', () => {
    it('should add two time values', () => {
      const a: TimeValue = { days: 0, hours: 1, minutes: 30, seconds: 0 };
      const b: TimeValue = { days: 0, hours: 0, minutes: 45, seconds: 0 };
      const expected: TimeValue = { days: 0, hours: 2, minutes: 15, seconds: 0 };
      expect(addTime(a, b)).toEqual(expected);
    });

    it('should handle overflow from seconds to minutes', () => {
      const a: TimeValue = { days: 0, hours: 0, minutes: 0, seconds: 90 };
      const b: TimeValue = createZeroTime();
      const expected: TimeValue = { days: 0, hours: 0, minutes: 1, seconds: 30 };
      expect(addTime(a, b)).toEqual(expected);
    });

    it('should handle overflow to days', () => {
      const a: TimeValue = { days: 0, hours: 24, minutes: 0, seconds: 0 };
      const b: TimeValue = createZeroTime();
      const expected: TimeValue = { days: 1, hours: 0, minutes: 0, seconds: 0 };
      expect(addTime(a, b)).toEqual(expected);
    });
  });

  describe('subtractTime', () => {
    it('should subtract two time values', () => {
      const a: TimeValue = { days: 0, hours: 2, minutes: 0, seconds: 0 };
      const b: TimeValue = { days: 0, hours: 1, minutes: 30, seconds: 0 };
      const expected: TimeValue = { days: 0, hours: 0, minutes: 30, seconds: 0 };
      expect(subtractTime(a, b)).toEqual(expected);
    });

    it('should handle negative result', () => {
      const a: TimeValue = { days: 0, hours: 1, minutes: 0, seconds: 0 };
      const b: TimeValue = { days: 0, hours: 2, minutes: 0, seconds: 0 };
      const result = subtractTime(a, b);
      expect(result.days).toBe(-0);
      expect(result.hours).toBe(1);
      expect(result.minutes).toBe(0);
      expect(result.seconds).toBe(0);
    });
  });

  describe('multiplyTime', () => {
    it('should multiply time by scalar', () => {
      const time: TimeValue = { days: 0, hours: 0, minutes: 30, seconds: 0 };
      const expected: TimeValue = { days: 0, hours: 1, minutes: 0, seconds: 0 };
      expect(multiplyTime(time, 2)).toEqual(expected);
    });

    it('should handle fractional scalar', () => {
      const time: TimeValue = { days: 0, hours: 1, minutes: 0, seconds: 0 };
      const expected: TimeValue = { days: 0, hours: 0, minutes: 30, seconds: 0 };
      expect(multiplyTime(time, 0.5)).toEqual(expected);
    });
  });

  describe('divideTime', () => {
    it('should divide time by scalar', () => {
      const time: TimeValue = { days: 0, hours: 2, minutes: 0, seconds: 0 };
      const expected: TimeValue = { days: 0, hours: 1, minutes: 0, seconds: 0 };
      expect(divideTime(time, 2)).toEqual(expected);
    });

    it('should handle fractional result', () => {
      const time: TimeValue = { days: 0, hours: 1, minutes: 0, seconds: 0 };
      const expected: TimeValue = { days: 0, hours: 0, minutes: 30, seconds: 0 };
      expect(divideTime(time, 2)).toEqual(expected);
    });
  });

  describe('isZero', () => {
    it('should return true for zero time', () => {
      expect(isZero(createZeroTime())).toBe(true);
    });

    it('should return false for non-zero time', () => {
      const time: TimeValue = { days: 0, hours: 0, minutes: 0, seconds: 1 };
      expect(isZero(time)).toBe(false);
    });
  });
});
