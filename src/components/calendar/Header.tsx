type HeaderProps = {
  monthLabel: string;
  year: number;
  onPrev: () => void;
  onNext: () => void;
  imageUrl: string;
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

export default function Header({
  monthLabel,
  year,
  onPrev,
  onNext,
  imageUrl,
  theme,
  onToggleTheme,
}: HeaderProps) {
  return (
    <section className="relative overflow-visible">
      <div className="pointer-events-none absolute left-1/2 -top-8 z-20 w-[92%] max-w-[780px] -translate-x-1/2">
        {/* Hook */}
        <div className="absolute left-1/2 -top-6 -translate-x-1/2">
          <div className="h-6 w-6 rounded-full border-[2px] border-slate-400 bg-white shadow-inner dark:border-amber-200/60 dark:bg-[#241b14]" />
        </div>

        {/* Spine */}
        <div className="relative h-12">
          <div className="absolute top-6 left-0 right-0 h-[2px] bg-gradient-to-r from-slate-400 via-slate-600 to-slate-400 shadow-sm dark:from-amber-200/40 dark:via-amber-100/60 dark:to-amber-200/40" />

          {/* Rings */}
          <div className="flex justify-between px-2">
            {Array.from({ length: 22 }).map((_, i) => (
              <div key={i} className="relative flex flex-col items-center">
                {/* Top half */}
                <span
                  className="h-3 w-4 rounded-t-full border-[2px] border-slate-700 border-b-0 dark:border-amber-100/60"
                  style={{
                    background:
                      "linear-gradient(135deg, #f8fafc 0%, #cbd5f5 40%, #94a3b8 100%)",
                    boxShadow:
                      "inset 0 1px 2px rgba(0,0,0,0.3), 0 1px 1px rgba(255,255,255,0.6)",
                  }}
                />

                {/* Bottom half */}
                <span
                  className="-mt-[2px] h-3 w-4 rounded-b-full border-[2px] border-slate-700 border-t-0 dark:border-amber-100/60"
                  style={{
                    background: "linear-gradient(to top, #e2e8f0, #94a3b8)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative h-[200px] pt-4 sm:h-[240px] md:h-[280px] lg:h-[310px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: imageUrl
              ? `url(${imageUrl})`
              : "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
        <div
          className="absolute bottom-0 left-0 h-24 w-32 bg-amber-700/90"
          style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
        />
        <div
          className="absolute bottom-0 right-0 h-24 w-36 bg-amber-700"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <div className="flex h-full flex-col items-end justify-center pr-4 text-white">
            <span className="text-xs uppercase tracking-[0.3em] opacity-80">
              {year}
            </span>
            <span className="font-[family:var(--font-display)] text-lg font-semibold">
              {monthLabel}
            </span>
          </div>
        </div>

        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm dark:bg-amber-50/10 dark:text-amber-50">
          <button
            type="button"
            onClick={onToggleTheme}
            className="rounded-full px-2 py-1 transition hover:bg-slate-100 dark:hover:bg-amber-50/10"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
          <span className="h-4 w-px bg-slate-200 dark:bg-amber-100/30" />
          <button
            type="button"
            onClick={onPrev}
            className="rounded-full px-2 py-1 transition hover:bg-slate-100 dark:hover:bg-amber-50/10"
          >
            Prev
          </button>
          <span className="h-4 w-px bg-slate-200 dark:bg-amber-100/30" />
          <button
            type="button"
            onClick={onNext}
            className="rounded-full px-2 py-1 transition hover:bg-slate-100 dark:hover:bg-amber-50/10"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
