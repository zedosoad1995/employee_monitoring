import { BREAK_DURATION_TH } from "../constants"
import { getMinsFromTimeStr, getTimeStrFromMins } from "./dateTime"
import { addPlusSign } from "./string"

interface IGroup {
    startTime: string,
    endTime: string,
    Break: Array<{ startTime: string, endTime: string }>
}

interface ITime {
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
    group?: IGroup
) => {
    let isSameSchedule = false
    if (group) {
        const expectedMoves = '10'.repeat(group.Break.length + 1)
        const moves = times.reduce((acc, el) => {
            return acc + String(Number(el.isEnter))
        }, '')
        isSameSchedule = expectedMoves === moves
    }

    const breaks = times.slice(1, -1).reduce((acc: Array<Array<string | null>>, el) => {
        if (el.isEnter) {
            if (acc.at(-1)?.length === 2 || acc.length === 0) {
                acc.push([null, el.time])
            } else if (acc.at(-1)?.length === 1) {
                acc[acc.length - 1].push(el.time)
            }
        } else {
            if (acc.at(-1)?.length === 1) {
                acc[acc.length - 1].push(null)
            }
            acc.push([el.time])
        }
        return acc
    }, [])
        .map((el, index) => {
            const duration = (isSameSchedule && el[0] && el[1]) ?
                getTimeStrFromMins(getMinsFromTimeStr(el[1]) - getMinsFromTimeStr(el[0])) : null

            const minsExceeding = (isSameSchedule && group && el[0] && el[1]) ?
                (getMinsFromTimeStr(el[1]) - getMinsFromTimeStr(el[0])) -
                (getMinsFromTimeStr(group.Break[index].endTime) - getMinsFromTimeStr(group.Break[index].startTime))
                : null

            return {
                startTime: el[0],
                endTime: el[1],
                duration,
                minsExceeding,
                isNotAcceptable: minsExceeding ? minsExceeding > BREAK_DURATION_TH : false
            }
        })

    return {
        breaks,
        isNotAcceptableBreak: breaks.some(b => b.isNotAcceptable)
    }
}