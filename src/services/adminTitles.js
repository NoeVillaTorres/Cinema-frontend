const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const adminRequest = async(path, token, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));

    const message =
      typeof error.detail === "string"
        ? error.detail
        : `Error en la solicitud (${response.status})`;

    throw new Error(message);
  }

  if (response.status === 204) return null;

  return response.json();
}

export const createTitle = (data, token) => {
  return adminRequest("/titles", token, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export const updateTitle = (id, data, token) => {
  return adminRequest(`/titles/${id}`, token, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export const deleteTitle = (id, token) => {
  return adminRequest(`/titles/${id}`, token, {
    method: "DELETE",
  });
}