import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import Text from './Text';
import Colors from '../theme/colors';

const appendZero = (str: string) => (str.length > 1 ? str : `0${str}`);

export type TimerRef = {restart: () => void};
export type TimerProps = {defaultTimer?: number; onFinished?: () => void};

const Timer = forwardRef<TimerRef, TimerProps>(
  ({defaultTimer = 71, onFinished}, ref) => {
    const [time, setTimer] = useState<number>(defaultTimer);
    const timeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startTimer = useCallback(() => {
      timeIntervalRef.current = setInterval(() => {
        setTimer(prevTime => {
          const nextTime = prevTime - 1;
          if (nextTime === 0 && timeIntervalRef.current) {
            clearInterval(timeIntervalRef.current);
          }
          return nextTime;
        });
      }, 1000);
    }, []);

    useImperativeHandle(ref, () => ({
      restart: () => {
        setTimer(defaultTimer);
        startTimer();
      },
    }));

    useEffect(() => {
      startTimer();
      return () => {
        timeIntervalRef.current && clearInterval(timeIntervalRef.current);
      };
    }, [startTimer]);

    useEffect(() => {
      if (time === 0) {
        onFinished?.();
      }
    }, [time, onFinished]);

    const timeString = useMemo(() => {
      const minutes = Math.floor(time / 60) || 0;
      const seconds = time % 60;
      return `${appendZero(`${minutes}`)}:${appendZero(`${seconds}`)}`;
    }, [time]);

    return (
      <Text bold color={Colors.neutralSecondaryText}>
        {timeString}
      </Text>
    );
  },
);

export default Timer;
