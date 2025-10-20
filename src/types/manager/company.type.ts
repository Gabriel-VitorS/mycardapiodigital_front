import type { CommonType } from '../common.type'

export type CompanyResponse = CommonType & {
    name: string
    cpf_cnpj: string
    email: string
}