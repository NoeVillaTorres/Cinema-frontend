import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockKeyhole, LogIn } from "lucide-react";

import { useAuth } from "../../context/AuthContext";


export const Login = () => {

  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await signIn(email, password);

      navigate(user.role === "admin" ? "/admin" : "/", {
        replace: true,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-[75vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-surface p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <LockKeyhole
            size={36}
            className="mx-auto mb-4 text-accent"
          />

          <h1 className="text-3xl font-bold text-white">
            Iniciar sesión
          </h1>

          <p className="mt-2 text-sm text-muted">
            Accede a tu cuenta de Cinema Catalog
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm text-gray-300"
            >
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="username"
              placeholder="correo@ejemplo.com"
              className="w-full rounded-lg border border-white/10 bg-background px-4 py-3 text-white outline-none focus:border-accent"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm text-gray-300"
            >
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              placeholder="Tu contraseña"
              className="w-full rounded-lg border border-white/10 bg-background px-4 py-3 text-white outline-none focus:border-accent"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 font-semibold text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogIn size={18} />

            {loading ? "Iniciando sesión..." : "Ingresar"}
          </button>
        </form>

        <Link
          to="/"
          className="mt-6 block text-center text-sm text-muted hover:text-accent"
        >
          Volver al catálogo
        </Link>
      </div>
    </section>
  );
}