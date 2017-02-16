const Sequelize = require('sequelize')
const dbName = (process.env.mode === 'test') ? 'films-tests' : 'films'
const sequelize = new Sequelize(`postgres://anandujjwal:lifeisawsm@localhost:5432/${dbName}`)


const db = {
  readAllMovies() {
    const query = 'SELECT movieName , releaseDate , actors , studio FROM movies'
    return sequelize.query(query)
  },
  readOneMovie(movieName) {
    const query = 'SELECT movieName , releaseDate , actors , studio FROM movies where movieName = :movieName'
    return sequelize.query(query, { replacements: { movieName: movieName } })
  },
  insert(movieName, releaseDate, actors, studio) {
    const actorsPsql = (actors.length === 0) ? '{}' : `{"${actors.toString().split(',').join('","')}"}`
    let query = 'INSERT INTO movies (movieName , releaseDate , actors , studio) VALUES (:movieName , :releaseDate , :actorsPsql , :studio) returning movieName'
    return sequelize.query(query, { replacements: { movieName: movieName, releaseDate: releaseDate, actorsPsql: actorsPsql, studio: studio } })
  }
}

module.exports = db