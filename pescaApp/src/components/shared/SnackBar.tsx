import { useState } from "react";

export const SnackBar = ({ message }: { message: string }) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    open && (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
        <div className="flex justify-between items-center">
          <span>{message}</span>
          <button onClick={handleClose} className="ml-4 text-white">
            &times;
          </button>
        </div>
      </div>
    )
  );
};
