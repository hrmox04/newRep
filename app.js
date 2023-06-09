const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()
const User = require('./models/user')
const bcrypt = require('bcrypt')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const userRouter = require('./routers/user')

const port = 3000;
//app.listen(process.env.PORT)
app.listen(port)
console.log("Starting server on Port 3000")

/* Express Configuration and Setup */
app.use(express.urlencoded({extended:true})); // this middleware is essential for express to parse data coming in from post requests
app.use(express.static(path.join(__dirname,'public'))) //this middleware tells express where to serve static assets from
app.set('views',path.join(__dirname,'views')) // this tells express where to look for templates when using res.render
app.set('view engine','ejs') // this tells express what tempalte engine to use eg. pug,hbs ejs etc.

/* Mongoose 6.10.0 Config and Setup */
mongoURL = process.env.MONGO_URL
//const mongoURL = "mongodb+srv://hrmox:helloworld123@cluster0.yh2f5dg.mongodb.net/auth?retryWrites=true&w=majority"
mongoose.connect(mongoURL,{ useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
    if(err)
        console.log("Could not connect to database",err)
    else
        console.log("Connected to DB..")
})

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: mongoURL
    })
}))

app.use(userRouter)


// function foo(req,res,next){
//     console.log("Hello middleware@!")
//     next()
// }

//app.use(foo)


// Home Route
app.get('/',(req,res)=>{

   res.render('index',{title:'Home'})
    
})



/* Basic 404 response*/
app.get('/*',(req,res)=>{
    res.status(404)
    res.type('txt')
    res.write("Oops, this page does not exist")
    res.send()
})





