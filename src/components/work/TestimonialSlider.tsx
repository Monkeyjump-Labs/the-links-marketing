import { useState } from 'react';
import type { BrandColor } from '../../lib/types';
import { bgClass, textClass } from '../../lib/colorClasses';

interface Testimonial {
  quote: string;
  clientName?: string;
  clientTitle?: string;
  bgColor?: BrandColor;
  color?: BrandColor;
}

interface Props {
  testimonials?: Testimonial[];
}

export const TestimonialSlider = ({ testimonials = [] }: Props) => {
  const [index, setIndex] = useState(0);

  if (!testimonials.length) return null;

  const goPrev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const goNext = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const slide = testimonials[index];
  const bg = slide.bgColor ?? 'grape';
  const fg = slide.color ?? 'offWhite';

  const fgClass = textClass[fg] ?? textClass.offWhite;
  const boxClass = bgClass[bg] ?? bgClass.grape;

  return (
    <div
      className={`relative my-section ml-gutter max-w-content border-2 border-r-0 border-softBlack lg:mx-0 lg:my-section-lg lg:border-l-0 lg:border-r-2 ${fgClass}`}
    >
      <div className={`absolute -left-3 -top-3 -z-10 h-full w-full ${boxClass}`} aria-hidden="true" />
      <div className="flex max-w-[60rem] flex-col p-8 lg:max-w-[80rem] lg:p-40 xl:max-w-none xl:flex-row xl:items-center xl:justify-between">
        {testimonials.length > 1 && (
          <button
            type="button"
            className="hidden cursor-pointer flex-col items-center gap-1 border-none bg-transparent p-0 font-sans text-sm uppercase tracking-[0.05rem] text-current xl:flex xl:text-base"
            onClick={goPrev}
            aria-label="Previous testimonial"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
            <span className="text-current">Prev</span>
          </button>
        )}

        <blockquote className="m-0 border-none p-0">
          <p className="m-0 mb-8 max-w-[54rem] font-mono text-lg leading-[1.8rem] lg:mb-12 lg:text-3xl lg:leading-[2.813rem]">
            &ldquo;{slide.quote}&rdquo;
          </p>
          {(slide.clientName || slide.clientTitle) && (
            <cite className="flex flex-col font-sans text-sm not-italic uppercase leading-6 tracking-[0.05rem] lg:text-base lg:leading-[1.625rem]">
              {slide.clientName && <span className="block">{slide.clientName}</span>}
              {slide.clientTitle && <span className="block">{slide.clientTitle}</span>}
            </cite>
          )}
        </blockquote>

        {testimonials.length > 1 && (
          <button
            type="button"
            className="mt-12 flex cursor-pointer flex-col items-center gap-1 self-end border-none bg-transparent p-0 font-sans text-sm uppercase tracking-[0.05rem] text-current xl:mt-0 xl:self-center xl:text-base"
            onClick={goNext}
            aria-label="Next testimonial"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
            <span className="text-current">Next</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TestimonialSlider;
