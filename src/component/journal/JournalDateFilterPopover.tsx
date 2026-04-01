"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

type DateRange = {
  from: Date;
  to: Date;
};

type JournalDateFilterPopoverProps = {
  dateRange: DateRange;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange>>;
  onClose: () => void;
};

const JournalDateFilterPopover = ({
  dateRange,
  setDateRange,
  onClose,
}: JournalDateFilterPopoverProps) => {
  const calendarRef = useRef<HTMLDivElement | null>(null);
const inputRowRef = useRef<HTMLDivElement | null>(null);
  const [draftFrom, setDraftFrom] = useState(dateRange.from);
  const [draftTo, setDraftTo] = useState(dateRange.to);
  const [activeInput, setActiveInput] = useState<"from" | "to" | null>(null);
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(dateRange.to.getFullYear(), dateRange.to.getMonth(), 1),
  );

  useEffect(() => {
    setDraftFrom(dateRange.from);
    setDraftTo(dateRange.to);
    setVisibleMonth(
      new Date(dateRange.to.getFullYear(), dateRange.to.getMonth(), 1),
    );
  }, [dateRange]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (activeInput) {
          setActiveInput(null);
          return;
        }
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [activeInput, onClose]);

  useEffect(() => {
  const handleClickOutsideCalendar = (event: MouseEvent) => {
    if (!activeInput) return;

    const target = event.target as Node;

    const clickedInsideCalendar =
      calendarRef.current && calendarRef.current.contains(target);

    const clickedInsideInput =
      inputRowRef.current && inputRowRef.current.contains(target);

    if (!clickedInsideCalendar && !clickedInsideInput) {
      setActiveInput(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutsideCalendar);

  return () => {
    document.removeEventListener("mousedown", handleClickOutsideCalendar);
  };
}, [activeInput]);

  const calendarDays = useMemo(
    () => buildCalendarDays(visibleMonth),
    [visibleMonth],
  );

  const displayValue = (date: Date) => {
    return `${date.getDate()}${getOrdinal(date.getDate())} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;
  };

  const openCalendarFor = (type: "from" | "to") => {
    setActiveInput(type);
    const baseDate = type === "from" ? draftFrom : draftTo;
    setVisibleMonth(new Date(baseDate.getFullYear(), baseDate.getMonth(), 1));
  };

  const handlePickDate = (date: Date) => {
    let nextFrom = draftFrom;
    let nextTo = draftTo;

    if (activeInput === "from") {
      nextFrom = date;
      if (date > draftTo) {
        nextTo = date;
      }
    }

    if (activeInput === "to") {
      nextTo = date;
      if (date < draftFrom) {
        nextFrom = date;
      }
    }

    setDraftFrom(nextFrom);
    setDraftTo(nextTo);

    setDateRange({
      from: nextFrom,
      to: nextTo,
    });

    setActiveInput(null);
  };

  const handleApply = () => {
    setDateRange({
      from: draftFrom,
      to: draftTo,
    });
    setActiveInput(null);
    onClose();
  };

  const handleCancel = () => {
    setDraftFrom(dateRange.from);
    setDraftTo(dateRange.to);
    setActiveInput(null);
    onClose();
  };

  const calendarNode = activeInput ? (
    <div ref={calendarRef} className="absolute left-0 top-[calc(100%+8px)] z-[140]">
      <div
        className="w-[200px] rounded-[7.55px] border"
        style={{
          background: "#3D2826",
          border: "0.47px solid rgba(242,174,161,0.16)",
          boxShadow:
            "0 0 8px rgba(242,174,161,0.14), 0 10px 24px rgba(0,0,0,0.22)",
          padding: "9.43px",
        }}
      >
        <div className="flex flex-col gap-[9.43px]">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                setVisibleMonth(
                  new Date(
                    visibleMonth.getFullYear(),
                    visibleMonth.getMonth() - 1,
                    1,
                  ),
                )
              }
              className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[12px] leading-none text-[#F4E6DA]"
              aria-label="Previous month"
            >
              ‹
            </button>

            <div className="text-[10px] text-[#F2F3D9]">
              {monthNames[visibleMonth.getMonth()]} {visibleMonth.getFullYear()}
            </div>

            <button
              type="button"
              onClick={() =>
                setVisibleMonth(
                  new Date(
                    visibleMonth.getFullYear(),
                    visibleMonth.getMonth() + 1,
                    1,
                  ),
                )
              }
              className="flex h-7 w-7 items-center justify-center rounded-[6px] text-[12px] leading-none text-[#F4E6DA]"
              aria-label="Next month"
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 gap-[6px]">
            {weekdayNames.map((day) => (
              <div
                key={day}
                className="flex items-center justify-center rounded-[4px] p-1 text-[10px] text-[#F2AEA13D]"
                style={{ background: "#F2AEA114", fontWeight: 400 }}
              >
                {day}
              </div>
            ))}

            {calendarDays.map((day, index) => {
              const isSelected =
                (draftFrom && isSameDate(day.date, draftFrom)) ||
                (draftTo && isSameDate(day.date, draftTo));

              const isInRange =
                draftFrom &&
                draftTo &&
                day.date >= stripTime(draftFrom) &&
                day.date <= stripTime(draftTo);

              return (
                <button
                  key={`${day.date.toISOString()}-${index}`}
                  type="button"
                  onClick={() => handlePickDate(day.date)}
                  className="flex items-center justify-center rounded-[4px] p-1 text-[10px] transition"
                  style={{
                    fontWeight: 400,
                    background: day.isCurrentMonth
                      ? isSelected
                        ? "#DE5B79"
                        : isInRange
                          ? "rgba(216,90,119,0.28)"
                          : "rgba(255,255,255,0.08)"
                      : "rgba(255,255,255,0.03)",
                    color: day.isCurrentMonth
                      ? isSelected
                        ? "#FFFFFF"
                        : "#F5E6D8"
                      : "#745B5A",
                    border: isSameDate(day.date, draftTo)
                      ? "1px solid #DA596F"
                      : "1px solid transparent",
                  }}
                >
                  {day.date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="absolute right-0 top-10 z-[120]">
      <div className="relative w-[220px]">
        <div
          className="rounded-[8px] border"
          style={{
            background: "#2C1C1B",
            border: "1px solid rgba(242,174,161,0.12)",
            boxShadow:
              "0 0 8px rgba(242,174,161,0.20), 0 8px 24px rgba(0,0,0,0.18)",
            padding: "12px",
          }}
        >
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center justify-between">
              <h3
                className="text-[clamp(13px,0.95vw,14px)] text-[#F2AEA1CC]"
                style={{ fontWeight: 400 }}
              >
                Filter
              </h3>

              <button
                type="button"
                onClick={onClose}
                className="flex h-6 w-6 items-center justify-center text-[24px] leading-none text-[#F2AEA166]"
                aria-label="Close filter"
              >
                ×
              </button>
            </div>

            <DateInputRow
  ref={activeInput === "from" ? inputRowRef : null}
  label="From"
  value={displayValue(draftFrom)}
  isActive={activeInput === "from"}
  onClick={() => openCalendarFor("from")}
>
  {activeInput === "from" ? calendarNode : null}
</DateInputRow>

<DateInputRow
  ref={activeInput === "to" ? inputRowRef : null}
  label="To"
  value={displayValue(draftTo)}
  isActive={activeInput === "to"}
  onClick={() => openCalendarFor("to")}
>
  {activeInput === "to" ? calendarNode : null}
</DateInputRow>

            <div className="mt-3 flex items-center gap-[9px]">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 rounded-[4px] px-2 py-1 text-[10px]"
                style={{
                  background: "#F2AEA114",
                  color: "#F2F3D999",
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleApply}
                className="flex-1 rounded-[4px] px-2 py-1 text-[10px]"
                style={{
                  background: "#DA596F",
                }}
              >
                Choose Date
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DateInputRow = React.forwardRef<
  HTMLDivElement,
  {
    label: string;
    value: string;
    isActive: boolean;
    onClick: () => void;
    children?: React.ReactNode;
  }
>(({ label, value, isActive, onClick, children }, ref) => {
  return (
    <div ref={ref} className="relative">
      <div className="grid grid-cols-[54px_1fr] items-center">
        <span
          className="text-[clamp(11px,0.85vw,12px)] text-[#F2AEA199]"
          style={{ fontWeight: 200 }}
        >
          {label}
        </span>

        <button
          type="button"
          onClick={onClick}
          className="flex w-[140px] shrink-0 items-center justify-between overflow-hidden rounded-[5.25px] px-[10.49px] py-2.5 text-left"
          style={{
            background: isActive ? "rgba(242,174,161,0.08)" : "transparent",
            border: "1.31px solid rgba(242,174,161,0.12)",
            boxShadow: isActive ? "0 0 0 1px rgba(242,174,161,0.08)" : "none",
          }}
        >
          <span className="block max-w-[104px] truncate text-[10px] text-[#F2F3D9]">
            {value}
          </span>

          <span
            className={`flex shrink-0 items-center justify-center text-[10px] leading-none text-[#F2F3D9] transition-transform duration-300 ${
              isActive ? "rotate-0" : "rotate-180"
            }`}
          >
            ⌃
          </span>
        </button>
      </div>

      {children}
    </div>
  );
});

DateInputRow.displayName = "DateInputRow";

function buildCalendarDays(visibleMonth: Date) {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const firstWeekday = (firstDay.getDay() + 6) % 7;
  const totalDays = lastDay.getDate();

  const days: { date: Date; isCurrentMonth: boolean }[] = [];

  for (let i = firstWeekday; i > 0; i--) {
    const date = new Date(year, month, 1 - i);
    days.push({ date, isCurrentMonth: false });
  }

  for (let i = 1; i <= totalDays; i++) {
    days.push({ date: new Date(year, month, i), isCurrentMonth: true });
  }

  while (days.length % 7 !== 0) {
    const extraDay = days.length - (firstWeekday + totalDays) + 1;
    const date = new Date(year, month + 1, extraDay);
    days.push({ date, isCurrentMonth: false });
  }

  return days;
}

function getOrdinal(n: number) {
  if (n > 3 && n < 21) return "th";
  switch (n % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

function isSameDate(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function stripTime(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export default JournalDateFilterPopover;
