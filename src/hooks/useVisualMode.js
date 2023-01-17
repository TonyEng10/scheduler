import React from "react";
import { useState } from "react";

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); // this line is new... history in array and initial was the first
  const transition = (newMode, replace = false) => {
    if (replace === true) {
      return setMode(newMode)
    }
//only transition if replace is true 
    setMode(newMode)
    setHistory([...history, newMode])
  }
  const back = () => {
    let copyHistory = [...history]
    // cannot just do let copyHistory = history because that would just make a reference to the original source
    // to copy need to do spread operator [...history] so that when .pop it alters the copy and not the orginal
    if (copyHistory.length > 1) {
      copyHistory.pop()
      setHistory(copyHistory)
      setMode(copyHistory[copyHistory.length - 1])
    }
  }

  return { mode, transition, back };
}
