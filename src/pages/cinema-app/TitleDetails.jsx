import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CalendarDays, Film, Tv } from "lucide-react";

import { getMovieById } from "../../services/movies";


export const TitleDetails = () => {
  const { id } = useParams();
  const [imageError, setImageError] = useState(false);

  const {
    data: movie,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id),
  });

  if (isPending) {
    return (
      <section className="mx-auto min-h-[70vh] max-w-7xl px-6 py-16">
        <p className="text-muted">Cargando información...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto min-h-[70vh] max-w-7xl px-6 py-16">
        <h1 className="text-2xl font-bold text-white">
          No pudimos cargar este título
        </h1>

        <p className="mt-3 text-muted">{error.message}</p>

        <Link
          to="/#catalogo"
          className="mt-6 inline-flex items-center gap-2 text-accent hover:underline"
        >
          <ArrowLeft size={18} />
          Volver al catálogo
        </Link>
      </section>
    );
  }

  const isMovie = movie.type === "movie";

  return (
    <section className="mx-auto min-h-[70vh] max-w-7xl px-6 py-12">
      {/* Navegación */}
      <Link
        to="/#catalogo"
        className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent"
      >
        <ArrowLeft size={18} />
        Volver al catálogo
      </Link>

      {/* Información principal */}
      <div className="grid gap-10 md:grid-cols-[300px_1fr] lg:gap-14">
        {/* Póster */}
        <div className="mx-auto w-full max-w-[300px]">
          <div className="aspect-[2/3] overflow-hidden rounded-xl border border-white/10 bg-surface">
            {movie.poster_url && !imageError ? (
              <img
                src={movie.poster_url}
                alt={`Póster de ${movie.name}`}
                className="h-full w-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted">
                <Film size={48} />
              </div>
            )}
          </div>
        </div>

        {/* Detalles */}
        <div>
          <span className="text-sm font-semibold tracking-widest text-accent">
            {isMovie ? "PELÍCULA" : "SERIE"}
          </span>

          <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            {movie.name}
          </h1>

          {/* Metadatos */}
          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-muted">
            <span className="flex items-center gap-2">
              <CalendarDays size={18} />
              {movie.release_year}
            </span>

            <span className="flex items-center gap-2">
              {isMovie ? <Film size={18} /> : <Tv size={18} />}

              {isMovie ? "Película" : "Serie"}
            </span>
          </div>

          {/* Géneros */}
          <div className="mt-6 flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Sinopsis */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-white">
              Sinopsis
            </h2>

            <p className="mt-4 max-w-2xl leading-8 text-gray-300">
              {movie.synopsis}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}