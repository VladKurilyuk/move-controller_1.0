'use strict'
/* global navigator, document, console */
const webcam = document.getElementById("webcam");

if(navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            webcam.srcObject = stream;
            webcam.play();
        })
        .catch((e) => {
            console.log("Main camera can't be added. " + e);
        })
}