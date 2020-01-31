const server = require('./server')
const request = require('supertest')

describe('server.js module', () => {
  it('It is working well', () => {
    expect(process.env.DB_ENV).toBe('testing')
  })

  describe('Interesting Joke', () => {

    it('returns a 200 OK async/await', async () => {
      const res = await request(server).get('/')
      expect(res.status).toBe(200)
    })

    it('returns a 200 OK ES6 promises', () => {
      return request(server).get('/')
        .then(res => {
          // run all the jest matchers you want
          expect(res.status).toBe(200)
          
        })
    })

    it('returns a 200 OK supertest', () => {
      return request(server).get('/')
        .expect(200)
    })

    it('returns the right body', () => {
      return request(server).get('/')
        .expect({ api: 'Interesting Movie' })
    })

    it('returns the right headers', () => {
      // multi-assertion test
      return request(server).get('/')
        .expect('Content-Length', '27')
        .expect('Content-Type', /json/)
    })
  })
})