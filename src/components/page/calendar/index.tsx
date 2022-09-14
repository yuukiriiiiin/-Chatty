import React, { useState } from 'react'
import Calendar from 'react-calendar'
import { Modal } from '../../modal';

export const CalendarPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [value, onChange] = useState<Date>(new Date());
  const [today, setToday] = useState<Date>(new Date());

  const handleChange = (value: Date) => {
    setShowModal(true)
    setToday(value)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div>
      <Calendar locale="ja-JP" calendarType="US" onClickDay={handleChange} value={value} />
      <Modal showModal={showModal} closeModal={closeModal} date={today}  />
    </div>
  )
}