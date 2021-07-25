import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { PickerProps } from 'antd/es/date-picker/generatePicker'
import { DatePicker } from '.'

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault('America/New_York')

// String to date
export const stringToDate = (date?: string) => (date ? dayjs(date) : null)

interface Props extends Omit<PickerProps<dayjs.Dayjs>, 'value'> {
  value?: string
}

function StringDatePicker(
  props: PickerProps<dayjs.Dayjs>
): React.FunctionComponentElement<PickerProps<dayjs.Dayjs>> {
  const { value } = props
  const date = typeof value === 'string' ? stringToDate(value) : value
  return <DatePicker {...props} value={date} />
}

export { dayjs, utc, timezone, StringDatePicker }
