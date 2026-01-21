import type { Configuration, ConfigurationId, ConfigurationForm } from "@/types/manager/configuration"
import api from ".."

export const getConfiguration = () => api.get<Configuration>('/configuration')

export const updateConfiguration = (id:number, values: ConfigurationForm) => api.put<ConfigurationId>('/configuration/' + id, values)

export const storeConfiguration = (values: ConfigurationForm) => api.post<ConfigurationId>('/configuration', values)

export const storeImgConfiguration = (values: ConfigurationForm) => api.post<void>('/configuration/logo_image',values,{
    data: values,
    headers: { 'Content-Type': 'multipart/form-data' }
})

