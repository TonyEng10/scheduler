import React from "react";
import useApplicationData from "hooks/useApplicationData";

import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "./helpers/selectors";
import DayList from "./DayList";
import Appointment from "./Appointment";

import "components/Application.scss";


export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {

    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        {...appointment}
        interview={interview}
        cancelInterview={cancelInterview}
      />
    )
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          {state.days && state.days.length && (
            <DayList
              days={state.days}
              day={state.day}
              onChange={setDay}
            />
          )}
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment
          key="last"
          time="5pm"
        />
      </section>
    </main>
  )
};
