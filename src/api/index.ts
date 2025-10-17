import router from "@/router";
import axios from "axios";
import { Toast } from "@/stores/toast";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_URL_API}`,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${JSON.parse(sessionStorage.getItem("JWT")!)}`;
  return config;
})

api.interceptors.response.use((response) => {
    return response;
  
    },(error) => {

        if (error.response.status === 401 && router.currentRoute.value.path !== '/login' && router.currentRoute.value.path !== '/cadastra') {
            Toast().error("Sessão expirada, faça login novamente.");
            sessionStorage.removeItem("JWT");
            router.push("/login");
        }
        console.error(error);
        return Promise.reject(error);
})

export default api;