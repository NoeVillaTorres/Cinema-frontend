import { Link } from "react-router-dom";
import { useState } from "react";
export const MovieCard = ({ movie }) => {

  const [imageError, setImageError] = useState(false);

  return (
    <article className="overflow-hidden rounded-xl bg-surface transition hover:-translate-y-1">
      <Link
        to={`/titles/${movie.id}`}
        className="block h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <div className="aspect-[2/3] bg-surface-light">
          {movie.poster_url && !imageError ? (
            <img
              src={movie.poster_url}
              alt={movie.name}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted">
              Sin imagen
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold">{movie.name}</h3>

          <p className="mt-1 text-sm text-muted">
            {movie.release_year} ·{" "}
            {movie.type === "movie" ? "Película" : "Serie"}
          </p>

          <p className="mt-2 text-xs text-accent">
            {movie.genres?.join(", ")}
          </p>
        </div>
      </Link>
    </article>
  );
};