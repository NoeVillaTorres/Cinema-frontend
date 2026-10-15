import { Clapperboard, LogIn } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { label: "Inicio", to: "/" },
  { label: "Películas", to: "/?type=movie" },
  { label: "Series", to: "/?type=series" },
];

export const Header = () => {

  const navigate = useNavigate();

  const { user, isAdmin, signOut } = useAuth();

  function handleLogout() {
    signOut();
    navigate("/", { replace: true });
  }


  return (
    <header className="border-b border-white/10 bg-background">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-6">
        <Link to="/" className="flex items-center gap-2">
          <Clapperboard className="text-accent" size={26} />

          <span className="text-xl font-bold tracking-wide">
            CINEMA
          </span>
        </Link>

        <div className="flex items-center gap-5">
          {navigation.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              className="hidden text-sm text-gray-400 transition hover:text-white sm:block"
            >
              {label}
            </NavLink>
          ))}
        </div>

      


        {!user ? (
          <Link
            to="/login"
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90"
          >
            <LogIn size={17} />
            <span>Ingresar</span>
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            {isAdmin && (
              <Link
                to="/admin"
                className="text-sm text-accent hover:opacity-80"
              >
                Administración
              </Link>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="text-sm text-gray-300 transition hover:text-white"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}