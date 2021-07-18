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

export function filterCommonDates(dates: string[]) {
  const datesArray: string[] = []
  dates.forEach((date, index) =>
    datesArray.includes(date) ? null : datesArray.push(date)
  )

  // dates.forEach((date, index) =>
  //   datesArray.includes(date) ? datesArray.push(date) : null
  // )

  console.log(datesArray)
}
