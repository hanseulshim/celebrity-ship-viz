import React from 'react'
import styled from 'styled-components'
import Header from './main/Header'

import { Form, Icon, Input, Button } from 'antd'

const Container = styled.div`
  text-align: center;
  margin-top: 100px;
`

const hasErrors = fieldsError => {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

const HorizontalLoginForm = ({ form, setPassword }) => {
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        setPassword(values.password)
      }
    })
  }
  const {
    getFieldDecorator,
    getFieldsError,
    getFieldError,
    isFieldTouched
  } = form

  // Only show error after a field is touched.
  const passwordError = isFieldTouched('password') && getFieldError('password')
  return (
    <>
      <Header />
      <Container>
        <Form layout="inline" onSubmit={e => handleSubmit(e)}>
          <Form.Item
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </>
  )
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(
  HorizontalLoginForm
)

export default WrappedHorizontalLoginForm
