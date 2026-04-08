type NotesPanelProps = {
  monthLabel: string;
  notes: string;
  onChange: (value: string) => void;
  selectedDate: Date | null;
  reminder: string;
  holiday: string;
  onReminderChange: (value: string) => void;
  onHolidayChange: (value: string) => void;
};

export default function NotesPanel({
  monthLabel,
  notes,
  onChange,
  selectedDate,
  reminder,
  holiday,
  onReminderChange,
  onHolidayChange,
}: NotesPanelProps) {
  const selectedLabel = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Select a date";

  return (
    <div className="flex h-full flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-3 sm:gap-4 sm:p-5 dark:border-amber-900/50 dark:bg-[#241b14]">
      <div className="rounded-xl border border-slate-200/70 bg-slate-50 px-3 py-2 sm:py-3 dark:border-amber-900/40 dark:bg-[#2b2119]">
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 sm:text-[11px] sm:tracking-[0.25em] dark:text-amber-200/70">
          Day Details
        </p>
        <p className="mt-1 text-xs font-semibold text-slate-700 sm:text-sm dark:text-amber-50">
          {selectedLabel}
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-500 sm:mt-3 sm:text-xs dark:text-amber-200/70">
          <label className="flex flex-col gap-1">
            Reminder
            <input
              value={reminder}
              onChange={(event) => onReminderChange(event.target.value)}
              placeholder="Add a reminder"
              className="min-w-0 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-200 sm:text-sm dark:border-amber-900/50 dark:bg-[#1b140f] dark:text-amber-50"
              disabled={!selectedDate}
            />
          </label>
          <label className="flex flex-col gap-1">
            Holiday
            <input
              value={holiday}
              onChange={(event) => onHolidayChange(event.target.value)}
              placeholder="Add a holiday"
              className="min-w-0 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-200 sm:text-sm dark:border-amber-900/50 dark:bg-[#1b140f] dark:text-amber-50"
              disabled={!selectedDate}
            />
          </label>
        </div>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 sm:text-[11px] sm:tracking-[0.35em] dark:text-amber-200/70">
          Notes
        </p>
        <h2 className="mt-2 font-[family:var(--font-display)] text-xl text-slate-900 sm:text-2xl dark:text-amber-50">
          {monthLabel} notes
        </h2>
      </div>
      <textarea
        value={notes}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Write reminders, goals, or highlights..."
        className="min-h-[110px] flex-1 resize-none rounded-xl bg-[repeating-linear-gradient(0deg,transparent,transparent_22px,#e2e8f0_23px)] px-3 py-2 text-[11px] text-slate-700 focus:outline-none sm:min-h-[200px] sm:text-sm dark:bg-[repeating-linear-gradient(0deg,transparent,transparent_22px,rgba(251,233,201,0.12)_23px)] dark:text-amber-50"
      />
      <div className="text-[11px] text-slate-400 sm:text-xs dark:text-amber-200/60">
        Saved automatically for this month.
      </div>
    </div>
  );
}
