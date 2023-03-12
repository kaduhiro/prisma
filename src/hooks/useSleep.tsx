export const useSleep = (msec: number) => new Promise((resolve) => setTimeout(resolve, msec));
