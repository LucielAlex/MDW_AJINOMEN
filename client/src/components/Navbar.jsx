import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext.jsx";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user)

  return (
    <nav className="bg-yellow-400 my-3 ml-8 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/tasks" : "/"}>AJI-NO-MEN</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              Bienvenido {user.username}
            </li>
            
            <li>
              <Link className="text-red-700" to="/" onClick={() => logout()}>
                Cerrar Sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            
          </>
        )}
      </ul>
    </nav>
  );
}
