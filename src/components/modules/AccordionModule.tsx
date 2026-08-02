import { useState } from 'react';

interface AccordionItem {
  heading: string;
  body: string;
}

interface Props {
  items?: AccordionItem[];
}

export const AccordionModule = ({ items = [] }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto my-12 max-w-prose-page px-6 lg:my-20 lg:px-16">
      {items.map((item, i) => (
        <div key={i} className="border-b-2 border-softBlack">
          <button
            className="flex w-full items-center justify-between py-6 text-left font-mono text-lg font-normal text-softBlack lg:text-3xl"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span>{item.heading}</span>
            <span className="flex-shrink-0 text-2xl">{openIndex === i ? '−' : '+'}</span>
          </button>
          {openIndex === i && (
            <div
              className="pb-6 font-sans text-base leading-relaxed text-softBlack lg:text-xl"
              dangerouslySetInnerHTML={{ __html: item.body }}
            />
          )}
        </div>
      ))}
    </section>
  );
};

export default AccordionModule;
