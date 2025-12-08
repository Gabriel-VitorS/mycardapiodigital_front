import type { CommonType } from '../common.type'
import type { Pagination } from '../pagination.type'
import type { Category } from './category.type'

export type Product = CommonType & {
    name: string
    category_id: number | null,
    category?: Category,
    value: number | string,
    resume: null | string,
    details: null | string,
    image: null | string,
    url_image: string,
    highlight: 1 | 0 | boolean,
    visible_online:  1 | 0 | boolean,
}

export type Products = Pagination & {
    data: [Product]
}

export type ProductParams = {
    name?: string
    id?: number
    highlight?: true | false
    visible_online?: true | false
    category?: string
    page: number
}

export type ProductForm = Omit<Product, 'id' | 'created_at' | 'updated_at' | 'company_id' | 'url_image' | 'resume' | 'category_name'> 

export type ProductId = {
    id: number
}
