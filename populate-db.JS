const db = require('./sequelize.js')
const axios = require('axios')


const providers = ['https://movie-api-lyalzcwvbg.now.sh/paramount', 'https://movie-api-lyalzcwvbg.now.sh/dreamworks']
const actorURLS = ['https://movie-api-lyalzcwvbg.now.sh/actors']

const movieStore = {}
const actorStore = []

function getLocalDB() {
  actorStore.forEach(({ actorName, movies }) => {
    movies.forEach((movie) => {
      movieStore[movie].actors.push(actorName)
    })
  })
}

function getProviderPromises() {
  return providers.map((provider) => {
    return new Promise((resolve, reject) => {
      axios.get(provider)
        .then((movies) => {
          movies.data.forEach(({ movieName, releaseDate }) => {
            movieStore[movieName] = { movieName, releaseDate, actors: [], studio: provider.split('/')[3] }
          })
        })
        .then(() => {
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  })
}

function getActorPromises() {
  return actorURLS.map((actorURL) => {
    return new Promise((resolve, reject) => {
      axios.get(actorURL)
        .then((actors) => {
          actors.data.forEach(({ actorName, movies }) => {
            actorStore.push({ actorName, movies })
          })
        })
        .then(() => {
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  })
}

function populateDB() {
  actorStore.splice(0, actorStore.length)
  return Promise.all([...getProviderPromises(), ...getActorPromises()])
    .then(() => {
      getLocalDB()
    })
    .then(() => {
      for (let key in movieStore) {
        let movie = movieStore[key]
        db.insert(movie.movieName, movie.releaseDate, movie.actors, movie.studio)
          .then((result) => {
            console.log(result)
          })
          .catch((err) => {
            console.log(err.errors[0].message)
          })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
module.exports = populateDB