import { useCallback } from "react";
import { BoxesPlaceContext } from "./context";
import { ContextProviderProps } from "../../../../shared/types/contextProviderProps";
import { BoxesPlaceService } from "../services";
import { BoxesPlaceDto, BoxesPlaceResDto } from "../dto";
import { useControlBoxes } from "./../../control_boxes/context/useContext";
import { useSelectableCollection } from "../../shared/useSelectableCollection";

const service = new BoxesPlaceService();

export const BoxesPlaceProvider = ({ children }: ContextProviderProps) => {
  const { controlBoxesSelected } = useControlBoxes();
  const controlBoxesSelectedId = controlBoxesSelected?.id ?? null;

  const fetchBoxesPlace = useCallback(async () => {
    if (!controlBoxesSelectedId) return [];
    return service.getByIdControlBoxes(controlBoxesSelectedId);
  }, [controlBoxesSelectedId]);

  const {
    items: boxesPlace,
    selected: boxesPlaceSelected,
    setSelected: setBoxesPlaceSelected,
    clearIfSelected,
    refreshItems: getControlBoxes,
  } = useSelectableCollection<BoxesPlaceResDto>({
    enabled: Boolean(controlBoxesSelectedId),
    fetchItems: fetchBoxesPlace,
  });

  const update = async (id: number, controlBoxes: BoxesPlaceDto) => {
    await service.update(id, controlBoxes);
    await getControlBoxes();
  };

  const create = async (data: BoxesPlaceDto) => {
    if (!controlBoxesSelectedId) return;
    await service.create(data);
    await getControlBoxes();
  };

  const remove = async (id: number) => {
    await service.delete(id);
    clearIfSelected(id);
    await getControlBoxes();
  };

  return (
    <BoxesPlaceContext.Provider
      value={{
        boxesPlace,
        boxesPlaceSelected,
        setBoxesPlaceSelected,
        getControlBoxes,
        update,
        create,
        remove,
      }}
    >
      {children}
    </BoxesPlaceContext.Provider>
  );
};
