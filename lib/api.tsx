import axios from "axios";
import { storage } from "./storage";

export const api = axios.create({ baseURL: "http://localhost:3000" });

api.interceptors.request.use(async (cfg) => {
  const token = await storage.getItem("access_token");
  if (token) cfg.headers = { ...(cfg.headers || {}), Authorization: `Bearer ${token}` };
  return cfg;
});
