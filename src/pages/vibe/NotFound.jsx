import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-24 text-center">
      <div>
        <p className="text-[120px] sm:text-[180px] font-black leading-none text-ink">
          4<span className="text-volt">0</span>4
        </p>
        <h1 className="mt-2 text-3xl font-black uppercase tracking-tight text-ink">Page Not Found</h1>
        <p className="mt-3 text-muted max-w-md mx-auto">
          The style you're looking for doesn't exist here.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-8 bg-ink text-white text-[13px] font-semibold uppercase tracking-wide px-8 py-4 rounded-full hover:bg-black"
        >
          Back to Shop
        </button>
      </div>
    </div>
  );
}
