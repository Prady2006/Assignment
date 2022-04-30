require('dotenv').config()

require("./config/db_connection")

const port = process.env.PORT || 3000


const express = require('express')
const app = express()

const router = require('./routes')


app.use(express.json())

app.use(router)


app.listen(port , function(err) {
    if(err){
        console.log(new Error(`Error in starting server ${err}`))
    }
    console.log('Chat Log Server started on port ', port )
})