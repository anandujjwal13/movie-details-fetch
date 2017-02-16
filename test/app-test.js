const request = require("request");
const chai = require('chai')
const expect = chai.expect

describe(('get request when movie/:moviename is passed '), function () {

  const options = {
    method: 'GET',
    url: 'http://localhost:8080/movie/Movie%204',
    headers:
    {
      'postman-token': '8d9e9686-08e1-6ce4-549a-a04717c2415c',
      'cache-control': 'no-cache'
    }
  }
  const sample1 = {
    moviename: "Movie 4",
    releasedate: "Jan-01-2015",
    actors: [],
    studio: "dreamworks"
  }
  it('Should return movie object ', function (done) {
    request(options, function (error, response, body) {
      if (error) throw new Error(error)
      expect(JSON.parse(body)).to.eqls(sample1)
      done()
    })
  })
})



describe(('fetch request to load the database '), function () {
  var options = {
    method: 'GET',
    url: 'http://localhost:8080/fetch',
    headers:
    {
      'postman-token': '4fd49d11-56f6-473f-9d9d-980f234f7438',
      'cache-control': 'no-cache'
    }
  }

  it('Should return success if fetched', function (done) {
    this.timeout(5000)
    request(options, function (error, response, body) {
      if (error) throw new Error(error)
      expect(body).to.eqls("Successfully done")
      done()
    })
  })
})
