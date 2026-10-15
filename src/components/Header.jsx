import { useState } from "react";
import { Clapperboard, LogIn, Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const navigation = [
  { label: "Inicio", to: "/" },
  { label: "Películas", to: "/?type=movie#catalogo" },
  { label: "Series", to: "/?type=series#catalogo" },
];

export const Header = () => {
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    signOut();
    setMenuOpen(false);
    navigate("/", { replace: true });
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="border-b border-white/10 bg-background">
      <nav className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-6">
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <Clapperboard className="text-accent" size={26} />

          <span className="text-xl font-bold tracking-wide">
            CINEMA
          </span>
        </Link>

        {/* Navegación de escritorio */}
        <div className="hidden items-center gap-6 md:flex">
          {navigation.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              className="text-sm text-gray-400 transition hover:text-white"
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Acciones de escritorio */}
        <div className="hidden items-center gap-4 md:flex">
          {!user ? (
            <Link
              to="/login"
              className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background transition hover:opacity-90"
            >
              <LogIn size={17} />
              Ingresar
            </Link>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Botón de menú móvil */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="rounded-lg border border-white/10 p-2 text-white md:hidden"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Menú móvil */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 px-6 py-4 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {navigation.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                onClick={closeMenu}
                className="text-sm text-gray-300 hover:text-accent"
              >
                {label}
              </NavLink>
            ))}

            <div className="border-t border-white/10 pt-4">
              {!user ? (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-background"
                >
                  <LogIn size={17} />
                  Ingresar
                </Link>
              ) : (
                <div className="flex flex-col items-start gap-4">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={closeMenu}
                      className="text-sm text-accent"
                    >
                      Administración
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-sm text-gray-300"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};