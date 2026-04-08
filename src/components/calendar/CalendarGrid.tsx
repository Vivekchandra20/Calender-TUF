import DayCell from "./DayCell";

type CalendarGridProps = {
  currentMonth: Date;
  startDate: Date | null;
  endDate: Date | null;
  dayEntries: Record<string, { reminder: string; holiday: string }>;
  onSelectDate: (date: Date) => void;
};

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const normalizeDate = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

const isSameDay = (left: Date, right: Date) =>
  normalizeDate(left) === normalizeDate(right);

const isBetween = (date: Date, start: Date, end: Date) => {
  const value = normalizeDate(date);
  return value >= normalizeDate(start) && value <= normalizeDate(end);
};

const formatDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;

export default function CalendarGrid({
  currentMonth,
  startDate,
  endDate,
  dayEntries,
  onSelectDate,
}: CalendarGridProps) {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = firstDay.getDay();
  const totalCells = Math.ceil((leadingBlanks + daysInMonth) / 7) * 7;

  const cells = Array.from({ length: totalCells }, (_, index) => {
    const dayNumber = index - leadingBlanks + 1;
    if (dayNumber < 1 || dayNumber > daysInMonth) {
      return { date: undefined, isCurrentMonth: false };
    }

    const date = new Date(year, month, dayNumber);
    return { date, isCurrentMonth: true };
  });

  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      <div className="grid grid-cols-7 gap-1 text-[10px] uppercase tracking-[0.2em] text-slate-400 sm:gap-2 sm:text-[11px] sm:tracking-[0.25em] dark:text-amber-200/60">
        {weekDays.map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {cells.map((cell, index) => {
          const date = cell.date;
          const isWeekend = date ? [0, 6].includes(date.getDay()) : false;
          const isStart = date && startDate ? isSameDay(date, startDate) : false;
          const isEnd = date && endDate ? isSameDay(date, endDate) : false;
          const isInRange =
            date && startDate && endDate ? isBetween(date, startDate, endDate) : false;

          const entryKey = date ? formatDateKey(date) : null;
          const entry = entryKey ? dayEntries[entryKey] : undefined;
          const hasReminder = Boolean(entry?.reminder?.trim());
          const hasHoliday = Boolean(entry?.holiday?.trim());

          return (
            <DayCell
              key={`day-${index}`}
              date={date}
              isCurrentMonth={cell.isCurrentMonth}
              isWeekend={isWeekend}
              isInRange={isInRange}
              isStart={isStart}
              isEnd={isEnd}
              hasReminder={hasReminder}
              hasHoliday={hasHoliday}
              onSelect={onSelectDate}
            />
          );
        })}
      </div>
    </div>
  );
}
