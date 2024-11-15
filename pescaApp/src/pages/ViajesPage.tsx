import { ViajeSummaryList, Modal, ViajeForm } from "@/components";

import { useState } from "react";

export const ViajesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center mt-2">
      <button
        onClick={handleOpenModal}
        className="mb-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Añadir Viaje
      </button>
      <ViajeSummaryList />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ViajeForm isOpen={isModalOpen} onClose={handleCloseModal} />
      </Modal>
    </div>
  );
};
