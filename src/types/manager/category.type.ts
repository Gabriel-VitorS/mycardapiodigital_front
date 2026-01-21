import type { CommonType } from '../common.type'
import type { Pagination } from '../pagination.type'

export type Category = CommonType & {
    name: string
    order: number
}

export type Categories = Pagination & {
    data: [Category]
}

export type CategoryParams = {
    name?: string
    id?: number
    limit?: number
    page: number
}

export type CategoryForm = Omit<Category, 'id' | 'company_id' | 'created_at' | 'updated_at'>

export type CategoryId = Omit<Category,  'company_id' | 'created_at' | 'updated_at' | 'name' | 'order'>
