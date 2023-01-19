import React from "react";
import useVisualMode from "hooks/useVisualMode";

import Header from "../Appointment/Header";
import Show from "../Appointment/Show";
import Empty from "../Appointment/Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import "components/Appointment/styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(res => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true))
  };

  const cancel = () => {

    transition(DELETING, true)
    props.cancelInterview(props.id)
      .then(res => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true))
  };

  const edit = () => {
    transition(EDIT);
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
          interview={props.interview}
          placeholder="Enter Student Name"
        />
      )}
      {mode === SAVING && (
        <Status
          message={"Saving"}
        />
      )}
      {mode === DELETING && (
        <Status
          message={"Deleting"}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          onCancel={back}
          onConfirm={cancel}
          message={"Are you sure you would like to delete?"}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
          placeholder="Enter Student Name"
          interviewer={props.interview.interviewer.id} // setup this way so that it just replaces the default useState on form
          student={props.interview.student} // same as above
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"Error not able to save appointment"}
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Error cannot delete appointment"}
          onClose={back}
        />
      )}
    </article>
  )
};

