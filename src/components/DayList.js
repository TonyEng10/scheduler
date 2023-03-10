import useApplicationData from "hooks/useApplicationData";
import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const eachDay = props.days.map((day) => {

    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.onChange}
      />
    )
  })

  return (
    <ul>
      {eachDay}
    </ul>
  )
};