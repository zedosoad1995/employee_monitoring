import { BREAK_DURATION_TH } from "../constants"
import { getMinsFromTimeStr, getTimeStrFromMins } from "./dateTime"
import { addPlusSign } from "./string"

interface IGroup {
    startTime: string,
    endTime: string,
    Break: Array<{ startTime: string, endTime: string }>
}

interface ITime {
    id: string,
    time: string,
    isEnter: boolean
}

export const getOvertime = (
    times: Array<ITime>,
    group: IGroup
) => {
    const { totalMins } = times.reduce((acc: any, el) => {
        if (acc.hasEntered && !el.isEnter) {
            acc.totalMins += getMinsFromTimeStr(el.time) - acc.prevMins
            acc.hasEntered = false
        } else if (!acc.hasEntered && el.isEnter) {
            acc.prevMins = getMinsFromTimeStr(el.time)
            acc.hasEntered = true
        }

        return acc
    }, { totalMins: 0, hasEntered: false, prevMins: 0 })

    const totalTimeDiff = getMinsFromTimeStr(group.endTime) - getMinsFromTimeStr(group.startTime)
    const timeInBreaks = group.Break.reduce((acc: number, el) => {
        return acc + getMinsFromTimeStr(el.endTime) - getMinsFromTimeStr(el.startTime)
    }, 0)
    const expectedMins = totalTimeDiff - timeInBreaks
    return totalMins - expectedMins
}

export const getBreaks = (
    times: Array<ITime>,
    group?: IGroup,
    hasStart?: boolean,
    hasEnd?: boolean
) => {
    let isSameSchedule = false
    if (group) {
        const expectedMoves = '10'.repeat(group.Break.length + 1)
        const moves = times.reduce((acc, el) => {
            return acc + String(Number(el.isEnter))
        }, '')
        isSameSchedule = expectedMoves === moves
    }

    const breaksIni = hasStart ? 1 : 0
    const timesSliced = hasEnd ? times.slice(breaksIni, -1) : times.slice(breaksIni)

    const breaks = timesSliced.reduce((acc: Array<Array<any>>, el) => {
        if (el.isEnter) {
            if (acc.length === 0 || acc.at(-1)?.at(1).length === 2) {
                acc.push([el.id, ['', el.time]])
            } else if (acc.at(-1)?.at(1).length === 1) {
                acc[acc.length - 1][1].push(el.time)
            }
        } else {
            if (acc.at(-1)?.at(1).length === 1) {
                acc[acc.length - 1][1].push('')
            }
            acc.push([el.id, [el.time]])
        }
        return acc
    }, [])
        .map((el, index) => {
            const duration = (isSameSchedule && el[1][0] && el[1][1]) ?
                getTimeStrFromMins(getMinsFromTimeStr(el[1][1]) - getMinsFromTimeStr(el[1][0])) : ''

            const minsExceeding = (isSameSchedule && group && el[1][0] && el[1][1]) ?
                (getMinsFromTimeStr(el[1][1]) - getMinsFromTimeStr(el[1][0])) -
                (getMinsFromTimeStr(group.Break[index].endTime) - getMinsFromTimeStr(group.Break[index].startTime))
                : ''

            return {
                id: el[0],
                startTime: el[1][0],
                endTime: el[1][1],
                duration,
                minsExceeding,
                isNotAcceptable: minsExceeding ? minsExceeding > BREAK_DURATION_TH : false
            }
        })

    return {
        breaks,
        isNotAcceptableBreak: breaks.some(b => b.isNotAcceptable),
        hasMalfunction: !isSameSchedule
    }
}