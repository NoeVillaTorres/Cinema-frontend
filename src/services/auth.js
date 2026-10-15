const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";


export const login = async(email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Correo o contraseña incorrectos");
  }

  return response.json();
}

export const getCurrentUser = async(token) => {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo verificar la sesión");
  }

  return response.json();
}