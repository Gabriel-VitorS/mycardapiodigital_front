export default interface Produto {
    id: number,
    company_id: number,
    category_id: number | null,
    name: string,
    value: number,
    resume: null | string,
    details: null | string,
    image: null | string,
    url_image: string,
    highlight: string,
    visible_online: string,
    created_at: string,
    updated_at: string
}