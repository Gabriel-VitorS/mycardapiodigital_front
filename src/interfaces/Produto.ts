export default interface Produto {
    id: number,
    company_id: number,
    category_id: number,
    name: string,
    value: number,
    resume: null | string,
    details: null | string,
    image: null | string,
    highlight: number,
    visible_online: number,
    created_at: string,
    updated_at: string
}