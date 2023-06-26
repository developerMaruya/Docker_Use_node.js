const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client")));

const publicVapidKey = "BC2fDFNkRaVbdnplbDy5Q-oPh70eOFg7VWyL_yHrf9GT8B603d0MTd0hpxobxFu8gfzEACIBI-yUmrzENZy9Yac";
const privateVapidKey = "LejTqZivbktFmM6FZPJFjZno0xPqCDdwgByutDjQW2c";

webpush.setVapidDetails(
  "mailto:rambabu.maurya@iphtechnologies.com",
  publicVapidKey,
  privateVapidKey
);


app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({
    title: "Hello World",
    body: "This is your first push notification.",
    icon: "http://image.ibb.co/frYOFd/tmlogo.png" // Specify the correct path to the icon file
  });
  console.log(payload);
  console.log(subscription);
  webpush.sendNotification(subscription, payload).catch(console.log);
});



const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
