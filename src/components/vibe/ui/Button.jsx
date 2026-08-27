export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled,
  type = 'button',
  className = '',
  fullWidth = false,
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[0.08em] uppercase transition-all duration-200 select-none cursor-pointer ' +
    (disabled ? 'opacity-50 cursor-not-allowed pointer-events-none ' : '') +
    (fullWidth ? 'w-full ' : '');
  const variants = {
    primary:
      'bg-ink text-white hover:bg-black active:scale-[0.98] shadow-[0_2px_12px_rgba(0,0,0,0.15)]',
    accent: 'bg-volt text-ink hover:bg-volt-dark active:scale-[0.98]',
    outline:
      'border border-ink bg-transparent text-ink hover:bg-ink hover:text-white active:scale-[0.98]',
    ghost: 'bg-transparent text-ink hover:bg-mist active:scale-[0.98]',
  };
  const sizes = {
    sm: 'text-[11px] px-4 py-2',
    md: 'text-[12px] px-6 py-3',
    lg: 'text-[13px] px-8 py-4',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className} vibe-focus`}
    >
      {children}
    </button>
  );
}
