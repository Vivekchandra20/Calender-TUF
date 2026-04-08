"use client";

import { useEffect, useMemo, useState } from "react";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import Header from "@/components/calendar/Header";
import NotesPanel from "@/components/calendar/NotesPanel";

const formatMonthLabel = (date: Date) =>
  date.toLocaleString("en-US", { month: "long" });

const createMonthKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

const normalizeDate = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

const isBefore = (left: Date, right: Date) =>
  normalizeDate(left) < normalizeDate(right);

const formatDateKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;

type DayEntry = {
  reminder: string;
  holiday: string;
};

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState("");
  const [dayEntries, setDayEntries] = useState<Record<string, DayEntry>>({});
  const [activePanel, setActivePanel] = useState<"calendar" | "notes">(
    "calendar"
  );
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [heroImage, setHeroImage] = useState("");

  const monthKey = useMemo(() => createMonthKey(currentMonth), [currentMonth]);
  const monthLabel = formatMonthLabel(currentMonth);
  const year = currentMonth.getFullYear();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedTheme = window.localStorage.getItem("wall-calendar-theme");
    if (storedTheme === "dark" || storedTheme === "light") {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("wall-calendar-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    const images = [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
    ];
    const pick = images[Math.floor(Math.random() * images.length)];
    setHeroImage(pick);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedNotes = window.localStorage.getItem(
      `wall-calendar-notes-${monthKey}`
    );
    setNotes(storedNotes ?? "");
  }, [monthKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(`wall-calendar-notes-${monthKey}`, notes);
  }, [monthKey, notes]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedEntries = window.localStorage.getItem("wall-calendar-day-entries");
    if (storedEntries) {
      try {
        setDayEntries(JSON.parse(storedEntries) as Record<string, DayEntry>);
      } catch {
        setDayEntries({});
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      "wall-calendar-day-entries",
      JSON.stringify(dayEntries)
    );
  }, [dayEntries]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const today = new Date();
    const todayKey = formatDateKey(today);
    const entry = dayEntries[todayKey];
    if (!entry || (!entry.reminder?.trim() && !entry.holiday?.trim())) return;

    const alertKey = `wall-calendar-alert-${todayKey}`;
    if (window.localStorage.getItem(alertKey)) return;

    const lines = [
      entry.holiday?.trim() ? `Holiday: ${entry.holiday.trim()}` : null,
      entry.reminder?.trim() ? `Reminder: ${entry.reminder.trim()}` : null,
    ].filter(Boolean);

    if (lines.length) {
      window.alert(lines.join("\n"));
      window.localStorage.setItem(alertKey, "shown");
    }
  }, [dayEntries]);

  useEffect(() => {
    setStartDate(null);
    setEndDate(null);
    setSelectedDate(null);
  }, [monthKey]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    if (!startDate || endDate) {
      setStartDate(date);
      setEndDate(null);
      return;
    }

    if (isBefore(date, startDate)) {
      setEndDate(startDate);
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const selectedKey = selectedDate ? formatDateKey(selectedDate) : null;
  const selectedEntry = selectedKey ? dayEntries[selectedKey] : undefined;

  const handleEntryChange = (field: keyof DayEntry, value: string) => {
    if (!selectedKey) return;
    setDayEntries((prev) => ({
      ...prev,
      [selectedKey]: {
        reminder: field === "reminder" ? value : prev[selectedKey]?.reminder ?? "",
        holiday: field === "holiday" ? value : prev[selectedKey]?.holiday ?? "",
      },
    }));
  };

  return (
    <div className="h-screen bg-[radial-gradient(900px_circle_at_10%_10%,#f9efe1_0%,transparent_55%),radial-gradient(700px_circle_at_85%_15%,#f6e6d6_0%,transparent_60%),linear-gradient(180deg,#fbf5ec_0%,#f3e7d8_50%,#efe0cf_100%)] px-4 py-6 text-amber-950 dark:bg-[radial-gradient(900px_circle_at_10%_10%,#2a2018_0%,transparent_55%),radial-gradient(700px_circle_at_85%_15%,#2f241c_0%,transparent_60%),linear-gradient(180deg,#1f1711_0%,#1b140f_60%,#140f0b_100%)] dark:text-amber-50">
      <main className="mx-auto flex h-full w-full max-w-5xl items-center justify-center">
        <div className="relative mx-auto w-full max-w-4xl">
          <div className="pointer-events-none absolute left-1/2 -top-8 flex -translate-x-1/2 flex-col items-center">
            <div className="h-8 w-px bg-slate-300 dark:bg-amber-200/50" />
            <div className="h-4 w-4 rounded-full border-2 border-slate-300 bg-white shadow-sm dark:border-amber-200/60 dark:bg-[#241b14]" />
          </div>
          <div className="pointer-events-none absolute inset-x-10 -bottom-10 h-10 rounded-full bg-black/10 blur-3xl" />
          <div
            key={monthKey}
            className="animate-calendar-page relative h-[90vh] min-h-[520px] overflow-hidden rounded-[28px] bg-white shadow-[0_40px_90px_rgba(15,23,42,0.2)] ring-1 ring-slate-200 md:h-[88vh] dark:bg-[#1f1711] dark:ring-amber-900/40"
          >
            <Header
              monthLabel={monthLabel}
              year={year}
              onPrev={handlePrevMonth}
              onNext={handleNextMonth}
              imageUrl={heroImage}
              theme={theme}
              onToggleTheme={() =>
                setTheme((prev) => (prev === "light" ? "dark" : "light"))
              }
            />

            <section className="border-t border-slate-200/70">
              <div className="hidden max-[375px]:block px-3 pt-3">
                <div className="grid grid-cols-2 rounded-full border border-slate-200 bg-white p-1 text-xs font-semibold text-slate-500 dark:border-amber-900/40 dark:bg-[#241b14] dark:text-amber-200/70">
                  <button
                    type="button"
                    onClick={() => setActivePanel("calendar")}
                    className={`rounded-full px-3 py-2 transition ${
                      activePanel === "calendar"
                        ? "bg-slate-900 text-white dark:bg-amber-600 dark:text-amber-50"
                        : "hover:bg-slate-100 dark:hover:bg-amber-900/30"
                    }`}
                  >
                    Calendar
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePanel("notes")}
                    className={`rounded-full px-3 py-2 transition ${
                      activePanel === "notes"
                        ? "bg-slate-900 text-white dark:bg-amber-600 dark:text-amber-50"
                        : "hover:bg-slate-100 dark:hover:bg-amber-900/30"
                    }`}
                  >
                    Notes
                  </button>
                </div>
              </div>

              <div className="grid gap-3 p-3 md:h-[calc(100%-320px)] md:grid-cols-[0.9fr_1.3fr] md:gap-6 md:p-6">
                <div
                  className={`order-1 md:order-2 ${
                    activePanel === "calendar"
                      ? "max-[375px]:block"
                      : "max-[375px]:hidden"
                  }`}
                >
                  <CalendarGrid
                    currentMonth={currentMonth}
                    startDate={startDate}
                    endDate={endDate}
                    dayEntries={dayEntries}
                    onSelectDate={handleDateClick}
                  />
                </div>
                <div
                  className={`order-2 md:order-1 ${
                    activePanel === "notes"
                      ? "max-[375px]:block"
                      : "max-[375px]:hidden"
                  }`}
                >
                  <NotesPanel
                    monthLabel={monthLabel}
                    notes={notes}
                    onChange={setNotes}
                    selectedDate={selectedDate}
                    reminder={selectedEntry?.reminder ?? ""}
                    holiday={selectedEntry?.holiday ?? ""}
                    onReminderChange={(value) => handleEntryChange("reminder", value)}
                    onHolidayChange={(value) => handleEntryChange("holiday", value)}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
