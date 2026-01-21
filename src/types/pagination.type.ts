export type Pagination = {
    current_page: number
    first_page_url: string
    last_page_url: string
    next_page_url: string | null
    from: number | null
    last_page: number
    per_page: number
    prev_page_url: string | null
    to: number | null
    total: number

}