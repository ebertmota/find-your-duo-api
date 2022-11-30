import { Modify } from '@/types';

export type CreateAd = {
  gameId: string;
  name: string;
  yearsPlaying: number;
  discord: string;
  weekDays: string[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel?: boolean;
};

export type FormattedAd = Modify<
  Ad,
  {
    hourStart: string;
    hourEnd: string;
    weekDays: string[];
  }
>;

export class Ad {
  id: string;
  gameId: string;
  name: string;
  yearsPlaying: number;
  discord: string;
  weekDays: string;
  hourStart: number;
  hourEnd: number;
  useVoiceChannel: boolean;
  createdAt: Date;

  constructor(data: CreateAd) {
    // 18:00 => 1080
    function convertHourStringToMinutes(hour: string): number {
      const [hours, minutes] = hour.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes;
      return totalMinutes;
    }

    this.gameId = data.gameId;
    this.name = data.name;
    this.yearsPlaying = data.yearsPlaying;
    this.discord = data.discord;
    this.weekDays = data.weekDays.join(',');
    this.hourStart = convertHourStringToMinutes(data.hourStart);
    this.hourEnd = convertHourStringToMinutes(data.hourEnd);
    this.useVoiceChannel = data.useVoiceChannel || false;
  }

  static format(ad: Ad): FormattedAd {
    // 1080 => 18:00
    function convertMinutesToHourString(minutesInput: number): string {
      const hours = Math.floor(minutesInput / 60);
      const minutes = minutesInput % 60;
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
        2,
        '0',
      )}`;
    }

    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    };
  }
}
