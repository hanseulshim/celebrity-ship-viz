import React from 'react'
import { Alert } from 'antd'

const Notification = ({ message, type }) => {
  return <Alert type={type} message={message} />
}

export default Notification
