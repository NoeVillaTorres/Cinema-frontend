import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { getGenres, getMovies } from "../../services/movies";
import {
  createTitle,
  updateTitle,
  deleteTitle,
} from "../../services/adminTitles"
import { TitleForm } from "../../components/TitleForm";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TitlesTable } from "../../components/TitlesTable";


export const Admin = () => {
  const { user, token, signOut } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [editingTitle, setEditingTitle] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const formRef = useRef(null)

  useEffect(() => {
    if (formOpen) {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [formOpen, editingTitle]);


  const handleMutationError = (error) => {
    
    if (error.status === 401) {
      toast.error("Tu sesión ha expirado. Inicia sesión nuevamente.");

      signOut();
      navigate("/login", { replace: true });
      return;
    }
  
    toast.error(error.message);
  }

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
    queryClient.invalidateQueries({ queryKey: ["movie"] });
  
    setFormOpen(false);
    setEditingTitle(null);
  };

  const createMutation = useMutation({
    mutationFn: (data) => createTitle(data, token),
  
    onSuccess: () => {
      refreshCatalog();
      toast.success("Título creado correctamente");
    },
  
    onError: handleMutationError,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateTitle(id, data, token),
  
    onSuccess: () => {
      refreshCatalog();
      toast.success("Título actualizado correctamente");
    },
  
    onError: handleMutationError,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTitle(id, token),
  
    onSuccess: () => {
      refreshCatalog();
      toast.success("Título eliminado correctamente");
    },
  
    onError: handleMutationError,
  });

  const isSaving =
    createMutation.isPending || updateMutation.isPending;

  const openCreateForm = () => {
    setEditingTitle(null);
    setFormOpen(true);
  }

  const openEditForm = (title) => {
    setEditingTitle(title);
    setFormOpen(true);
  }

  const closeForm = () => {
    setFormOpen(false);
    setEditingTitle(null);
  }

  const handleSave = (data) => {

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
    toast(`¿Eliminar "${title.name}"?`, {
      description: "Esta acción no se puede deshacer.",
      duration: 10000,
  
      action: {
        label: "Eliminar",
        onClick: () => {
          deleteMutation.mutate(title.id);
        },
      },
  
      cancel: {
        label: "Cancelar",
        onClick: () => {},
      },
    });
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

      {loading ? (
        <p className="text-muted">Cargando información...</p>
      ) : hasError ? (
        <p className="text-red-400">
          No se pudo cargar la información del catálogo.
        </p>
      ) : (
        <>
          {formOpen && (
            <div 
              ref={formRef}
              className="mb-8 rounded-xl border border-white/10 bg-surface p-6"
            >

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

          <TitlesTable
            titles={titles}
            onEdit={openEditForm}
            onDelete={handleDelete}
            disabled={deleteMutation.isPending || isSaving}
          />
        </>
      )}
    </section>
  );
}