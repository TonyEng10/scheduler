import React from "react";
import Button from "../../components/Button";
import InterviewerList from "../../components/InterviewerList";
import { useState } from "react";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  const reset = () => {
    setStudent("");
    setInterviewer("");
  }
  const cancel = () => {
    reset();
    return props.onCancel();
  }

  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }

    props.onSave(student, interviewer);
  }


  // console.log("#2 form props check:", props)
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={props.placeholder}
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          //  need name and interviewer passed as prop
          />
        </form>
      <section className="appointment__validation">{error}</section>

          <InterviewerList
            value={interviewer}
            interviewers={props.interviewers}
            onChange={setInterviewer}
          />
        
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}