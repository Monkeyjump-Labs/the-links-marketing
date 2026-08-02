import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import Button from './Button.astro';

describe('Button', () => {
  it('renders an anchor with colour classes and slot content when href is set', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: { href: '/contact/', bgColor: 'mint', color: 'softBlack' },
      slots: { default: 'Get in touch' },
    });
    expect(result).toContain('<a');
    expect(result).toContain('href="/contact/"');
    expect(result).toContain('bg-mint');
    expect(result).toContain('text-softBlack');
    expect(result).toContain('Get in touch');
  });

  it('renders a button element when no href is provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: { type: 'submit' },
      slots: { default: 'Send' },
    });
    expect(result).toContain('<button');
    expect(result).toContain('type="submit"');
    expect(result).toContain('Send');
  });
});
