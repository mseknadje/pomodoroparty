import React, {useState, useEffect} from 'react';
import './Timer.css';


function startTimer() {
    alert("click")
}

/**
 * Function that instantiates a button for 25 minutes
 * https://aleksandarpopovic.com/Infinite-Pomodoro-App-in-React/ 
 * @returns 
 */
function Timer(props) {
    const [minutes, setMinutes] = useState(props.minutes)
    const [seconds, setSeconds] = useState(0)
    const [displayMessage, setDisplayMessage] = useState(false)
    const [startButton, setStartButton] = useState(false)
    const [buttonStyle, setButtonStyle] = useState({
      height: props.height,
      width: props.width,
      left: props.left,
      top: props.top,
      background: props.background
    })

    function start() {
        // alert("start")
        setStartButton(!startButton)

        // global variable isPaused (bool)
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
      <div className="button-button1"> 
        <button style={buttonStyle} onClick={start}> {timerMinutes}:{timerSeconds} </button>
      </div>
    </div>
  ) 
  
}





export default Timer; 