import type { TimeValue, TimeFormat } from '../types/time';

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 60 * SECONDS_PER_MINUTE;
const SECONDS_PER_DAY = 24 * SECONDS_PER_HOUR;

export function timeToSeconds(time: TimeValue): number {
  return (
    time.days * SECONDS_PER_DAY +
    time.hours * SECONDS_PER_HOUR +
    time.minutes * SECONDS_PER_MINUTE +
    time.seconds
  );
}

export function secondsToTime(totalSeconds: number): TimeValue {
  const absSeconds = Math.abs(totalSeconds);
  const days = Math.floor(absSeconds / SECONDS_PER_DAY);
  const hours = Math.floor((absSeconds % SECONDS_PER_DAY) / SECONDS_PER_HOUR);
  const minutes = Math.floor((absSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
  const seconds = absSeconds % SECONDS_PER_MINUTE;

  return {
    days: totalSeconds < 0 ? -days : days,
    hours,
    minutes,
    seconds,
  };
}

export function formatTime(time: TimeValue, format: TimeFormat): string {
  const pad = (n: number): string => Math.abs(n).toString().padStart(2, '0');
  const sign = time.days < 0 ? '-' : '';

  switch (format) {
    case 'dd:hh:mm:ss':
      return `${sign}${pad(time.days)}:${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
    case 'hh:mm:ss':
      const totalHours = Math.abs(time.days * 24 + time.hours);
      return `${sign}${pad(totalHours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
    case 'mm:ss':
      const totalMinutes = Math.abs(time.days * 24 * 60 + time.hours * 60 + time.minutes);
      return `${sign}${pad(totalMinutes)}:${pad(time.seconds)}`;
    case 'ss':
      const totalSecs = Math.abs(
        time.days * 24 * 60 * 60 + time.hours * 60 * 60 + time.minutes * 60 + time.seconds
      );
      return `${sign}${totalSecs}`;
  }
}

export function addTime(a: TimeValue, b: TimeValue): TimeValue {
  const aSeconds = timeToSeconds(a);
  const bSeconds = timeToSeconds(b);
  return secondsToTime(aSeconds + bSeconds);
}

export function subtractTime(a: TimeValue, b: TimeValue): TimeValue {
  const aSeconds = timeToSeconds(a);
  const bSeconds = timeToSeconds(b);
  return secondsToTime(aSeconds - bSeconds);
}

export function multiplyTime(time: TimeValue, scalar: number): TimeValue {
  const totalSeconds = timeToSeconds(time);
  return secondsToTime(totalSeconds * scalar);
}

export function divideTime(time: TimeValue, scalar: number): TimeValue {
  const totalSeconds = timeToSeconds(time);
  return secondsToTime(totalSeconds / scalar);
}

export function isZero(time: TimeValue): boolean {
  return time.days === 0 && time.hours === 0 && time.minutes === 0 && time.seconds === 0;
}

export function cloneTime(time: TimeValue): TimeValue {
  return { ...time };
}

export function createZeroTime(): TimeValue {
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
}
