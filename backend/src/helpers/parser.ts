export const parseBoolean = (val: string) => {
    if (typeof val !== 'string') return undefined
    if (val.toLowerCase() === 'true') return true
    if (val.toLowerCase() === 'false') return false
}