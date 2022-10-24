export const addPlusSign = (str: string) => {
    return (str[0] !== '-' ? '+' : '') + str
}