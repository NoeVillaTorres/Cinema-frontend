const API_URL = import.meta.env.VITE_API_URL


export const login = async(email, password) => {
  
  let response;

  try {
    response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    throw new Error("No se pudo conectar con el servidor");
  }

  if (response.status === 401) {
    throw new Error("Correo o contraseña incorrectos");
  }

  if (response.status === 422) {
    throw new Error("Revisa los datos del formulario");
  }

  if (!response.ok) {
    throw new Error("No se pudo iniciar sesión. Inténtalo más tarde");
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