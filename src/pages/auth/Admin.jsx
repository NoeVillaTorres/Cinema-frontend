import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { getGenres, getMovies } from "../../services/movies";
import {
  createTitle,
  updateTitle,
  deleteTitle,
} from "../../services/adminTitles"
import { TitleForm } from "../../components/TitleForm";


export const Admin = () => {
  const { user, token } = useAuth();
  const queryClient = useQueryClient();

  const [editingTitle, setEditingTitle] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [error, setError] = useState("");

  const {
    data: titles = [],
    isPending: titlesLoading,
    isError: titlesError,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: () => getMovies(),
  });

  const {
    data: genres = [],
    isPending: genresLoading,
    isError: genresError,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  const refreshCatalog = () => {
    queryClient.invalidateQueries({ queryKey: ["movies"] });
    queryClient.invalidateQueries({ queryKey: ["featured"] });

    setFormOpen(false);
    setEditingTitle(null);
    setError("");
  }

  const createMutation = useMutation({
    mutationFn: (data) => createTitle(data, token),
    onSuccess: refreshCatalog,
    onError: (error) => setError(error.message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateTitle(id, data, token),
    onSuccess: refreshCatalog,
    onError: (error) => setError(error.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTitle(id, token),
    onSuccess: refreshCatalog,
    onError: (error) => setError(error.message),
  });

  const isSaving =
    createMutation.isPending || updateMutation.isPending;

  const openCreateForm = () => {
    setEditingTitle(null);
    setError("");
    setFormOpen(true);
  }

  const openEditForm = (title) => {
    setEditingTitle(title);
    setError("");
    setFormOpen(true);
  }

  const closeForm = () => {
    setFormOpen(false);
    setEditingTitle(null);
    setError("");
  }

  const handleSave = (data) => {
    setError("");

    if (editingTitle) {
      updateMutation.mutate({
        id: editingTitle.id,
        data,
      });
    } else {
      createMutation.mutate(data);
    }
  }

  const handleDelete = (title) => {
    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar "${title.name}"?`
    );

    if (!confirmed) return;

    setError("");
    deleteMutation.mutate(title.id);
  }

  const loading = titlesLoading || genresLoading;
  const hasError = titlesError || genresError;

  return (
    <section className="mx-auto min-h-[70vh] max-w-7xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-sm font-medium text-accent">
            ADMINISTRACIÓN
          </span>

          <h1 className="mt-2 text-3xl font-bold">
            Gestión del catálogo
          </h1>

          <p className="mt-2 text-sm text-muted">
            Administrador: {user.email}
          </p>
        </div>

        {!formOpen && (
          <button
            type="button"
            onClick={openCreateForm}
            disabled={loading || hasError}
            className="flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-background disabled:opacity-50"
          >
            <Plus size={18} />
            Agregar título
          </button>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
        >
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-muted">Cargando información...</p>
      ) : hasError ? (
        <p className="text-red-400">
          No se pudo cargar la información del catálogo.
        </p>
      ) : (
        <>
          {formOpen && (
            <div className="mb-8 rounded-xl border border-white/10 bg-surface p-6">
              <TitleForm
                key={editingTitle?.id ?? "new"}
                title={editingTitle}
                genres={genres}
                onSubmit={handleSave}
                onCancel={closeForm}
                isPending={isSaving}
              />
            </div>
          )}

          <div className="overflow-hidden rounded-xl border border-white/10 bg-surface">
            <div className="border-b border-white/10 p-5">
              <h2 className="text-lg font-semibold">
                Títulos registrados
              </h2>

              <p className="mt-1 text-sm text-muted">
                {titles.length} títulos en el catálogo
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="bg-white/5 text-gray-400">
                  <tr>
                    <th className="px-5 py-4 font-medium">
                      Título
                    </th>
                    <th className="px-5 py-4 font-medium">
                      Tipo
                    </th>
                    <th className="px-5 py-4 font-medium">
                      Año
                    </th>
                    <th className="px-5 py-4 font-medium">
                      Géneros
                    </th>
                    <th className="px-5 py-4 text-right font-medium">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {titles.map((title) => (
                    <tr key={title.id} className="hover:bg-white/5">
                      <td className="px-5 py-4 font-medium">
                        {title.name}
                      </td>

                      <td className="px-5 py-4 text-gray-300">
                        {title.type === "movie" ? "Película" : "Serie"}
                      </td>

                      <td className="px-5 py-4 text-gray-300">
                        {title.release_year}
                      </td>

                      <td className="px-5 py-4 text-gray-400">
                        {title.genres.join(", ")}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => openEditForm(title)}
                            disabled={deleteMutation.isPending || isSaving}
                            aria-label={`Editar ${title.name}`}
                            title="Editar"
                            className="text-accent hover:opacity-70 disabled:opacity-40"
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(title)}
                            disabled={deleteMutation.isPending || isSaving}
                            aria-label={`Eliminar ${title.name}`}
                            title="Eliminar"
                            className="text-red-400 hover:text-red-300 disabled:opacity-40"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {titles.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-10 text-center text-muted"
                      >
                        No hay títulos registrados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </section>
  );
}