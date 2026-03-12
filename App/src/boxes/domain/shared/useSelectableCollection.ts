import { useCallback, useEffect, useState } from "react";
import { useSelectedEntity } from "./useSelectedEntity";

interface UseSelectableCollectionOptions<T extends { id: number }> {
  enabled?: boolean;
  fetchItems: () => Promise<T[]>;
}

export const useSelectableCollection = <T extends { id: number }>({
  enabled = true,
  fetchItems,
}: UseSelectableCollectionOptions<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const {
    selected,
    setSelected,
    syncSelected,
    clearIfSelected,
  } = useSelectedEntity<T>();

  const refreshItems = useCallback(async () => {
    if (!enabled) {
      setItems([]);
      setSelected(null);
      return;
    }

    const nextItems = await fetchItems();
    setItems(nextItems);
    syncSelected(nextItems);
  }, [enabled, fetchItems, setSelected, syncSelected]);

  useEffect(() => {
    void refreshItems();
  }, [refreshItems]);

  return {
    items,
    setItems,
    selected,
    setSelected,
    clearIfSelected,
    refreshItems,
  };
};
