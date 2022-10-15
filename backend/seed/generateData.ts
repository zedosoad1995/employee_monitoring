import { readFile, utils } from 'xlsx'
import { format } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'

const workbook = readFile('C:\\Projects\\employees_monitor\\backend\\prisma\\data\\employees_sample.xlsx', { type: "binary", cellDates: true })

const sheet_name_list = workbook.SheetNames;
const data: Array<any> = utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

const keysDict = { '__EMPTY': 'date', '姓名': 'employee', '更改前開始時間': 'startTime', '更改前結束時間': 'endTime' }
const dateFields = ['date']
const timeFields = ['startTime', 'endTime']

const convertedData = data.map(row => Object.entries(keysDict).reduce((acc: any, [original, translation]) => {
    if (dateFields.includes(translation)) {
        acc[translation] = format(row[original], 'yyyy-MM-dd')
    } else if (timeFields.includes(translation)) {
        acc[translation] = row[original] ? format(row[original], 'HH:mm') : null
    } else {
        const employeeInfo = row[original].split('(')
        acc['name'] = employeeInfo[0]
        acc['cardId'] = employeeInfo[1].slice(0, -1)
    }
    return acc
}, {}))

const employees = Object.entries(convertedData.reduce((acc: any, el) => {
    acc[el.cardId.trim()] = el.name
    return acc
}, {})).map(([cardId, name]) => ({ id: uuidv4(), name, cardId, groupId: '04ea9489-fa9a-413d-896e-754422f5a1ed' }))

const timesheets = convertedData.reduce((acc: any, el) => {
    if (el.startTime) {
        const employeeId = employees.find((e) => el.cardId.trim() === e.cardId)?.id
        if (!employeeId) throw new Error('Cannot find employee in row ' + JSON.stringify(el))

        acc.push({
            date: el.date,
            time: el.startTime,
            isEnter: true,
            employeeId
        })
    }

    if (el.endTime) {
        const employeeId = employees.find((e) => el.cardId.trim() === e.cardId)?.id
        if (!employeeId) throw new Error('Cannot find employee in row ' + JSON.stringify(el))

        acc.push({
            date: el.date,
            time: el.endTime,
            isEnter: false,
            employeeId
        })
    }

    return acc
}, [])

timesheets.sort((a: any, b: any) => {
    const dateCmp = a.date.localeCompare(b.date)
    if (dateCmp) return dateCmp

    const employeeCmp = a.employeeId.localeCompare(b.employeeId)
    if (employeeCmp) return employeeCmp

    return a.time.localeCompare(b.time)
})

let baseSeed = fs.readFileSync('C:\\Projects\\employees_monitor\\backend\\prisma\\data\\baseSeed.json', 'utf-8')

const seed = { ...JSON.parse(baseSeed), employees, timesheets }

fs.writeFileSync('C:\\Projects\\employees_monitor\\backend\\prisma\\data\\generatedSeed.json', JSON.stringify(seed))
