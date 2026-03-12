import { useEffect, useState } from "react";
import {
  addRecentOption,
  getRecentOptions,
} from "../../../../../shared/utils/recentOptions";

export const useRecentOptions = (storageKey: string) => {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    setOptions(getRecentOptions(storageKey));
  }, [storageKey]);

  const saveOption = (value: string) => {
    addRecentOption(storageKey, value);
    setOptions(getRecentOptions(storageKey));
  };

  return { options, saveOption, setOptions };
};
