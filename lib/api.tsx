// lib/api.ts
import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { storage } from "./storage";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://127.0.0.1:3000",
});

api.interceptors.request.use(async (cfg: InternalAxiosRequestConfig) => {
  const token = await storage.getItem("access_token");
  if (token) {
    // garante que é AxiosHeaders e usa .set()
    const headers = AxiosHeaders.from(cfg.headers);
    headers.set("Authorization", `Bearer ${token}`);
    cfg.headers = headers;
  }
  return cfg;
});
