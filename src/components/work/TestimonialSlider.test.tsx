// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { BrandColor } from '../../lib/types';
import { TestimonialSlider } from './TestimonialSlider';

afterEach(cleanup);

const testimonials: Array<{
  quote: string;
  clientName?: string;
  clientTitle?: string;
  bgColor?: BrandColor;
  color?: BrandColor;
}> = [
  { quote: 'First quote', clientName: 'Ada', clientTitle: 'CTO', bgColor: 'grape', color: 'offWhite' },
  { quote: 'Second quote', clientName: 'Grace', bgColor: 'mint', color: 'softBlack' },
];

describe('TestimonialSlider', () => {
  it('renders nothing without testimonials', () => {
    const { container } = render(<TestimonialSlider testimonials={[]} />);
    expect(container.innerHTML).toBe('');
  });

  it('hides the navigation arrows when there is only one testimonial', () => {
    render(<TestimonialSlider testimonials={[testimonials[0]]} />);
    expect(screen.getByText(/First quote/)).toBeTruthy();
    expect(screen.queryByLabelText('Next testimonial')).toBeNull();
    expect(screen.queryByLabelText('Previous testimonial')).toBeNull();
  });

  it('renders attribution when name and title are present', () => {
    render(<TestimonialSlider testimonials={[testimonials[0]]} />);
    expect(screen.getByText('Ada')).toBeTruthy();
    expect(screen.getByText('CTO')).toBeTruthy();
  });

  it('advances and wraps around with next and previous', () => {
    render(<TestimonialSlider testimonials={testimonials} />);
    expect(screen.getByText(/First quote/)).toBeTruthy();

    fireEvent.click(screen.getByLabelText('Next testimonial'));
    expect(screen.getByText(/Second quote/)).toBeTruthy();

    fireEvent.click(screen.getByLabelText('Next testimonial'));
    expect(screen.getByText(/First quote/)).toBeTruthy(); // wrapped to start

    fireEvent.click(screen.getByLabelText('Previous testimonial'));
    expect(screen.getByText(/Second quote/)).toBeTruthy(); // wrapped to end
  });
});
