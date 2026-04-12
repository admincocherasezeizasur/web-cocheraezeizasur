type AlertBannerProps = {
  messages: string[];
};

export function AlertBanner({ messages }: AlertBannerProps) {
  if (!messages || messages.length === 0) return null;

  return (
    <div className="w-full bg-brand-red py-3 overflow-hidden flex">
      <div className="animate-marquee shrink-0 flex gap-16 px-8">
        {messages.map((msg, idx) => (
          <span
            key={`a-${idx}`}
            className="flex items-center gap-2 text-white text-xs sm:text-sm font-semibold tracking-wide"
          >
            <span>⚠️</span>
            {msg}
          </span>
        ))}
      </div>
      <div className="animate-marquee shrink-0 flex gap-16 px-8" aria-hidden="true">
        {messages.map((msg, idx) => (
          <span
            key={`b-${idx}`}
            className="flex items-center gap-2 text-white text-xs sm:text-sm font-semibold tracking-wide"
          >
            <span>⚠️</span>
            {msg}
          </span>
        ))}
      </div>
    </div>
  );
}
