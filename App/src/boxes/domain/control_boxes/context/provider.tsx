import { useCallback } from "react";
import { ControlBoxesContext } from "./context";
import { ContextProviderProps } from "../../../../shared/types/contextProviderProps";
import { ControlBoxesService } from "../services";
import { ControlBoxesDto, ControlBoxesResDto } from "../dto";
import { useSelectableCollection } from "../../shared/useSelectableCollection";

const service = new ControlBoxesService();

export const ControlBoxesProvider = ({ children }: ContextProviderProps) => {
  const fetchControlBoxes = useCallback(() => service.getAll(), []);

  const {
    items: controlBoxes,
    selected: controlBoxesSelected,
    setSelected: setControlBoxesSelected,
    clearIfSelected,
    refreshItems: getControlBoxes,
    setItems: setControlBoxes,
  } = useSelectableCollection<ControlBoxesResDto>({
    fetchItems: fetchControlBoxes,
  });

  const update = async (id: number, controlBoxes: ControlBoxesDto) => {
    await service.update(id, controlBoxes);
    await getControlBoxes();
  };

  const create = async (data: ControlBoxesDto) => {
    const createdControlBox = await service.create(data);
    setControlBoxes((prevControlBoxes) => [
      ...prevControlBoxes,
      createdControlBox,
    ]);
    setControlBoxesSelected(createdControlBox);
  };

  const remove = async (id: number) => {
    await service.delete(id);
    setControlBoxes((prevControlBoxes) =>
      prevControlBoxes.filter((controlBox) => controlBox.id !== id)
    );
    clearIfSelected(id);
  };

  return (
    <ControlBoxesContext.Provider
      value={{
        controlBoxes,
        controlBoxesSelected,
        setControlBoxesSelected,
        update,
        create,
        remove,
        getControlBoxes,
      }}
    >
      {children}
    </ControlBoxesContext.Provider>
  );
};
