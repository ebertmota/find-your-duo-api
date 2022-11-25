import { Game } from '@/domain/entities';

export const createFakeGame = (): Game => ({
  id: 'any_id',
  title: 'any_title',
  bannerUrl: 'any_banner_url',
});
