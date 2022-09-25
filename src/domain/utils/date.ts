// 18:00 => 1080
export const convertHourStringToMinutes = (hour: string): number => {
  const [hours, minutes] = hour.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  return totalMinutes;
};

// 1080 => 18:00
export const convertMinutesToHourString = (minutesInput: number): string => {
  const hours = Math.floor(minutesInput / 60);
  const minutes = minutesInput % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0',
  )}`;
};
