export type MenuResponse = {
    categories: [MenuCategory]
    configuration: MenuConfiguration
    highlight: [MenuProduct]
}


type MenuCategory = {
    name: string
    id: number
    order: number
    products: [MenuProduct]
}

export type MenuProduct = {
    name: string
    id: number
    category_id: number | null,
    value: number | string,
    resume: null | string,
    details: null | string,
    image: null | string,
    url_image: string,
    highlight: 1 | 0 | boolean,
    visible_online:  1 | 0 | boolean,
}

type MenuConfiguration = {
    background_color: string
    name_company: string
    theme_color: string
    url_logo: string
}