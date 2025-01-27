// src/fetchInterceptor.js
const originalFetch = window.fetch;

window.fetch = async (input, init = {}) => {
  const token = localStorage.getItem("token");
  
  init.headers = {
    ...init.headers,
    Authorization: `${token}`, // Asumiendo que el token es Bearer
    "Content-Type": "application/json; charset=utf-8", // Aseguramos que el tipo de contenido sea UTF-8
  };
  return originalFetch(input, init);
};