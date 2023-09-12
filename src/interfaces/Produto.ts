export default interface Produto {
    id: number,
    company_id: number,
    category_id: number | null,
    category_name?: string,
    name: string,
    value: number,
    resume: null | string,
    details: null | string,
    image: null | string,
    url_image: string,
    highlight: 1 | 0,
    visible_online: 1 | 0,
    created_at: string,
    updated_at: string
}