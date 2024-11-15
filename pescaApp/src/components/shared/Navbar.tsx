import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="bg-gray-800 p-4 flex justify-around shadow-lg">
      <Link
        className="text-white no-underline text-lg  hover:text-yellow-s transition duration-300 ease-in-out transform hover:scale-110"
        to="/flota"
      >
        Flotas
      </Link>
      <Link
        className="text-white no-underline text-lg  hover:text-yellow-400 transition duration-300 ease-in-out transform hover:scale-110"
        to="/viaje"
      >
        Viajes
      </Link>
    </div>
  );
};
