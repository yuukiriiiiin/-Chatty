import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { Modal } from '../../modal';
import styles from './Calendar.module.scss'

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
      <div className={styles.container}>
        <Calendar locale="hu-HU" calendarType="US" onClickDay={handleChange} value={value} />
      </div>
      <Modal showModal={showModal} closeModal={closeModal} date={today}  />
    </div>
  )
}