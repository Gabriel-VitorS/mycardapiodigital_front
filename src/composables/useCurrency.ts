export function useCurrency() {
    function formatBRL(value: number | string): string {
        return Number(value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',    
        })
    }
    function formatUSD(value: number | string): string {
        return String(value).replace(',', '.')
    }

    return { formatBRL, formatUSD };
}