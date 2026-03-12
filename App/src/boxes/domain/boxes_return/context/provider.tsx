import { useCallback } from "react";
import { BoxesReturnContext } from "./context";
import { ContextProviderProps } from "../../../../shared/types/contextProviderProps";
import { BoxesReturnService } from "../services";
import { BoxesReturnDto, BoxesReturnResDto } from "../dto";
import { useBoxes } from "../../boxes/context";
import { useSelectableCollection } from "../../shared/useSelectableCollection";

const boxesReturnService = new BoxesReturnService();

export const BoxesReturnProvider = ({ children }: ContextProviderProps) => {
  const { boxesSelected } = useBoxes();
  const boxesSelectedId = boxesSelected?.id ?? null;

  const fetchBoxesReturn = useCallback(async () => {
    if (!boxesSelectedId) return [];
    return boxesReturnService.getBoxesByBoxes(boxesSelectedId);
  }, [boxesSelectedId]);

  const {
    items: boxesReturn,
    selected: boxesReturnSelected,
    setSelected: setBoxesReturnSelected,
    clearIfSelected,
    refreshItems: refreshBoxesReturn,
  } = useSelectableCollection<BoxesReturnResDto>({
    enabled: Boolean(boxesSelectedId),
    fetchItems: fetchBoxesReturn,
  });

  const create = async (data: BoxesReturnDto) => {
    await boxesReturnService.create(data);
    await refreshBoxesReturn();
  };

  const remove = async (id: number) => {
    await boxesReturnService.delete(id);
    clearIfSelected(id);
    await refreshBoxesReturn();
  };
  const update = async (id: number, data: BoxesReturnDto) => {
    await boxesReturnService.update(id, data);
    await refreshBoxesReturn();
  };

  return (
    <BoxesReturnContext.Provider
      value={{
        boxesReturn,
        refreshBoxesReturn,
        boxesReturnSelected,
        setBoxesReturnSelected,
        create,
        remove,
        update,
      }}
    >
      {children}
    </BoxesReturnContext.Provider>
  );
};
