// Easily change the announcement message here.
export const ANNOUNCEMENT_MESSAGE = 'FREE SHIPPING ON ORDERS OVER $100';

export default function AnnouncementBar({ message = ANNOUNCEMENT_MESSAGE }) {
  return (
    <div className="bg-ink text-white text-center text-[11px] sm:text-xs font-medium tracking-wide py-2 px-4">
      {message}
    </div>
  );
}
