// Shared TypeScript types

export type BrandColor =
  | 'watermelon'
  | 'pink'
  | 'grape'
  | 'lavender'
  | 'banana'
  | 'gold'
  | 'mint'
  | 'teal'
  | 'blue'
  | 'offWhite'
  | 'softBlack';

// ── Block union ──────────────────────────────────────────────────────────────

export interface HeroBlock {
  type: 'blocks.hero';
  heading?: string;
  subHeading?: string;
  backgroundColor?: BrandColor;
  subHeadingTextWrapModel?: 'home' | 'about' | 'services' | 'work';
}

export interface ActionStatementBlock {
  type: 'blocks.action-statement';
  heading?: string;
  subHeading?: string;
  backgroundColor?: BrandColor;
  ctaLabel?: string;
  ctaUrl?: string;
}

export interface CtaWireboxBlock {
  type: 'blocks.cta-wirebox';
  heading?: string;
  subText?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  backgroundColor?: BrandColor;
  renderIcon?: boolean;
  parallaxId?: string;
}

export interface ServiceGridBlock {
  type: 'blocks.service-grid';
  heading?: string;
  subHeading?: string;
  backgroundColor?: BrandColor;
  services?: Array<{ title: string; description?: string; href?: string; icon?: string }>;
}

export interface EmployeeGridBlock {
  type: 'blocks.employee-grid';
  employees?: Array<{
    name: string;
    title?: string;
    bio?: string;
    image?: string;
    imageAltText?: string;
  }>;
}

export interface CaseStudyGridBlock {
  type: 'blocks.case-study-grid';
  heading?: string;
}

export interface CaseStudy {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  slug?: string;
  href?: string;
  industry?: string;
  technologies?: string;
  status?: string;
}

export interface TestimonialSliderBlock {
  type: 'blocks.testimonial-slider';
  testimonials?: Array<{
    quote: string;
    clientName?: string;
    clientTitle?: string;
    bgColor?: BrandColor;
    color?: BrandColor;
  }>;
}

enum ProjectSlideshowInfo {
  INDUSTRY = 'industry',
  TECHNOLOGIES = 'technologies',
  PROJECT_STATUS = 'projectStatus',
}
export type ProjectSlideshowInfoType = { [Key in `${ProjectSlideshowInfo}`]: string };

export interface CaseStudySlide {
  title: string;
  image?: string;
  description?: string;
  info: Partial<ProjectSlideshowInfoType>;
  href?: string;
}

export interface ProjectSlideshowBlock {
  type: 'blocks.proj-slideshow';
}

export interface ContactFormBlock {
  type: 'blocks.contact-form';
  heading?: string;
  buttonText?: string;
}

export interface ContactFindUsBlock {
  type: 'blocks.contact-find-us';
  heading?: string;
  companyName?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string | number;
  email?: string;
  phone?: string;
  careersHeading?: string;
  careersEmail?: string;
  careersPhone?: string;
}

export interface AccordionBlock {
  type: 'blocks.accordion';
  items?: Array<{ heading: string; body: string }>;
}

export interface StatisticCardBlock {
  type: 'blocks.statistic-card';
  statistics?: Array<{ value: string; label: string }>;
}

// ── art-blog-cs blocks ───────────────────────────────────────────────────────

export interface TextBlock {
  type: 'art-blog-cs.text-block';
  text: string;
  bgColor?: BrandColor;
}

export interface TitleBlock {
  type: 'art-blog-cs.title-block';
  title: string;
  subTitle?: string;
  author?: string;
  date?: string;
  image?: string;
  imageAltText?: string;
  imageSize?: 'thumbnail' | 'small' | 'medium' | 'large';
  bgColor?: BrandColor;
  prefix?: 'case study --';
}

export interface ImageBlock {
  type: 'art-blog-cs.image';
  image: string;
  imageAltText?: string;
  imageSize?: 'thumbnail' | 'small' | 'medium' | 'large';
  imageCaption?: string;
  imageAlignment?: 'left' | 'center' | 'right';
}

export interface TextMediaRightBlock {
  type: 'art-blog-cs.text-media-right';
  text: string;
  heading?: string;
  showHeading?: boolean;
  image: string;
  imageAltText?: string;
  imageSize?: 'thumbnail' | 'small' | 'medium' | 'large';
}

export interface TextMediaLeftBlock {
  type: 'art-blog-cs.text-media-left';
  text: string;
  heading?: string;
  showHeading?: boolean;
  image: string;
  imageAltText?: string;
  imageSize?: 'thumbnail' | 'small' | 'medium' | 'large';
}

export interface QuoteBlock {
  type: 'art-blog-cs.quote';
  quoteText: string;
  quoteSource?: string;
  quoteSourceUrl?: string;
  quoteImage?: string;
  quoteImageAltText?: string;
}

export interface ItemListBlock {
  type: 'art-blog-cs.item-list';
  heading?: string;
  itemNumberColor?: BrandColor;
  numberedItems: Array<{ text: string; subText?: string }>;
}

export interface HorizontalIconsBlock {
  type: 'art-blog-cs.horizontal-icons';
  heading?: string;
  serviceIcons: Array<{ icon: string; label: string; href?: string }>;
}

export interface TechListBlock {
  type: 'art-blog-cs.tech-list';
  technology: Array<{ name: string; icon?: string; url?: string }>;
}

export interface ButtonBlock {
  type: 'art-blog-cs.button';
  label: string;
  href: string;
  openInNewTab?: boolean;
}

export type Block =
  | HeroBlock
  | ActionStatementBlock
  | CtaWireboxBlock
  | ServiceGridBlock
  | EmployeeGridBlock
  | CaseStudyGridBlock
  | TestimonialSliderBlock
  | ProjectSlideshowBlock
  | ContactFormBlock
  | ContactFindUsBlock
  | AccordionBlock
  | StatisticCardBlock
  | TextBlock
  | TitleBlock
  | ImageBlock
  | TextMediaRightBlock
  | TextMediaLeftBlock
  | QuoteBlock
  | ItemListBlock
  | HorizontalIconsBlock
  | TechListBlock
  | ButtonBlock;

// ── Page data types ───────────────────────────────────────────────────────────

export interface PageMetadata {
  metaTitle?: string;
  metaDescription?: string;
  shareImage?: string;
  twitterCardType?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
}

export interface PageData {
  metadata: PageMetadata;
  blocks: Block[];
}
