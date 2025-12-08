import type { Products, Product,ProductId, ProductForm, ProductParams } from "@/types/manager/product.type"
import api from ".."

export const getProducts = (params?: ProductParams) => api.get<Products>('/product',{
    params: params
})

export const getProductById = (id: number) => api.get<Product>(`/product/${id}`)

export const updateProduct = (id:number, values: ProductForm) => api.put<number>('/product/' + id, values)

export const storeProduct = (values: ProductForm) => api.post<number>('/product', values)

export const deleteProduct = (id:number) => api.delete<void>('/product/' + id)

export const storeImgProduct = (values: {id: number, image: File}) => api.post<void>('/product/product_image',values,{
    data: values,
    headers: { 'Content-Type': 'multipart/form-data' }
})

