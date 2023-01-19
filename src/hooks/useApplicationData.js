import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      const [days, appointments, interviewers] = all
      // console.log("days.data check", days.data)
      setState((prev) => ({ ...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data }));
    })
  }, []);

  const countFreeSpots = (currentDay, appointments) => {
    // In: the current state
    // Out: number of spots

    // const currentDay = state.days.find((day) => day.name === state.day);
    const listOfApptsId = currentDay.appointments;
    const listofAppts = listOfApptsId.map((id) => appointments[id]);

    const listofFreeAppts = listofAppts.filter((appt) => !appt.interview)
    const spots = listofFreeAppts.length
    // console.log("spots check", spots)
    return spots;
  };

  const updateSpots = (state, appointments) => {
    // In: State
    // Out: State
    const currentDay = state.days.find((day) => day.name === state.day);

    // console.log("currentDay check", currentDay)
    const currentDayIndex = state.days.findIndex((day) => day.name === state.day);

    const newCurrentDay = { ...currentDay };
    newCurrentDay.spots = countFreeSpots(currentDay, appointments);

    const newDays = [...state.days];
    newDays[currentDayIndex] = newCurrentDay;
    // console.log("#1 newDays", newDays)
    // console.log("#5 newDays count part of update spots", newDays)
    return newDays;
  };

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(response => {
        if (response.status === 204) {
          const days = updateSpots(state, appointments);
          // console.log("#3days check", days);
          // console.log("#4 counts check", countFreeSpots(state));
          // setState({ ...state, appointments, days })
          setState({ ...state, appointments, days })
        } else {
          console.log("Error updating record")
        }
      })
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        // console.log(response);
        if (response.status === 204) {
          const days = updateSpots(state, appointments);
          // console.log("aafter", appointments)
          setState({ ...state, appointments, days })
        } else {
          console.log("Error updating record")
        }
      })
  };

  const setDay = day => setState(prev => ({ ...prev, day }))

  return { state, setDay, bookInterview, cancelInterview }

};