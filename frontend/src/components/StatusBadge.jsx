import React from 'react'

export default function StatusBadge({ status }) {
  const statusClasses = {
    pending: 'status-pending',
    confirmed: 'status-confirmed',
    processing: 'status-processing',
    completed: 'status-completed',
  }

  return (
    <span className={statusClasses[status] || 'status-pending'}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}
