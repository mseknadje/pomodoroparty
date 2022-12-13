import React, { useState, useEffect } from 'react';
import firebase, {firebaseConfig} from '../Login/firebase';

firebase.initializeApp(firebaseConfig);

// create reference to realtime database
let timerRef = firebase.database().ref("timer");

// function that updates timer in realtime database
function updateTimer(value) {
    timerRef.set(value);
  }

// Listener for changes to the timer value in the Realtime Database
    // Update the timer in your Javascript code to reflect the new value