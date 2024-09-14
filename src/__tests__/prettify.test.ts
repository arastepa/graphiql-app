import { describe, it, expect, vi } from 'vitest';
import { formatGraphQL } from '../utils/prettify';
import gqlPrettier from 'graphql-prettier';

vi.mock('graphql-prettier', () => ({
  default: vi.fn((query) => `Formatted: ${query}`),
}));

describe('formatGraphQL', () => {
  it('should format GraphQL query using gqlPrettier', () => {
    const query = `{ user { id name } }`;
    const formattedQuery = formatGraphQL(query);

    expect(gqlPrettier).toHaveBeenCalledWith(query);
    expect(formattedQuery).toBe(`Formatted: ${query}`);
  });
});
