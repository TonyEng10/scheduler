import React from "react";

export function getAppointmentsForDay(state, dayName) {
  if (state.days.length === 0 ) {
    return []
  }

  const selectedDay = state.days.find(day => 
    (day.name === dayName) 
  );

  if (!selectedDay) {
    return []
  }
  
  const foundAppointment = selectedDay.appointments.map((appointmentId) => {
    return Object.values(state.appointments).find((appointment) => (appointment.id === appointmentId) 
    )
  })
  // console.log("#3foundappointment check", foundAppointment)
  // console.log("#4 foundInterviewer atttempt check:", foundAppointment.map((appointment=> appointment.interview)))
  return foundAppointment;
}

export function getInterview(state, interview) {
  const interviewData = {}
  
  if (!interview) {
    return null
  }

  const foundInterviewer = Object.values(state.interviewers).find((interviewer) => (interview.interviewer === interviewer.id))

  interviewData.student = interview.student
  interviewData.interviewer = foundInterviewer

  // console.log("#4 Object.values(state.interviewers) check", Object.values(state.interviewers))
  // console.log("#5 interviewData check:", interviewData)

  return interviewData
}

export function getInterviewersForDay(state, dayName) {
  if (state.days.length === 0 ) {
    return []
  }

  const selectedDay = state.days.find(day => 
    (day.name === dayName) 
  );

  if (!selectedDay) {
    return []
  }
  
  const foundInterviewers = selectedDay.interviewers.map((interviewerId) => {
    return Object.values(state.interviewers).find((interview) => (interview.id === interviewerId) 
    )
  })
  // console.log("#3 foundAppointment check:", foundAppointment)
  return foundInterviewers;
}