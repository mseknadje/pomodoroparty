import { Button, Flex, Text, VStack, HStack, Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { updateTimer } from "./Login/firebase.js"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Login/firebase";
import { updateTimerStart, timeHandler } from "./Pages/Party"

function Timer2() {
  const [user, loading, error] = useAuthState(auth);
  const [time, setTime] = useState(0);
  const [timerStart, setTimerStart] = useState(false);
  // in order to store the sessionLength in minutes in firebase
  const [sessionLength, setSessionLength] = useState()
  const buttons = [
    {
      value: 900,
      display: "15 minutes",
    },
    {
      value: 1800,
      display: "30 minutes",
    },
    {
      value: 3600,
      display: "60 minutes",
    },
  ];
  const toggleTimer = () => {
    setTimerStart(!timerStart);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerStart) {
        if (time > 0) {
          setTime(time - 1);
        } else if (time === 0) {
          clearInterval(interval);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timerStart, time]);

  /**
   * Converts time in seconds to minutes for readability in Firebase
   * @param - the length of the session in seconds 
   * @returns - the length of the session in minutes 
   */
  function convertSessionLength(time) {
    let minutes = Math.floor(time/60);
  }


  return (
    <div>
      <VStack>
        {/* main text */}
        <Text fontWeight="bold" fontSize="9xl" color="white">
          {`${Math.floor(time / 60) < 10
              ? `0${Math.floor(time / 60)}`
              : `${Math.floor(time / 60)}`
            }:${time % 60 < 10 ? `0${time % 60}` : time % 60}`}
        </Text>
        {/* start button */}
        <Button
          width="7rem"
          background="pink"
          color="white"
          onClick={() => {
            // this needs to be called in the right order or countdown won't start
            updateTimer(user.email, time);
            toggleTimer();
          }}
        >
          {!timerStart ? "Start" : "Pause"}
        </Button>
      </VStack>
      <Flex marginTop={10}>
        {/* Timer Options */}
        {buttons.map(({ value, display }) => (
          <Button
            marginX={4}
            background="blue.300"
            color="white"
            onClick={() => {
              setTimerStart(false);
              setTime(value);
              const timeInMinutes = convertSessionLength(value);
              setSessionLength(timeInMinutes); // need to pass this value to Party.jsx
            }}
          >
            {display}
          </Button>
        ))}
      </Flex>
    </div>
  );
}
export default Timer2;