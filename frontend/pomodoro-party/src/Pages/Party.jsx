import Timer from "../Timer";
import Navbar from '../Navbar';
import { useEffect, useState } from "react";
import { Box, Center, Link, HStack, VStack, Button, Input } from "@chakra-ui/react"
import { useControllableProp, useControllableState } from '@chakra-ui/react'
import Todo from '../Todo.js';
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import {db, auth} from "../Login/firebase.js"
import { onAuthStateChanged } from "firebase/auth";
import Todo2 from "../Todo/TodoContainer";
import Timer2 from "../Timer2";

export default function Party() {

    // const [time, setTime] = useControllableState({ defaultValue: 25})
    const[time, setTime] = useState(15);
    const [session, setSession] = useControllableState({ defaultValue: null})
    const [user, setUser] = useState();
    // for number of users per session, default is 1 
    const [userNumber, setUserNumber] = useState(1);
    // collection reference to database
    const colref = collection(db, "sessions")
    
    // just to check whether someone is logged in 
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("signed in")
                setUser(user)
                console.log(user)
            } else {
                console.log("not signed in")
            }
        })
    }, [])


    function getDate() {
        let d = new Date(); 
        d.toLocaleString();
        return d;
    }
    
    const initializeStartingTime = getDate();

    /**
     * stores a session created by a user to firestore, and also creates an alert
     * to the user providing their email (session ID) 
     * @param {*} e - user event 
     */
    function createSession(e) {
        // prevents page from refreshing 
        e.preventDefault()
        console.log(user)
        addDoc(colref, {
            id: user.email,
            sessionLength: 25, 
            // every time someone joins, just add 1 to users field
            users: 1,
            // we are tracking the time that a session is created
            sessionStart: getDate(),
            startingTime: initializeStartingTime,
        })
        console.log(user.email)
        alert(`Your session ID is: ${user.email}. Share the ID with a friend and have fun!`)
    }

    function joinSession(e) {
        e.preventDefault();
        console.log(Input.value);
        // everytime someone joins by clicking join, we add 1 to users field of session
        setUserNumber(userNumber + 1);
        updateDoc(doc(db, "sessions", user.email), {
            id: user.email,
            sessionLength: 30, 
            users: userNumber,
        })
    }

    function updateTimerStart() {
        updateDoc(doc(db, "sessions", user.email), {
            timerStartTime: Date.now(),
        })
    }

    return (
    <div>
    <Navbar/>
    <Box p='30'>
    <VStack spacing={4}>
           {/* <Link display={"inline-block"} mr="15px" href="/profile" >Create a Session</Link> 
                    <Link display={"inline-block"} href="/profile" background="#fff" border="solid 1px black" p="5px 10px" >Join a Session</Link>    */}
            <Box> 
            <Button colorScheme='facebook' size='md' onClick={createSession}>Create a Session</Button>
            </Box>
            <HStack>
            <Input placeholder='Enter Session ID' size='md' />
            <Button colorScheme='facebook' size='md' onClick={joinSession}> Join Session </Button> 
            </HStack>
    </VStack>
    </Box>
    <Box p='10'>
        <Center>
            <Timer2 changeTime={value => setTime(value)} updateTimerStart={updateTimerStart}/>
            {/* <Timer minutes={time} width={"488.95px"} height={"473.22px"} left={"457px"} top={"300px"} background={"#EBE5F5"} />  */}
        </Center>
    </Box>
    {/* <Todo/> */}
    <Box position="absolute" top="100px" width="320px" minHeight="368px" left="16px" 
    background="#f5fbff" p="15px" pb="50px" borderRadius='lg' padding="20px">
        <Todo2/>
    </Box>
    <Box p='60'>
    </Box>
    
    </div>);
}