import Timer from "../Timer";
import Navbar from '../Navbar';
import { useEffect, useState, useRef } from "react";
import { Box, Center, HStack, VStack, Button, Input } from "@chakra-ui/react"
import { useControllableProp, useControllableState } from '@chakra-ui/react'
import Todo from '../Todo.js';
import { addDoc, collection, updateDoc, docs, doc, setDoc, getDoc } from "firebase/firestore";
import {db, auth} from "../Login/firebase.js"
import { onAuthStateChanged } from "firebase/auth";
import Todo2 from "../Todo/TodoContainer";
import Timer2 from "../Timer2";

export default function Party(props) {

    // const [time, setTime] = useControllableState({ defaultValue: 25})
    const[time, setTime] = useState(15);
    const [session, setSession] = useControllableState({ defaultValue: null})
    const [user, setUser] = useState();
    // for number of users per session, default is 1 
    const [userNumber, setUserNumber] = useState(1);
    // collection reference to database
    const colref = collection(db, "sessions");

    /**
     * for connection setup
     */
    const [testTime, setTestTime] = useState();
    const [info, setInfo] = useState();
    const [fbKey, setfbKey] = useState('');
    // used for "join session", joinValue is the unique session identifier
    const [joinValue, setJoinValue] = useState("");
    const [countdown, setCountdown] = useState();
    
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
     * Handles changes related to the "Join Session" input box. 
     * Should set 
     * @param {*} event 
     */
    const handleInputSession = event => {
        setJoinValue(event.target.value);
    }

    /**
     * stores a session created by a user to firestore, and also creates an alert
     * to the user providing their email (session ID) 
     * @param {*} e - user event 
     */
       function createSession(e) {
        // prevents page from refreshing 
        e.preventDefault()
        console.log(user)
        console.log(props.sessionLength);
        addDoc(collection(db, "sessions"), {
            id: user.email,
            // passing this value in from Timer2.jsx
            sessionLength: props.sessionLength,
            // every time someone joins, just add 1 to users field
            users: userNumber,
            // we are tracking the time that a session is created
            sessionStart: getDate(),
            startingTime: initializeStartingTime,
            countdown: 99 // hardcoded for now, needs to update
        }).then(function (docRef) {
            //.then is same as await
            console.log("Document written with ID: ", docRef.id);
            return docRef;
            // https://stackoverflow.com/questions/70137841/firebaseerror-expected-type-ia-but-it-was-a-custom-oa-object 
        }).then(d => {
            const getData = async () => {
                setfbKey(d.id);
                const docRef = doc(db, "sessions", d.id);
                // https://dev.to/hirajatamil/firebase-9-firestore-get-a-document-by-id-using-getdoc-3j4f 
                const docSnap = await getDoc(d);

                console.log(docSnap.data());
                const s = docSnap.data();

                setTime(s.countdown);
            }

            getData();
        })

        console.log(user.email)
        alert(`Your session ID is: ${user.email}`)

    }

    useEffect(() => {
        console.log('info', fbKey)
    }, [fbKey])

    /**
     * A function that gets called when the joinSesion button is clicked.
     * Should allow a user to join a session given its unique ID 
     * @param {*} e 
     */
    function joinSession(e) {
        // e.preventDefault();
        // updateDoc(doc(db, "sessions", user.email), {
        //     id: user.email,
        //     sessionLength: 30, 
        //     users: userNumber,
        // })
        // set the key to the value of the input
        setfbKey(joinValue);
        console.log(fbKey);
    }


    /**
     * The following is for testing + making connection to Firebase
     */
    function TestTimer({ value, timeHandler }) {
        return <Box border="solid 1px black">
            <Box>{value}</Box>
            <button onClick={() => timeHandler()}>Start Timer</button>
        </Box>
    }

    /**
     * A handler that stores and decrements the timer countdown in firebase
     * This should in theory allow any user to connect to a session given its unique
     * auto-generated ID, and get the value of seconds left on the timer which is 
     * continuously updated as timer counts down 
     * 
     * @param {*} value 
     */
    const timeHandler = (value) => {
        console.log('click time handler',);
        // getting a reference to our database with the unique code to a session document
        const docRef = doc(db, "sessions", fbKey);

        let timeleft = value;
        let downloadTimer = setInterval(function () {
            if (timeleft <= 0) {
                clearInterval(downloadTimer) //this ends the timer
            }

            const data = {
                id: user.email,
                countdown: timeleft
            };
            
            setTestTime(timeleft);

            // https://softauthor.com/firebase-cloud-firestore-update-document-data/ 
            setDoc(docRef, data).then(docRef => {
                console.log("Entire Document has been updated successfully");
            }).catch(error => {
                console.log(error);
            })

            // decrements time which is stored to firebase
            timeleft -= 1;
            // the rate at which the document is updated in firestore
        }, 100); 
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
            <Input placeholder='Enter Session ID' size='md' value={joinValue} onChange={handleInputSession}/>
            <Button colorScheme='facebook' size='md' onClick={joinSession}> Join Session </Button> 
            </HStack>
    </VStack>
    </Box>
    <Box p='10'>
        <Center>
            <Timer2 />
            <TestTimer timeHandler={timeHandler} value={testTime}/>
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