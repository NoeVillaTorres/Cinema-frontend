const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const  getMovies = async(filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  const query = params.toString();
  const url = `${API_URL}/titles${query ? `?${query}` : ""}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("No se pudo cargar el catálogo");
  }

  return response.json();
}

export const getGenres = async() => {
  const response = await fetch(`${API_URL}/genres`);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los géneros");
  }

  return response.json();
}

export const getMovieById = async(id) => {
  const response = await fetch(`${API_URL}/titles/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("El título no existe");
    }

    throw new Error("No se pudo cargar la información del título");
  }

  return response.json();
}