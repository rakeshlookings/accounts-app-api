require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const ENV = process.env

const app = express({ strict: true })

let connectionUrl = 'mongodb+srv://username:password@database.faufozt.mongodb.net/?retryWrites=true&w=majority'
const connectionValues = {
  username: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME
};
connectionUrl = connectionUrl.replace(/\b(?:username|password|database)\b/gi, matched => connectionValues[matched]);

mongoose.connect(connectionUrl, { useNewUrlParser: true })
const con = mongoose.connection

con.on('open', async () => {
  console.log('connected...')
})


app.use(express.json())

app.get('./', (req,res)=> {
  res.send("started")
 })

const indexRouter = require('./src/routes/index.router')

app.use('/api/v1', indexRouter)

module.exports = app;