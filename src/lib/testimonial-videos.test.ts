/// <reference types="bun" />
import { expect, test } from 'bun:test';
import { testimonialVideos } from './testimonial-videos';

test('videos follow the requested woman, man, older woman order', () => {
  expect(testimonialVideos.map(video => video.person)).toEqual(['new-woman', 'man', 'older-woman']);
  expect(testimonialVideos[0]?.url).toContain('depoimento-novo-2.mp4');
  expect(testimonialVideos[1]?.url).toContain('depoimento-novo-1.mp4');
  expect(testimonialVideos[2]?.url).toContain('depoimento-clinica.mp4');
});