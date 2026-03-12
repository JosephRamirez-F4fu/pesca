import { formatIsoDate } from "../../../shared/utils/date";
export { toCurrency } from "../../../shared/utils/currency";

export const formatTransportDate = (date: string, pattern = "dd/MM/yyyy") =>
  formatIsoDate(date, pattern);
