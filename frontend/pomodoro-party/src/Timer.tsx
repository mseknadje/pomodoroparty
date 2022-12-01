import React, {useState, useEffect} from 'react';
import './Timer.css';



function startTimer() {
    alert("click")
}

// src = https://thewebdev.info/2021/01/31/create-a-pomodoro-timer-with-react-and-javascript/ 
// https://aleksandarpopovic.com/Infinite-Pomodoro-App-in-React/ 

function Timer() {
    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)
    const [displayMessage, setDisplayMessage] = useState(false)
    const [startButton, setStartButton] = useState(false)

    function start() {
        // alert("start")
        setStartButton(true)

      }

    useEffect(() => {
        if (startButton) {
        let interval = setInterval(() => {
          clearInterval(interval)
    
          if (seconds === 0) {
            if (minutes !== 0) {
              setSeconds(59)
              setMinutes(minutes - 1)
            } else {
              let minutes = displayMessage ? 24 : 4
              let seconds = 59
    
              setSeconds(seconds)
              setMinutes(minutes)
              setDisplayMessage(!displayMessage)
            }
          } else {
            setSeconds(seconds - 1)
          }
        }, 1000)}
      }, [startButton, seconds]) 

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds

  return (
    <div className="pomodoro">
      <div className="message">
        {displayMessage && <div>Break time! New session starts in:</div>}
      </div>
      <div className="timer">
        {/* Components that update */}
      </div>
      <div className="button button1"> 
        <button onClick={start}> {timerMinutes}:{timerSeconds} </button>
      </div>

      {/* <div className="button button2"> 
        <button onClick={start}> {timerMinutes}:{timerSeconds} </button>
      </div> */}

    </div>
  )
  
}




export default Timer