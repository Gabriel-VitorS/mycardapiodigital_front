import type { CommonType } from '../common.type'
export type Configuration = CommonType & {
    name_company: string
    url: string
    logo_image: string 
    theme_color: string
    background_color: string
    url_logo?: string
}

export type ConfigurationForm = Omit<Configuration, 'id' | 'url_logo' | 'created_at' | 'updated_at'>

export type ConfigurationId = Omit<Configuration, 'url_logo'| 'logo_image'| 'name_company' | 'url' | 'theme_color' | 'background_color' | 'created_at' | 'updated_at'>
