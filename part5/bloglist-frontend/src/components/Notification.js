import React from 'react'
import './Notification.css'

const Notification = ({ message, type, display }) => {
  if (!display) return null

  const styleTypes = {
    info: 'notification-info',
    error: 'notification-error'
  }

  return (
    <div className={`notification ${styleTypes[type]}`}>
      {message}
    </div>
  )
}

export default Notification