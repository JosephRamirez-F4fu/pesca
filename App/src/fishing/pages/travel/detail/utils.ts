import {
  formatIsoDate,
  formatIsoDateForInput,
  toIsoDateString,
} from "../../../../shared/utils/date";
export { toCurrency } from "../../../../shared/utils/currency";

export const formatToInputDate = (isoDate: string | null): string => {
  return formatIsoDateForInput(isoDate);
};

export const formatToDisplayDate = (isoDate: string | null): string => {
  return formatIsoDate(isoDate, "dd/MM/yyyy", "-");
};

export const formatToISODate = (date: string | null): string | null => {
  return toIsoDateString(date);
};

export const formatCreatedAtToISODate = (date: string): string =>
  toIsoDateString(date) ?? "";
