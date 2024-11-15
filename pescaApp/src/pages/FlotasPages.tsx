import { FlotaForm, Modal, FlotaFormEdit } from "@/components";
import { FlotaList } from "@/components/Flota/FlotaList";
import { Flota } from "@/models";
import { useFlota } from "@/context";

import { useState } from "react";
export const FlotasPage = () => {
  const { flotas } = useFlota();
  const [flota, setFlota] = useState<Flota | null>(null);
  const [closeNewFlota, setCloseNewFlota] = useState(false);
  const [closeEditFlota, setCloseEditFlota] = useState(false);
  const HandleCreateFlota = () => {
    setCloseNewFlota(!closeNewFlota);
  };
  const HandleSelectFlota = (flotaSelected: Flota) => {
    setFlota(flotaSelected);
    setCloseEditFlota(!closeEditFlota);
  };
  const HandleCloseEdit = () => {
    setFlota(null);
    setCloseEditFlota(!closeEditFlota);
  };

  return (
    <>
      <button onClick={HandleCreateFlota}>Crear Flota</button>
      <Modal
        isOpen={closeNewFlota}
        onClose={HandleCreateFlota}
        children={
          <FlotaForm isOpen={closeNewFlota} onClose={HandleCreateFlota} />
        }
      />
      <FlotaList flotas={flotas} onClick={HandleSelectFlota} />
      {flota && (
        <Modal
          isOpen={closeEditFlota}
          onClose={HandleCloseEdit}
          children={
            <FlotaFormEdit
              isOpen={closeEditFlota}
              onClose={HandleCloseEdit}
              flota={flota}
            />
          }
        />
      )}
    </>
  );
};
