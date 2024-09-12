export const formatCurrency = (value: number, currencyCode: string): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode
  })
  return formatter.format(value)
}

export const cleanFormatCurrency = (value: number, currencyCode: string): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0
  })

  return Number(formatter.format(value).replace(/[^0-9.-]+/g, ''))
}
