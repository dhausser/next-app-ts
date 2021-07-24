import { Form, Input, Checkbox, Button, Select, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { StringDatePicker, dayjs } from './date/stringdatepicker'
import { DatePicker } from './date'
import { findCommonDateIndexes } from '../utils/datetime'
import { Dayjs } from 'dayjs'

const areas = [
  { label: 'Beijing', value: 'Beijing' },
  { label: 'Shanghai', value: 'Shanghai' },
]

interface SightOptions {
  [key: string]: string[]
}

const sights: SightOptions = {
  Beijing: ['Tiananmen', 'Great Wall'],
  Shanghai: ['Oriental Pearl', 'The Bund'],
}

const dates = [
  '2018-04-04T16:00:00.000Z',
  '2018-04-04T16:00:00.000Z',
  '2018-04-04T16:00:00.000Z',
  '2019-04-04T16:00:00.000Z',
  '2019-04-04T16:00:00.000Z',
  '2019-04-04T16:00:00.000Z',
]

// Function to convert a date to a string
const dateToString = (date: Dayjs): string => {
  return date.format('YYYY-MM-DD')
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
}
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
}

interface Sight {
  area: string
  sight: string
}

interface FormType {
  username: string
  password: string
  remember: boolean
  sights: Sight[]
}

export default function Product() {
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const [form] = Form.useForm()

  const commonDateIndexes = findCommonDateIndexes(dates)

  console.log(commonDateIndexes)

  return (
    <Form
      {...formItemLayout}
      form={form}
      initialValues={{
        username: 'Luke',
        password: '123456',
        remember: true,
        // date: '2018-04-04T16:00:00.000Z',
        sights: [
          { area: areas[0].value, sight: sights.Beijing[0] },
          { area: areas[1].value, sight: sights.Shanghai[0] },
        ],
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      {({ setFieldsValue, resetFields }) => (
        <>
          <Form.Item
            label="Username"
            name="username"
            normalize={(value) => value.toUpperCase()}
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input style={{ width: '40%' }} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password style={{ width: '40%' }} />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            tooltip="Timezone: Europe/Warsaw"
            normalize={(value) => {
              console.log('normalize', value)
              return value
            }}
          >
            <StringDatePicker />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 4 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.List
            name="sights"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 2) {
                    return Promise.reject(new Error('At least 2 sights'))
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                  <Form.Item
                    {...(index === 0
                      ? formItemLayout
                      : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'Sight' : ''}
                    required={false}
                    key={key}
                  >
                    <Space
                      key={key}
                      style={{ display: 'flex', marginBottom: 8 }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'area']}
                        fieldKey={[fieldKey, 'area']}
                        noStyle
                      >
                        <Select
                          options={areas}
                          onChange={(value) =>
                            setFieldsValue({
                              sights: form
                                .getFieldValue('sights')
                                .map((sight: Sight, sightIndex: number) => ({
                                  ...sight,
                                  sight:
                                    sightIndex === index
                                      ? sights[`${value}`][0]
                                      : sight.sight,
                                })),
                            })
                          }
                          style={{ width: 185 }}
                        />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'sight']}
                        fieldKey={[fieldKey, 'sight']}
                        validateTrigger={['onChange', 'onBlur']}
                        noStyle
                      >
                        <Select
                          options={sights[
                            form.getFieldValue(['sights', index, 'area'])
                          ].map((sight) => ({
                            label: sight,
                            value: sight,
                          }))}
                          style={{ width: 185 }}
                        />
                      </Form.Item>

                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(name)}
                        />
                      ) : null}
                    </Space>
                  </Form.Item>
                ))}
                <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button
                    type="dashed"
                    onClick={() => {
                      const [{ value: area }] = areas
                      const [sight] = sights[area]
                      add({ area, sight })
                    }}
                    style={{ width: '40%', marginTop: '20px' }}
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button type="ghost" onClick={() => resetFields()}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </>
      )}
    </Form>
  )
}
