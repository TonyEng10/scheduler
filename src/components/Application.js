import React from "react";
import useApplicationData from "hooks/useApplicationData";
// import { useState, useEffect } from "react";
// import useVisualMode from "hooks/useVisualMode";

import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "./helpers/selectors";
import DayList from "./DayList";
import Appointment from "./Appointment";


// import axios from "axios";

import "components/Application.scss";

// import Show from "./Appointment/Show";
// import Empty from "./Appointment/Empty"
// import Appointment from "./components/Appointment";
// import Appointment from "src/components/Appointment";

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  // console.log("#1 app props check:", props)

const {
  state,
  setDay,
  bookInterview,
  cancelInterview
} = useApplicationData();


// console.log("#1 application.js state check:", state)
  

  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  

  
  const schedule = dailyAppointments.map((appointment) => {
    // console.log("#3 ...appointment mapped check for props", {...appointment})
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
  })

  
  // const setDays = days => setState(prev => ({...prev, days}))

  // useEffect(() => {
  //   axios.get("/api/days")
  //     .then((response) => {
  //       setDays(response.data);
  //     })
  // })
  
  // console.log("#1 state check",state);
  // console.log("$1 state check",state.day);
  // console.log("#2 state.interviewers check", state.interviewers)
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
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
  );
}
