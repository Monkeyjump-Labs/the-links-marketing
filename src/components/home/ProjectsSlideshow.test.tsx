// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { ProjectsSlideshow } from './ProjectsSlideshow';

afterEach(cleanup);

const slides = [
  {
    title: 'Alpha',
    description: 'First project',
    image: '/images/alpha.jpg',
    info: { industry: 'Web' },
    href: '/caseStudy/alpha/',
  },
  { title: 'Bravo', description: 'Second project', image: '/images/bravo.jpg', info: { industry: 'Mobile' } },
];

describe('ProjectsSlideshow', () => {
  it('renders nothing when there are no slides', () => {
    const { container } = render(<ProjectsSlideshow slides={[]} />);
    expect(container.innerHTML).toBe('');
  });

  it('shows the first slide and a zero-padded counter', () => {
    render(<ProjectsSlideshow slides={slides} />);
    expect(screen.getByText('Alpha')).toBeTruthy();
    expect(screen.getByText('First project')).toBeTruthy();
    expect(screen.getByText('01 / 02')).toBeTruthy();
  });

  it('renders a Learn more link only for slides that have an href', () => {
    render(<ProjectsSlideshow slides={slides} />);
    const link = screen.getByText('Learn more').closest('a');
    expect(link?.getAttribute('href')).toBe('/caseStudy/alpha/');
  });

  it('advances to the next slide and wraps around', () => {
    render(<ProjectsSlideshow slides={slides} />);
    fireEvent.click(screen.getByLabelText('Next project'));
    expect(screen.getByText('Bravo')).toBeTruthy();
    expect(screen.getByText('02 / 02')).toBeTruthy();
    // Bravo has no href -> no Learn more link
    expect(screen.queryByText('Learn more')).toBeNull();

    fireEvent.click(screen.getByLabelText('Next project'));
    expect(screen.getByText('Alpha')).toBeTruthy();
    expect(screen.getByText('01 / 02')).toBeTruthy();
  });

  it('wraps to the last slide when going previous from the first', () => {
    render(<ProjectsSlideshow slides={slides} />);
    fireEvent.click(screen.getByLabelText('Previous project'));
    expect(screen.getByText('Bravo')).toBeTruthy();
    expect(screen.getByText('02 / 02')).toBeTruthy();
  });
});
