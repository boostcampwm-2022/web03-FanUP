export function IsTimeOver(hour: number, sec: number, min: number) {
    if (hour === 0 && sec === 0 && min === 0) return true;
    else if (hour < 0 || sec < 0 || min < 0) return true;
    return false;
}
