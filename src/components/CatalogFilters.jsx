import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Search, RotateCcw } from "lucide-react";

import { getGenres } from "../services/movies";
import { toast } from "sonner";

export const CatalogFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(urlSearch);

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);



  const type = searchParams.get("type") || "";
  const genre = searchParams.get("genre") || "";

  const {
    data: genres = [],
    isPending: genresLoading,
    isError: genresError,
    refetch: refetchGenres,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
    refetchInterval: (query) =>
      query.state.status === "error" ? 5000 : false,
  });

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    setSearchParams(params);
  }

  const handleSearch = (event) => {
    event.preventDefault();
    updateFilter("search", search.trim());
  }

  function clearFilters() {
    setSearch("");
    setSearchParams({});
  }

  return (
    <div className="rounded-xl border border-white/10 bg-surface p-5">
      <form
        onSubmit={handleSearch}
        className="grid gap-4 md:grid-cols-[2fr_1fr_1fr_auto]"
      >
        {/* Búsqueda */}
        <div className="flex overflow-hidden rounded-lg border border-white/10 bg-background focus-within:border-accent focus-within:ring-1 focus-within:ring-accent">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar películas o series..."
            aria-label="Buscar títulos"
            className="min-w-0 flex-1 px-4 py-3 text-sm text-white outline-none"
          />

          <button
            type="submit"
            aria-label="Buscar"
            className="px-4 text-accent hover:bg-white/5"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Tipo */}
        <select
          aria-label="Filtrar por tipo"
          value={type}
          onChange={(event) =>
            updateFilter("type", event.target.value)
          }
          className="rounded-lg border border-white/10 bg-background px-4 py-3 text-sm text-white"
        >
          <option value="">Todos los tipos</option>
          <option value="movie">Películas</option>
          <option value="series">Series</option>
        </select>

        {/* Género */}
        <select
          aria-label="Filtrar por género"
          value={genre}
          onChange={(event) => updateFilter("genre", event.target.value)}
          disabled={genresLoading || genresError}
          className="w-full rounded-lg border border-white/10 bg-background px-4 py-3 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">
            {genresLoading
              ? "Cargando géneros..."
              : genresError
                ? "Géneros no disponibles"
                : "Todos los géneros"}
          </option>

          {genres.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        {genresError && (
          <div className="text-sm text-red-400 md:col-span-full">
            No se pudieron cargar los géneros.{" "}
            <button
              type="button"
              onClick={async () => {
                const result = await refetchGenres();

                if (result.isSuccess) {
                  toast.success("Géneros cargados correctamente");
                } else {
                  toast.error("No se pudieron cargar los géneros");
                }
              }}
              className="font-medium text-accent hover:underline"
            >
              Reintentar
            </button>
          </div>
        )}


        {/* Limpiar filtros */}
        <button
          type="button"
          onClick={clearFilters}
          className="flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm text-gray-300 transition hover:bg-white/5"
        >
          <RotateCcw size={16} />
          Limpiar
        </button>
      </form>
    </div>
  );
}