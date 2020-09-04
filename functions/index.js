const express = require("express");
const app = express();
const fs = require("fs");

//Firebase
const firebase = require("firebase/app");
const firebaseFunctions = require("firebase-functions");
const firebaseConfig = {
    //Wait Justin open source stuff again?
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

app.listen(8081, () => {
    console.log("App listening on 127.0.0.1:8081");
});