import { describe, it, expect } from 'vitest';
import nextConfig from '../../next.config.mjs';

describe('Next.js Configuration', () => {
  it('should import nextConfig without errors', () => {
    expect(nextConfig).toBeDefined();
  });

  it('should be an object', () => {
    expect(nextConfig).toBeInstanceOf(Object);
  });

  it('should have specific properties', () => {
    expect(nextConfig).toHaveProperty('reactStrictMode');
  });
});
