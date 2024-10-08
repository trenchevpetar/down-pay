import { useSettingsStore } from '@/stores/settings.store'
import { currentMonthDates } from '@/utils/date/current.month.dates'
import dayjs from 'dayjs'

export const defaultDebt = () => {
  const settingsStore = useSettingsStore()

  return {
    debtName: '',
    holder: '',
    originalBalance: 0,
    currentLeftover: 0,
    currency: settingsStore.defaultCurrency,
    termLength: 10,
    status: 'current',
    debtOpenedOn: new Date(),
    paymentFrequency: currentMonthDates.value.middleOfTheMonth,
    interestRate: 2.4,
    endOfTerm: dayjs()
  }
}
