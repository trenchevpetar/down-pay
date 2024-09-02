import { computed } from 'vue'

type MonthDates = {
  firstDayOfMonth: Date
  middleOfTheMonth: Date
  lastDayOfMonth: Date
}

export const currentMonthDates = computed<MonthDates>(() => {
  const date = new Date(),
    year = date.getFullYear(),
    month = date.getMonth()

  const nextMonth = new Date(year, month + 1, 1)
  nextMonth.setDate(nextMonth.getDate() - 1)

  const daysInMonth = nextMonth.getDate()
  const middleDay = Math.ceil(daysInMonth / 2)

  return {
    firstDayOfMonth: new Date(year, month, 1),
    middleOfTheMonth: new Date(year, month, middleDay),
    lastDayOfMonth: new Date(year, month + 1, 0)
  }
})
