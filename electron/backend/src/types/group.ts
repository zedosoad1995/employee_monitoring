export interface ICreateGroup {
    name: string,
    startTime: string,
    endTime: string,
    breaks: Array<{
        startTime: string,
        endTime: string
    }>
}  