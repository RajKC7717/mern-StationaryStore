import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  async login(credentials) {
    const { data } = await api.post("/auth/login", credentials);
    return data;
  },
  async register(payload) {
    const { data } = await api.post("/auth/register", payload);
    return data;
  },
};

export const productsApi = {
  async list() {
    const { data } = await api.get("/products");
    return data;
  },
  async create(product) {
    const { data } = await api.post("/products", product);
    return data;
  },
  async update(id, product) {
    const { data } = await api.put(`/products/${id}`, product);
    return data;
  },
  async remove(id) {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },
};


