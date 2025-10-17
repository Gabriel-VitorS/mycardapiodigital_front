import type {LoginRequest} from "@/types/auth/login.type"
import api from ".."

export const login = (values: LoginRequest) => api.post<string>('/login', values)

