import React, { CSSProperties, useState } from 'react';

// Contact form POST endpoint. Set PUBLIC_LEAD_ENDPOINT in .env (see .env.example).
// Left unset, the form still renders; submission is disabled with a notice so the
// starter builds and previews without any backend wired up.
const LEAD_URL = import.meta.env.PUBLIC_LEAD_ENDPOINT;

const DEFAULT_TOPICS = [
  { topic: 'General Inquiry' },
  { topic: 'Sales' },
  { topic: 'Support' },
  { topic: 'Partnerships' },
  { topic: 'Careers' },
];

interface Props {
  heading?: string;
  buttonText?: string;
  contactTopicList?: Array<{ topic: string }>;
  style?: CSSProperties;
}

type FormValues = {
  name: string;
  email: string;
  topic: string;
  note: string;
};

type ErrorState = Partial<Record<keyof FormValues, string>> & { submission?: string };

const INITIAL_VALUES: FormValues = {
  name: '',
  email: '',
  topic: 'Product Development',
  note: '',
};

const inputLabel = 'text-lg font-sans block mb-2';
const asterisk = 'text-[1.2rem] font-semibold text-watermelon ml-0.5';
const fieldBase =
  'bg-offWhite border-2 border-softBlack outline-none rounded-none w-full font-sans text-base focus:border-gold';
const buttonBase =
  'text-offWhite px-6 py-3 min-w-[8.5rem] cursor-pointer border-0 text-xs leading-[1.063rem] font-bold font-mono enabled:hover:brightness-125 md:text-xl md:leading-[1.8125rem]';

export const ContactForm = ({
  heading = "Let's build something together.",
  buttonText = 'Send',
  contactTopicList = DEFAULT_TOPICS,
  style,
}: Props) => {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ErrorState>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateField = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name || !values.email || !values.note) return;
    setErrors({});
    if (!LEAD_URL) {
      setErrors({ submission: 'Contact form is not configured yet. Set PUBLIC_LEAD_ENDPOINT to enable submissions.' });
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }
      setValues(INITIAL_VALUES);
      setSuccess(true);
    } catch {
      setErrors({ submission: 'Something went wrong sending your message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full max-w-[60rem]" style={style} onSubmit={handleSubmit}>
      <div>
        <h1 className="font-mono font-normal text-3xl leading-tight m-0 mb-4 text-softBlack lg:text-5xl">{heading}</h1>
        <div className="w-full flex flex-col">
          <div className="flex w-full justify-between flex-wrap gap-6 mb-6 md:flex-nowrap lg:mb-12">
            <label className="w-full flex flex-col md:w-[calc(50%-0.75rem)]">
              <span className={inputLabel}>
                Name <span className={asterisk}>*</span>
              </span>
              <input
                className={`${fieldBase} px-4 h-[2.813rem]`}
                value={values.name}
                type="text"
                required
                onChange={(e) => updateField('name', e.target.value)}
              />
            </label>
            <label className="w-full flex flex-col md:w-[calc(50%-0.75rem)]">
              <span className={inputLabel}>
                Email <span className={asterisk}>*</span>
              </span>
              <input
                className={`${fieldBase} px-4 h-[2.813rem]`}
                value={values.email}
                type="email"
                required
                onChange={(e) => updateField('email', e.target.value)}
              />
            </label>
          </div>
          <div className="w-full mb-6 lg:mb-12">
            <label className={inputLabel}>
              Topic <span className={asterisk}>*</span>
            </label>
            <select
              className={`${fieldBase} px-4 h-[2.813rem]`}
              value={values.topic}
              onChange={(e) => updateField('topic', e.target.value)}
            >
              {contactTopicList.map((t, i) => (
                <option key={i} value={t.topic}>
                  {t.topic}
                </option>
              ))}
            </select>
          </div>
          <label className="w-full flex flex-col">
            <span className={inputLabel}>
              Notes <span className={asterisk}>*</span>
            </span>
            <textarea
              className={`${fieldBase} h-[9.313rem] resize-none p-4`}
              value={values.note}
              required
              onChange={(e) => updateField('note', e.target.value)}
            />
          </label>
        </div>
        {errors.submission && (
          <p
            className="mt-6 mb-0 px-4 py-3 border-2 border-watermelon bg-watermelon/10 text-watermelon font-sans text-base"
            role="alert"
          >
            {errors.submission}
          </p>
        )}
        <div className="mt-8 w-full flex justify-center lg:mt-12 lg:justify-end">
          {success ? (
            <button className={`${buttonBase} bg-teal`} disabled>
              ✓ Sent!
            </button>
          ) : (
            <button className={`${buttonBase} bg-grape`} type="submit" disabled={loading}>
              {loading ? '...' : buttonText}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
