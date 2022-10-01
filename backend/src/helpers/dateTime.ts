export const getMinsFromTimeStr = (str: string) => {
    let [hh, mm] = str.split(':')
    return Number(hh) * 60 + Number(mm)
}

export const getTimeStrFromMins = (totalMins: number) => {
    let tempMins = Math.abs(totalMins)

    const hours = Math.floor(tempMins / 60)
    const mins = tempMins - hours * 60
    if (totalMins < 0) {
        return `-${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
    }

    return `+${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
}