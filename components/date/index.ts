import dynamic from 'next/dynamic'

export const DatePicker = dynamic(() => import('./datepicker'), { ssr: false })
export const RangePicker = dynamic(() => import('./rangepicker'), {
  ssr: false,
})
