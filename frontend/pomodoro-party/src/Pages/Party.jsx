import Timer from "../Timer";
import Navbar from '../Navbar';
import { useEffect, useState, useRef } from "react";
import { Box, Center, HStack, VStack, Button, Input, Flex } from "@chakra-ui/react"
import { useControllableProp, useControllableState } from '@chakra-ui/react'
import {
    addDoc,
    collection,
    updateDoc,
    docs,
    doc,
    getDocs,
    setDoc,
    getDoc,
    onSnapshot,
    query,
    where
} from "firebase/firestore";
import { db, auth } from "../Login/firebase.js"
import { onAuthStateChanged } from "firebase/auth";
import Todo2 from "../Todo/TodoContainer";
import Timer2 from "../Timer2";

export default function Party(props) {

    // const [time, setTime] = useControllableState({ defaultValue: 25})
    // const[time, setTime] = useState(15);
    const [session, setSession] = useControllableState({ defaultValue: null })
    const [user, setUser] = useState();
    // for number of users per session, default is 1 
    const [userNumber, setUserNumber] = useState(1);
    // collection reference to database
    const colref = collection(db, "sessions");

    /**
     * for connection setup
     */
    const [testTime, setTestTime] = useState(0);
    const [fbKey, setfbKey] = useState('');
    // used for "join session", joinValue is the unique session identifier
    const [joinValue, setJoinValue] = useState("");


    /**
     * This function uses a user's email to find the autogenerated ID for each session.
     * 
     * @param userEmail -  the email account that the user registers with
     * @param callback - a function that substitutes/sets the unique ID to user email
     */
    async function getfbKeyWithEmail(userEmail, callback) {
        // create query object https://firebase.google.com/docs/firestore/query-data/queries#simple_queries 
        const q = query(collection(db, "sessions"), where("id", "==", userEmail));
        // executing a query https://firebase.google.com/docs/firestore/query-data/queries#execute_a_query 
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots 
            if (doc.data().id == userEmail) {
                // callback function on uniquely autogenerated ID
                callback(doc.id)
            }
        });
    }

    // just to check whether someone is logged in 
    useEffect(() => {
        // user always has unique session ID 
        // this auto logs in and creates a session 
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log("signed in");
                setUser(user);
                console.log(user);
                // here we pass in the callback function which sets the fbKey to email
                getfbKeyWithEmail(user.email, (id) => {
                    setfbKey(id);
                });
            } else {
                console.log("not signed in")
            }
        })
    }, [])

    /**
     * This function allows us to get a timestamp of the current time
     * @returns timestamp
     */
    function getDate() {
        let d = new Date();
        d.toLocaleString();
        return d;
    }

    const initializeStartingTime = getDate();

    /**
     * Handles changes related to the "Join Session" input box. 
     * Should set the joinValue to whatever the user inputs 
     * @param {*} event - userEvent
     */
    const handleInputSession = event => {
        setJoinValue(event.target.value);
    }

    /**
     * stores a session created by a user to firestore, and also creates an alert
     * to the user providing their email (session ID) 
     * This is for users that hven't created a session before
     * Old users can't create a session, this is to make it so that sessions
     * are easier to find and join and that firebase isn't populated with 
     * multiple documents of the same session 
     * @param {*} e - user event 
     */
    function createSession(e) {
        // prevents page from refreshing 
        e.preventDefault()
        console.log(user)
        console.log(props.sessionLength);

        addDoc(collection(db, "sessions"), {
            id: user.email,
            // hardcoding this for now
            sessionLength: 10000,
            // every time someone joins, just add 1 to users field
            users: userNumber,
            // we are tracking the time that a session is created
            sessionStart: getDate(),
            startingTime: initializeStartingTime,
            // after waiting for the doc to be added to database
        }).then(function (docRef) {
            return docRef;
            // https://stackoverflow.com/questions/70137841/firebaseerror-expected-type-ia-but-it-was-a-custom-oa-object
            // using the returned docRef to set unique autogenerated ID 
        }).then(d => {
            setfbKey(d.id); // if the user hasn't logged in before (new user)
        })
    }

    /**
     * A function that gets called when the joinSesion button is clicked.
     * Should allow a user to join a session given an email. 
     * Essentially allows the joining user to get the timer from another user's 
     * account in order to be in sync with them. 
     * https://firebase.google.com/docs/firestore/query-data/listen 
     * @param {*} e - user event
     */
    function joinSession(e) {
        getfbKeyWithEmail(joinValue, (id) => {
            console.log('catch', joinValue, id)
            // snapshots listens and gets called everytime firebase updates
            onSnapshot(doc(db, "sessions", id), (doc) => {
                // setTestTime updates the time on party page
                setTestTime(doc.data().countdown);
            });
        });
    }


    /**
     * The following timer was adapted from Timer and Timer2
     * @param timeValue - value of useState timeValue, helps assign initial value of timer
     * @param timeHandler - allows us to perform functions when start button is clicked
     */
    function FinalTimer({ timeValue, timeHandler }) {
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

        function addTime(v) {
            setTestTime(testTime + v);
        }

        return <Box>
            <Box fontSize="700%" color={"white"} fontWeight={"bold"}>
                {`${Math.floor(timeValue / 60) < 10
                    ? `0${Math.floor(timeValue / 60)}`
                    : `${Math.floor(timeValue / 60)}`
                    }:${timeValue % 60 < 10 ? `0${timeValue % 60}` : timeValue % 60}`}
            </Box>
            <Button
                width="7rem"
                background="pink"
                color="white"
                onClick={() => timeHandler()}
            >
                Start
            </Button>
            <Flex marginTop={10}>
                {/* Timer Options */}
                {buttons.map(({ value, display }) => (
                    <Button
                        marginX={4}
                        background="blue.300"
                        color="white"
                        onClick={() => {
                            setTestTime(value);
                        }}
                    >
                        {display}
                    </Button>
                ))}
            </Flex> 

        </Box>
    }

    /**
     * A handler that stores and decrements the timer countdown in firebase
     * This should in theory allow any user to connect to a session given its unique
     * auto-generated ID, and get the value of seconds left on the timer which is 
     * continuously updated as timer counts down 
     * 
     */
    const timeHandler = () => {
        // getting a reference to our database with the unique code to a session document
        const docRef = doc(db, "sessions", fbKey);

        let timeleft = testTime;
        // https://stackoverflow.com/questions/2964185/call-an-anonymous-function-defined-in-a-setinterval 
        let downloadTimer = setInterval(function() {
            if (timeleft <= 0) {
                clearInterval(downloadTimer) // this ends the timer
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
            // the rate at which the document is updated in firestore in ms
        }, 1000);
    }

    const pauseHandler = (downloadTimer) => {
        //we need to set downloadTimer as a global variable
        clearInterval(downloadTimer) //this ends the timer
    }

    /**
     * This function copies the text to someone's clipboard
     * https://www.w3schools.com/howto/howto_js_copy_clipboard.asp 
     * @param {*} copyTextValue - the input text to be copied 
     */
    function copyText(copyTextValue) {
        navigator.clipboard.writeText(copyTextValue);
    }

    return (
        <div>
            <Navbar />
            <Box p='30'>
                <VStack spacing={4}>
                    <Box>
                        {/* if logged in, Create Session button is hidden  */}
                        {fbKey == '' ? <><Box>Please create or join a session</Box>
                            <Button colorScheme='facebook' size='md' onClick={createSession}>Create a Session</Button></>
                            : <Box><Button
                                colorScheme='facebook' size='md'
                                onClick={() => copyText(fbKey)}>Copy your session id: {fbKey}</Button></Box>}
                    </Box>
                    <HStack width={"500px"}>
                        <Input w={"300px"} placeholder='Enter Session ID' size='md' value={joinValue} onChange={handleInputSession} />
                        <Button colorScheme='facebook' size='md' onClick={joinSession}> Join Session with Email </Button>

                    </HStack>
                </VStack>
            </Box>
            <Box p='10'>
                <Center>
                    {/* <Timer2 /> */}
                    <FinalTimer timeHandler={timeHandler} timeValue={testTime} />
                    {/* <TestTimer timeHandler={timeHandler} value={testTime}/> */}
                    {/* <Timer minutes={time} width={"488.95px"} height={"473.22px"} left={"457px"} top={"300px"} background={"#EBE5F5"} />  */}
                </Center>
            </Box>
            {/* <Todo/> */}
            <Box position="absolute" top="100px" width="320px" minHeight="368px" left="16px"
                background="#f5fbff" p="15px" pb="50px" borderRadius='lg' padding="20px">
                <Todo2 />
            </Box>
            <Box p='60'>
            </Box>

        </div>);

}