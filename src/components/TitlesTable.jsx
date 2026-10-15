import { Pencil, Trash2 } from "lucide-react";

export const TitlesTable = ({
  titles,
  onEdit,
  onDelete,
  disabled = false,
}) => {
  return (
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
              <th className="px-5 py-4 font-medium">Título</th>
              <th className="px-5 py-4 font-medium">Tipo</th>
              <th className="px-5 py-4 font-medium">Año</th>
              <th className="px-5 py-4 font-medium">Géneros</th>
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
                      onClick={() => onEdit(title)}
                      disabled={disabled}
                      aria-label={`Editar ${title.name}`}
                      title="Editar"
                      className="text-accent hover:opacity-70 disabled:opacity-40"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(title)}
                      disabled={disabled}
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
  );
}