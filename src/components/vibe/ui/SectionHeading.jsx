import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function SectionHeading({ eyebrow, title, subtitle, linkText, linkTo }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 lg:mb-12">
      <div>
        {eyebrow && (
          <p className="text-[12px] font-bold tracking-[0.2em] uppercase text-ink mb-2">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-ink leading-none">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mt-3 text-muted text-sm sm:text-base">{subtitle}</p>
        )}
      </div>
      {linkText && linkTo && (
        <Link
          to={linkTo}
          className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider border-b-2 border-ink pb-1 text-ink hover:gap-3 transition-all"
        >
          {linkText} <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
