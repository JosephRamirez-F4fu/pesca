import { BoxesContext } from "./context";
import { ContextProviderProps } from "../../../../shared/types/contextProviderProps";
import { BoxesService } from "../services";
import { BoxesDto, BoxesResDto } from "../dto";
import { useBoxesPlace } from "../../boxes-place/context";
import { useSelectedEntity } from "../../shared/useSelectedEntity";

const service = new BoxesService();

export const BoxesProvider = ({ children }: ContextProviderProps) => {
  const {
    selected: boxesSelected,
    setSelected: setBoxesSelected,
    clearIfSelected,
  } = useSelectedEntity<BoxesResDto>();
  const { getControlBoxes } = useBoxesPlace();

  const update = async (id: number, boxes: BoxesDto) => {
    await service.update(id, boxes);
    await getControlBoxes();
  };

  const create = async (box: BoxesDto) => {
    await service.create(box);
    await getControlBoxes();
  };

  const remove = async (id: number) => {
    await service.delete(id);
    clearIfSelected(id);
    await getControlBoxes();
  };

  return (
    <BoxesContext.Provider
      value={{
        boxesSelected,
        setBoxesSelected,
        update,
        create,
        remove,
      }}
    >
      {children}
    </BoxesContext.Provider>
  );
};
