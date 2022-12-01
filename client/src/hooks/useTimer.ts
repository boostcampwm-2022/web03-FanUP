import { IsTimeOver } from '@utils/isTimeOver';
import { dateDiff } from '@utils/dateDiff';
import { useEffect, useRef, useState } from 'react';

const ONE_SECOND = 1000;

const padNumber = (num: number, length: number) => {
    return String(num).padStart(length, '0');
};

export const useTimer = (targetDate: Date | null) => {
    const interval = useRef<NodeJS.Timer | null>(null);
    const [time, setTime] = useState({
        hour: '',
        min: '',
        sec: '',
    });
    const [timeEnd, setTimeEnd] = useState(false);

    const timer = () => {
        if (!targetDate) return;
        const now = new Date();
        const [diffHours, diffMin, diffSec] = dateDiff(targetDate, now);
        if (IsTimeOver(diffHours, diffMin, diffSec)) {
            if (interval.current) clearTimeout(interval?.current);
            setTimeEnd(true);
            return;
        }
        setTime({
            hour: padNumber(diffHours, 2),
            min: padNumber(diffMin, 2),
            sec: padNumber(diffSec, 2),
        });
    };

    useEffect(() => {
        if (!targetDate) return;
        timer();
        interval.current = setInterval(() => {
            timer();
        }, ONE_SECOND);
        return () => {
            if (interval.current) clearInterval(interval.current);
        };
    }, [targetDate]);

    return { hour: time.hour, min: time.min, sec: time.sec, timeEnd };
};
