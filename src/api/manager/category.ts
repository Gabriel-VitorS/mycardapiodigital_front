import type {Categories, CategoryParams, Category} from '@/types/manager/category.type'
import api from ".."

export const getCategories = (params?: CategoryParams) => api.get<Categories>('/category', {
    params: params
})

export const getCategoryById = (id: number) => api.get<Category>(`/category/${id}`)

export const createCategory = (data: { name: string; order: number }) => api.post<Categories>('/category', data)

export const updateCategory = (id: number, data: { name: string; order: number }) => api.put<Categories>(`/category/${id}`, data)

export const deleteCategory = (id: number) => api.delete<Categories>(`/category/${id}`)
