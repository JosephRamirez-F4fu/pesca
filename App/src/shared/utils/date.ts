import { format, parseISO } from "date-fns";

const normalizeIsoDate = (isoDate: string) =>
  parseISO(isoDate.endsWith("Z") ? isoDate.slice(0, -1) : isoDate);

export const formatIsoDate = (
  isoDate: string | null | undefined,
  pattern = "dd/MM/yyyy",
  fallback = ""
) => {
  if (!isoDate) {
    return fallback;
  }

  return format(normalizeIsoDate(isoDate), pattern);
};

export const formatIsoDateForInput = (isoDate: string | null | undefined) =>
  formatIsoDate(isoDate, "yyyy-MM-dd");

export const toIsoDateString = (date: string | null | undefined) => {
  if (!date || Number.isNaN(Date.parse(date))) {
    return null;
  }

  return new Date(date).toISOString();
};

export const getElapsedDays = (
  startDate: string | Date,
  rounding: "floor" | "ceil" = "floor"
) => {
  const fromTime =
    startDate instanceof Date ? startDate.getTime() : new Date(startDate).getTime();

  if (Number.isNaN(fromTime)) {
    return 0;
  }

  const days = (Date.now() - fromTime) / (1000 * 60 * 60 * 24);
  return rounding === "ceil" ? Math.ceil(days) : Math.floor(days);
};
