import { Dispatch, SetStateAction, useCallback, useState } from "react";

export const useSelectedEntity = <T extends { id: number }>() => {
  const [selected, setSelected] = useState<T | null>(null);

  const syncSelected = useCallback((items: T[]) => {
    setSelected((currentSelected) => {
      if (!currentSelected) return null;
      return items.find((item) => item.id === currentSelected.id) ?? null;
    });
  }, []);

  const clearIfSelected = useCallback((id: number) => {
    setSelected((currentSelected) =>
      currentSelected?.id === id ? null : currentSelected
    );
  }, []);

  return {
    selected,
    setSelected: setSelected as Dispatch<SetStateAction<T | null>>,
    syncSelected,
    clearIfSelected,
  };
};
