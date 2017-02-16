const express = require('express')
const populateDB = require('./populate-db.js')
const db = require('./sequelize.js')
const app = express()


app.get('/fetch', function(request, response) {
  populateDB().then(() => {
    response.send('Successfully done')
  }).catch((err) => {
    console.log(err)
    response.sendStatus(500)
  })
})

app.get('/movie/:movieName', function(request, response) {
  db.readOneMovie(request.params.movieName).then((result) => {
    response.send(result[0][0])
  }).catch((err) => {
    console.log(err)
  })
})

app.listen(8080, () => {
  console.log('listening at port 8080')
})