import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewList(props) {
  


  const eachInterviewer = props.interviewers.map((interviewer) => {
  // function below could be used to delegate the setInterviewer instead
  // of writing the anonymous function currently in line 21
  // const setInterviewer = () => {
  //   props.setInterviewer(interviewer.id)
  // } 
    return (
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    )
  })
  
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{eachInterviewer}</ul>
    </section>
  )
}