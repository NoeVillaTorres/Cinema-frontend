const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function adminRequest(path, token, options = {}) {
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

    let message = `Error en la solicitud (${response.status})`;

    if (typeof error.detail === "string") {
      message = error.detail;
    } else if (Array.isArray(error.detail)) {
      message = error.detail
        .map((item) => {
          const field = item.loc?.at(-1) ?? "campo";
          return `${field}: ${item.msg}`;
        })
        .join(". ");
    }

    const requestError = new Error(message);
    requestError.status = response.status;

    throw requestError;
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function createTitle(data, token) {
  return adminRequest("/titles", token, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updateTitle(id, data, token) {
  return adminRequest(`/titles/${id}`, token, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deleteTitle(id, token) {
  return adminRequest(`/titles/${id}`, token, {
    method: "DELETE",
  });
}