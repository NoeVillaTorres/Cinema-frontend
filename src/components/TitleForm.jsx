import { useState } from "react";
import {toast} from "sonner"

const getInitialValues = (title, genres) => {
  return {
    name: title?.name || "",
    synopsis: title?.synopsis || "",
    type: title?.type || "movie",
    release_year: title?.release_year || new Date().getFullYear(),
    poster_url: title?.poster_url || "",
    genre_ids: genres
      .filter((genre) => title?.genres.includes(genre.name))
      .map((genre) => genre.id),
  };
}

const inputClass =
  "w-full rounded-lg border border-white/10 bg-background px-4 py-3 text-sm text-white outline-none focus:border-accent";

export const TitleForm = ({
  title,
  genres,
  onSubmit,
  onCancel,
  isPending,
}) => {
  const [form, setForm] = useState(() =>
    getInitialValues(title, genres)
  );

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  const toggleGenre = (id) => {
    setForm((current) => ({
      ...current,
      genre_ids: current.genre_ids.includes(id)
        ? current.genre_ids.filter((genreId) => genreId !== id)
        : [...current.genre_ids, id],
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const synopsis = form.synopsis.trim();

    if (!name || !synopsis) {
      toast.error("El nombre y la sinopsis no pueden estar vacíos");
      return;
    }

    if (form.genre_ids.length === 0) {
      toast.error("Selecciona al menos un género");
      return;
    }

    onSubmit({
      ...form,
      name,
      synopsis,
      release_year: Number(form.release_year),
      poster_url: form.poster_url.trim() || null,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-xl font-semibold">
        {title ? "Editar título" : "Agregar título"}
      </h2>

      <div>
        <label htmlFor="name" className="mb-2 block text-sm">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={updateField}
          maxLength={100}
          required
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="synopsis" className="mb-2 block text-sm">
          Sinopsis
        </label>
        <textarea
          id="synopsis"
          name="synopsis"
          value={form.synopsis}
          onChange={updateField}
          rows={4}
          required
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="type" className="mb-2 block text-sm">
            Tipo
          </label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={updateField}
            className={inputClass}
          >
            <option value="movie">Película</option>
            <option value="series">Serie</option>
          </select>
        </div>

        <div>
          <label htmlFor="release_year" className="mb-2 block text-sm">
            Año de estreno
          </label>
          <input
            id="release_year"
            name="release_year"
            type="number"
            min={1888}
            max={2100}
            value={form.release_year}
            onChange={updateField}
            required
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="poster_url" className="mb-2 block text-sm">
          Ruta del póster
        </label>
        <input
          id="poster_url"
          name="poster_url"
          value={form.poster_url}
          onChange={updateField}
          maxLength={500}
          placeholder="/posters/ejemplo.jpg"
          className={inputClass}
        />
        <p className="mt-2 text-xs text-muted">
          Opcional. La imagen debe existir en public/posters.
        </p>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm">Géneros</legend>

        <div className="grid gap-3 sm:grid-cols-2">
          {genres.map((genre) => (
            <label
              key={genre.id}
              className="flex cursor-pointer items-center gap-3 text-sm text-gray-300"
            >
              <input
                type="checkbox"
                checked={form.genre_ids.includes(genre.id)}
                onChange={() => toggleGenre(genre.id)}
                className="accent-teal-400"
              />
              {genre.name}
            </label>
          ))}
        </div>

        {form.genre_ids.length === 0 && (
          <p className="mt-2 text-xs text-amber-400">
            Selecciona al menos un género.
          </p>
        )}
      </fieldset>

      <div className="flex gap-3 pt-3">
        <button
          type="submit"
          disabled={isPending || form.genre_ids.length === 0}
          className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-background disabled:opacity-50"
        >
          {isPending ? "Guardando..." : "Guardar"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="rounded-lg border border-white/10 px-5 py-3 text-sm text-gray-300 hover:bg-white/5"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}