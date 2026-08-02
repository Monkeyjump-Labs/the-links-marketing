import { useState } from 'react';
import { ProjectSlideshowInfoType } from '../../lib/types';
import { camelToTitleCase } from '../../lib/utils';

interface Slide {
  title: string;
  image?: string;
  description?: string;
  info?: Partial<ProjectSlideshowInfoType>;
  href?: string;
}

interface Props {
  slides?: Slide[];
}

export const ProjectsSlideshow = ({ slides = [] }: Props) => {
  const [index, setIndex] = useState(0);

  if (!slides.length) return null;

  const prev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
  const current = slides[index];

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="mb-8 px-gutter py-section md:mb-0 md:px-gutter-lg md:py-section-lg">
      {slides.length > 1 && (
        <div className="mb-7 flex items-center gap-8">
          <span className="font-mono text-[13px] font-bold tracking-[0.15em] text-softBlack">
            {pad(index + 1)} / {pad(slides.length)}
          </span>
          <div className="flex gap-2">
            <button
              className="cursor-pointer border-2 border-softBlack px-4 py-2 text-2xl text-softBlack transition-colors hover:bg-softBlack hover:text-offWhite"
              onClick={prev}
              aria-label="Previous project"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="cursor-pointer border-2 border-softBlack px-4 py-2 text-2xl text-softBlack transition-colors hover:bg-softBlack hover:text-offWhite"
              onClick={next}
              aria-label="Next project"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      )}
      <div className="flex max-w-[1400px] flex-col md:mx-auto md:max-w-[44rem] md:items-center lg:mx-0 lg:grid lg:max-w-[88rem] lg:grid-cols-2 lg:items-stretch lg:gap-x-24">
        <h3 className="m-0 mb-4 text-center font-mono text-[1.688rem] font-normal leading-10 text-softBlack md:text-[3.125rem] md:leading-[4.625rem] lg:col-start-2 lg:row-start-1">
          {current.title}
        </h3>
        <div className="lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:flex lg:items-center">
          <div className="mb-8 flex w-full flex-col lg:mb-0">
            {current.image && (
              <div className="group relative mt-4 overflow-hidden border-[0.2rem] border-softBlack bg-white">
                <img
                  src={current.image}
                  srcSet={current.image}
                  alt={current.title}
                  className="block h-auto w-full object-cover"
                />
                {current.href && (
                  <div className="absolute inset-0 flex items-center justify-center bg-softBlack/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <a
                      href={current.href}
                      className="border border-offWhite px-6 py-2 font-sans text-base text-offWhite no-underline"
                    >
                      Learn more
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="lg:col-start-2 lg:row-start-2">
          <div className="flex flex-col gap-5">
            {current.description && (
              <p className="text-center font-sans text-base leading-[1.625rem] text-softBlack md:text-xl md:leading-9">
                {current.description}
              </p>
            )}
            {current.info &&
              Object.entries(current.info).map(([k, v]) => (
                <div key={k} className="flex items-center justify-center">
                  <div className="mr-2 font-bold">{camelToTitleCase(k)}:</div>
                  <div>{v}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSlideshow;
