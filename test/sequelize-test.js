const chai = require('chai')
const db = require('../sequelize.js')
const expect = chai.expect

describe('inserts movie in the database ', function () {
  it('should return movie name', function (done) {
    db.insert('Movie 2', 'Oct-01-2015', ["Actor 1", "Actor 3"], 'paramount')
      .then((result) => {
        expect(result[0].moviename).to.be.eqls('Movie 2')
        done()
      })
  })
  it('should return movie name', function (done) {
    db.insert('Movie 3', 'Oct-01-2015', ["Actor 1", "Actor 3"], 'paramount')
      .then((result) => {
        expect(result[0].moviename).to.be.eqls('Movie 3')
        done()
      })
  })
})

describe('inserts movie in the database when that movie is already there', function () {
  it('should return message that moviename must be unique', function (done) {
    db.insert('Movie 2', 'Oct-01-2015', ["Actor 1", "Actor 3"], 'paramount')
      .then((result) => {
        expect(result[0].moviename).to.be.eqls('Movie 2')
        done()
      }).catch((err) => {
        console.log(err.errors[0].message)
        expect(err.errors[0].message).to.be.eqls('moviename must be unique')
        done()
      })
  })
})

describe('fetches one movie when movie name given ', function () {
  it('should return row count of query', function (done) {
    db.readOneMovie('Movie 2')
      .then((result) => {
        // console.log(result[1].rowCount)
        expect(result[1].rowCount).to.be.eqls(1)
        done()
      })
  })
})
