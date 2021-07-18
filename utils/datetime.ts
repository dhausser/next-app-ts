function findCommonDate(dates: Iterable<string> | null | undefined) {
  const datesSet = new Set(dates)
  const datesArray = Array.from(datesSet)
  const datesArraySorted = datesArray.sort((a, b) => +a - +b)
  return datesArraySorted
}

function convertArrayToObject(array: (string | number)[]) {
  const obj: Record<string, number[]> = {}
  array.forEach((item: string | number) => {
    obj[item] = []
  })
  return obj
}

export function findCommonDateIndexes(dates: string[]) {
  const datesArraySorted = findCommonDate(dates)
  const dateIndexes = convertArrayToObject(datesArraySorted)
  datesArraySorted.forEach((uniqueDate) => {
    dates.forEach((date, index) =>
      date === uniqueDate ? dateIndexes[uniqueDate].push(index) : null
    )
  })
  return dateIndexes
}

const initialValue: string[] = []

function reducer(
  accumulator: string[],
  currentValue: string,
  index: number,
  array: string[]
) {
  accumulator.includes(currentValue) ? null : accumulator.push(currentValue)
  return accumulator
}

export function filterCommonDates(dates: string[]) {
  return dates.reduce(reducer, initialValue)
}
