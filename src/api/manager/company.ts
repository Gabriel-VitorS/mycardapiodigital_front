import type {CompanyResponse} from "@/types/manager/company.type"
import api from ".."

export const getCompany = () => api.get<CompanyResponse>('/company')

