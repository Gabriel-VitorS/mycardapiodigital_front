import type {RegisterRequest} from "@/types/auth/register.type"
import api from ".."

export const register = (values: RegisterRequest) => api.post<string>('/register', values)

