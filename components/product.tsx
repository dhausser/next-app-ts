import { Form, Input, Checkbox, Button, Select, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import React from 'react'
import { SelectValue } from 'antd/lib/select'

const { Option } = Select

const areas = [
  { label: 'Beijing', value: 'Beijing' },
  { label: 'Shanghai', value: 'Shanghai' },
]

interface Sights {
  [key: string]: string[]
}

const sights: Sights = {
  Beijing: ['Tiananmen', 'Great Wall'],
  Shanghai: ['Oriental Pearl', 'The Bund'],
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

interface FormType {
  username: string
  password: string
  remember: boolean
  area: string
  sights: string[]
}

export default function Product() {
  const [form] = Form.useForm<FormType>()

  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const handleChange = (value: SelectValue, key: number) => {
    const newSights = form.getFieldValue('sights')
    newSights.splice(key, 1, {
      area: value,
      sight: sights[`${value}`],
    })
    form.setFieldsValue({ sights: newSights })
  }

  const getArea = (key: number): string => {
    const { area } = form.getFieldValue('sights')[key]
    return area
  }

  return (
    <Form
      form={form}
      name="dynamic_form_nest_item"
      {...formItemLayout}
      initialValues={{
        username: 'Luke',
        password: '123456',
        remember: true,
        sights: [
          { area: areas[0].value, sight: sights.Beijing[0] },
          { area: areas[1].value, sight: sights.Shanghai[0] },
        ],
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input style={{ width: '40%' }} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password style={{ width: '40%' }} />
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
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
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
                      onChange={(value) => handleChange(value, key)}
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
                      options={sights[getArea(key)].map((sight) => ({
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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
