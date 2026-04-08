type DayCellProps = {
  date?: Date;
  isCurrentMonth: boolean;
  isWeekend: boolean;
  isInRange: boolean;
  isStart: boolean;
  isEnd: boolean;
  hasReminder: boolean;
  hasHoliday: boolean;
  onSelect: (date: Date) => void;
};

export default function DayCell({
  date,
  isCurrentMonth,
  isWeekend,
  isInRange,
  isStart,
  isEnd,
  hasReminder,
  hasHoliday,
  onSelect,
}: DayCellProps) {
  if (!date) {
    return <div aria-hidden className="aspect-square rounded-2xl" />;
  }

  const baseClasses =
    "group flex aspect-square items-center justify-center rounded-md text-[11px] font-semibold transition-all duration-200 sm:rounded-lg sm:text-[13px]";
  const weekendClasses =
    isWeekend && !(isStart || isEnd || isInRange)
      ? "text-rose-600"
      : "text-slate-700 dark:text-amber-50";
  const mutedClasses = isCurrentMonth ? "" : "text-slate-300 dark:text-amber-200/40";
  const rangeClasses = isStart || isEnd
    ? "bg-amber-700 text-white shadow-md shadow-amber-500/30"
    : isInRange
      ? "bg-amber-100 text-amber-900"
      : "bg-white hover:bg-slate-100 dark:bg-[#2b2119] dark:hover:bg-[#3a2b21]";

  return (
    <button
      type="button"
      onClick={() => onSelect(date)}
      aria-pressed={isStart || isEnd}
      className={`${baseClasses} ${rangeClasses} ${weekendClasses} ${mutedClasses} relative ring-1 ring-slate-200/70 motion-safe:hover:-translate-y-0.5 dark:ring-amber-900/40`}
    >
      {date.getDate()}
      {(hasReminder || hasHoliday) && (
        <span className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-1">
          {hasReminder && (
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-300" />
          )}
          {hasHoliday && (
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 dark:bg-rose-300" />
          )}
        </span>
      )}
    </button>
  );
}
