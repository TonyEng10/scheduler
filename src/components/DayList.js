import useApplicationData from "hooks/useApplicationData";
import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props){
  console.log("#7 daylist props check,", props)
  const { state } = useApplicationData();
  console.log("#8 daylist state check,", state)

const eachDay = state.days.map((day) => {
  console.log("day.spots check,", day.id, day.spots)
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
// console.log("#6 daylist props check for spots", props)
  return(
    <ul>
      {eachDay}
    </ul>
  )
}