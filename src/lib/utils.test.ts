import { describe, expect, it } from 'vitest';
import { camelToTitleCase, formatDate, slugify, truncate } from './utils';

describe('slugify', () => {
  it('lowercases and hyphenates', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('collapses non-alphanumeric runs into a single hyphen', () => {
    expect(slugify('Foo -- Bar!!  Baz')).toBe('foo-bar-baz');
  });

  it('trims leading and trailing hyphens', () => {
    expect(slugify('  Startup Sim  ')).toBe('startup-sim');
  });
});

describe('camelToTitleCase', () => {
  it('splits camelCase and capitalises the first word', () => {
    expect(camelToTitleCase('projectStatus')).toBe('Project Status');
  });

  it('returns an empty string for empty input', () => {
    expect(camelToTitleCase('')).toBe('');
  });
});

describe('formatDate', () => {
  it('formats a date as a long US date', () => {
    // Construct from local components so the result is timezone-independent.
    expect(formatDate(new Date(2026, 5, 5))).toBe('June 5, 2026');
  });
});

describe('truncate', () => {
  it('returns the string unchanged when within the max length', () => {
    expect(truncate('Hello', 10)).toBe('Hello');
  });

  it('truncates and appends an ellipsis when over the max length', () => {
    expect(truncate('Hello World', 5)).toBe('Hello…');
  });
});
