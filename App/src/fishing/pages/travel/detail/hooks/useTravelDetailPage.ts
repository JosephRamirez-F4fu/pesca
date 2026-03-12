import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTravel } from "../../../../context/travel/useContext";

export const useTravelDetailPage = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { id } = useParams();
  const { travelSelected, getById, SetTravelSelected } = useTravel();

  useEffect(() => {
    if (id) {
      void getById(Number(id));
    }

    return () => {
      SetTravelSelected(null);
    };
  }, [id, getById, SetTravelSelected]);

  return {
    travelId: id ? Number(id) : null,
    travelSelected,
    isDeleteModalOpen,
    openDeleteModal: () => setIsDeleteModalOpen(true),
    closeDeleteModal: () => setIsDeleteModalOpen(false),
  };
};
