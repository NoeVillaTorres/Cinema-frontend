import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../services/movies";
import { MovieCard } from "../components/MovieCard";

import { Link, useSearchParams } from "react-router-dom";
import { Hero } from "../components/Hero";
import { CatalogFilters } from "../components/CatalogFilters";


const categories = [
    { title: "Películas", description: "Explora el mejor cine", to: "/?type=movie" },
    { title: "Series", description: "Descubre nuevas historias", to: "/?type=series" },
    { title: "Géneros", description: "Encuentra lo que te gusta", to: "#catalogo" },
  ];

export const Home = () => {
  const [searchParams] = useSearchParams();

  const filters = {
    search: searchParams.get("search") || "",
    type: searchParams.get("type") || "",
    genre: searchParams.get("genre") || "",
  };

  const {
    data: movies = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["movies", filters.search, filters.type, filters.genre],
    queryFn: () => getMovies(filters),
  });


  const {
    data: featuredMovies = [],
  } = useQuery({
    queryKey: ["featured", "Interstellar"],
    queryFn: () => getMovies({ search: "Interstellar" }),
  });
  
  const featuredMovie = featuredMovies.find(
    (movie) => movie.name === "Interstellar"
  );


  return (
    <>
      <Hero movie={featuredMovie} />

      {/* Accesos rápidos */}
      <div className="relative z-10 mx-auto -mt-10 grid max-w-7xl gap-4 px-6 md:grid-cols-3">
        {categories.map(({ title, description, to }) => (
          <Link
            key={title}
            to={to}
            className="rounded-xl border border-white/10 bg-surface-light p-6 shadow-xl transition hover:-translate-y-1 hover:border-accent/50"
          >
            <h2 className="text-xl font-semibold text-accent">
              {title}
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              {description}
            </p>
          </Link>
        ))}
      </div>

      {/* Catálogo */}
      <section
        id="catalogo"
        className="mx-auto max-w-7xl px-6 py-20"
      >
        <div className="mb-8">
          <span className="text-sm font-medium text-accent">
            DESCUBRE
          </span>

          <h2 className="mt-2 text-3xl font-bold">
            Explora nuestro catálogo
          </h2>
        </div>

        <CatalogFilters />

        {/* Resultados */}
        <div className="mt-8">
          {isPending ? (
            <p className="text-muted">Cargando catálogo...</p>
          ) : isError ? (
            <p className="text-red-400">
              Error: {error.message}
            </p>
          ) : movies.length === 0 ? (
            <p className="py-12 text-center text-muted">
              No encontramos títulos con esos filtros.
            </p>
          ) : (
            <>
              <p className="mb-5 text-sm text-muted">
                {movies.length} resultados encontrados
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}