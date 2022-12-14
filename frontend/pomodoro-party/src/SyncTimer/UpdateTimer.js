import React, { useState, useEffect } from 'react';
import firebase, {database} from '../Login/firebase';
import { ref, set } from 'firebase/database';
import { writeFakeData } from '../Login/firebase';


// // create reference to realtime database
// const reference = ref(database, "timer");

// // function that updates timer in realtime database
// function updateTimer(startTime, duration) {
//   set(reference, {
//     start_time: startTime,
//     timer_length: duration
//   })
// }

// // function that updates timer in realtime database
// set(reference, {
//     test: "does this update",
// });


// Listener for changes to the timer value in the Realtime Database
//     Update the timer in your Javascript code to reflect the new value
console.log("hello")
writeFakeData("5", "10");
