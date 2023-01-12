import React from "react";
import "components/Appointment/styles.scss";
import Header from "../Appointment/Header";
import Show from "../Appointment/Show";
import Empty from "../Appointment/Empty";

export default function Appointment (props) {
  console.log("appointment test props",props.interview)
  return (
  <article className="appointment">
    <Header time={props.time}/>
    {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/> : <Empty />}
  </article>
  )
}

