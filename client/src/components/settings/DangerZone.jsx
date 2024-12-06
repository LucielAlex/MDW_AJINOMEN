import { motion } from "framer-motion";
import { useAuth } from "../../context/authContext";


const DangerZone = () => {

  const { isAuthenticated, logout, user } = useAuth();
  
  return (
    <motion.div
      className="bg-red-900 bg-opacity-100 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-red-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-100">Salida</h2>
      </div>
      <button
        onClick={() => logout()} // Maneja el clic en el botón
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
      >
        Click para cerrar sesión
      </button>
    </motion.div>
  );
};

export default DangerZone;
