"use client";

import React, { useEffect, useMemo, useState } from "react";

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
    if (activeInput === "from") {
      setDraftFrom(date);
      if (date > draftTo) {
        setDraftTo(date);
      }
    }

    if (activeInput === "to") {
      setDraftTo(date);
      if (date < draftFrom) {
        setDraftFrom(date);
      }
    }
  };

  const handleApply = () => {
    setDateRange({
      from: draftFrom,
      to: draftTo,
    });
    setActiveInput(null);
    onClose();
  };

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
            <div className="flex items-center justify-between ">
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
              label="From"
              value={displayValue(draftFrom)}
              isActive={activeInput === "from"}
              onClick={() => openCalendarFor("from")}
            />

            <DateInputRow
              label="To"
              value={displayValue(draftTo)}
              isActive={activeInput === "to"}
              onClick={() => openCalendarFor("to")}
            />
          </div>
        </div>
        <div className="relative">

        {activeInput && (
          <div className="absolute -top-2 left-2">
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
                    {monthNames[visibleMonth.getMonth()]}{" "}
                    {visibleMonth.getFullYear()}
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
                      className="flex  items-center justify-center p-1 rounded-[4px] text-[10px] text-[#F2AEA13D]"
                      style={{ background: "#F2AEA114",fontWeight:400 }}
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
                        className="flex p-1 items-center justify-center rounded-[4px] text-[10px] transition"
                        style={{
                          fontWeight:400 ,
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

                <div className="flex items-center gap-[9px]">
                  <button
                    type="button"
                    onClick={() => setActiveInput(null)}
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
                      background:
                        "#DA596F",
                    }}
                  >
                    Choose Date
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>

      </div>
    </div>
  );
};

const DateInputRow = ({
  label,
  value,
  isActive,
  onClick,
}: {
  label: string;
  value: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
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
        className="flex py-2.5 w-[140px] shrink-0 items-center justify-between overflow-hidden rounded-[5.25px] px-[10.49px] text-left"
        style={{
          background: isActive ? "rgba(242,174,161,0.08)" : "transparent",
          border: "1.31px solid rgba(242,174,161,0.12)",
          boxShadow: isActive ? "0 0 0 1px rgba(242,174,161,0.08)" : "none",
        }}
      >
        <span className="block max-w-[104px] truncate text-[10px] text-[#F2F3D9]">
          {value}
        </span>

        <span className=" flex  shrink-0 items-center justify-center text-[10px] leading-none text-[#F2F3D9]">
          {isActive ? "⌃" : "⌄"}
        </span>
      </button>
    </div>
  );
};

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
