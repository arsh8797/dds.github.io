 const express = require("express");
const path = require("path");
const app2 = express();
const port = 80;
const bodyparser = require("body-parser");

//   express stuff
app2.use('/static', express.static('static')); //for serving static files
app2.use(express.urlencoded()) //middle ware ,use to get data submitted by form 

//mongoose stuffs
const mongoose = require('mongoose');
const { parse } = require("path");
mongoose.connect('mongodb://localhost/dancecontact', { useNewUrlParser: true, useUnifiedTopology: true });

var contactschema = new mongoose.Schema({
  Name: String,
  address: String,
  more: String,
  contact: String,
});
var Contact = mongoose.model('contact', contactschema);



//  pug specific stuff
app2.set('view engine', 'pug'); //set the templete engine as pug
app2.set('views', path.join(__dirname, 'views')); //set the view directory

//end points
app2.get('/', (req, res) => {
  res.status(200).render('home.pug')
});
app2.get('/contact', (req, res) => {
  res.status(200).render('contact.pug')
});
app2.get('/about', (req, res) => {
  res.status(200).render('about.pug')
});
app2.post('https://www.google.co.in/', (req, res) => {
  res.status(200).render('register.pug')
  var myData = new Contact(req.body)
  myData1.save().then(() => {
    res.send("your form has been submitted")
  }).catch(() => {
    res.status(400).send("form was not submitted")
  })
});

//post request for mongoose to save data as object
app2.post('/contact', (req, res) => {
  var myData = new Contact(req.body)
  myData.save().then(() => {
    res.send("your form has been submitted")
  }).catch(() => {
    res.status(400).send("form was not submitted")
  })
});

//   start the server
app2.listen(port, () => {
  console.log(`this application is started successfully on ${port}`);
});