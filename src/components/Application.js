import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import { useState, useEffect } from "react";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "./helpers/selectors";
// import Show from "./Appointment/Show";
// import Appointment from "./components/Appointment";
// import Appointment from "src/components/Appointment";


// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };
// old days array is being replaced by api call
// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const schedule= dailyAppointments.map((appointment) => {
    console.log("#3 ...appointment check for props", {...appointment})
    // const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        //spread opperator replaces all below!
      // id={appointment.id}
      // time={appointment.time}
      // interview={appointment.interview}
      />
    )
  })

  const setDay = day => setState(prev => ({ ...prev, day }))
  // const setDays = days => setState(prev => ({...prev, days}))

  // useEffect(() => {
  //   axios.get("/api/days")
  //     .then((response) => {
  //       setDays(response.data);
  //     })
  // })
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      const [days, appointments, interviewers] = all
      console.log(all);
      setState((prev) => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}));
    })
  }, [])
  console.log("#1 state check",state);
  console.log("$1 state check",state.day);
  console.log("#2 state.interviewers check", state.interviewers)
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
