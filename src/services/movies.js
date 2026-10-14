const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function getMovies() {
  const response = await fetch(`${API_URL}/titles`);

  if (!response.ok) {
    throw new Error("No fue posible obtener las películas");
  }

  return response.json();
}