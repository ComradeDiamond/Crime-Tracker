const express = require("express");
const app = express();
const fs = require("fs");
const api = require("./Routes/API.js");

//Firebase
const firebase = require("firebase/app");
const firebaseFunctions = require("firebase-functions");
const firebaseConfig = {
    apiKey: "AIzaSyD_dHomLB1_BIUMDwYeja7YcDbeaJaa72k",
    authDomain: "nyc-crime-tracker.firebaseapp.com",
    databaseURL: "https://nyc-crime-tracker.firebaseio.com",
    projectId: "nyc-crime-tracker",
    storageBucket: "nyc-crime-tracker.appspot.com",
    messagingSenderId: "709597899921",
    appId: "1:709597899921:web:dffae16a9684eb45402330"
};

app.use((request, response, next) => {
    console.log(`Request for ${request.originalUrl} recieved!`);
    next();
})

app.get("/", (request, response) => {
    response.redirect("../Public/index.html");
})

//Handles all the public js and css requests because express sucks
app.use("/Public", express.static(__dirname.replace("\\functions", "") + "/Public"));

//Redirects to crime stats folder
app.use("/Crime%20Statistics", express.static(__dirname.replace("\\functions", "") + "/Crime Statistics"));

//Redirects to API Route
app.use("/API", api);

app.listen(8081, () => {
    console.log("App listening on 127.0.0.1:8081");
});