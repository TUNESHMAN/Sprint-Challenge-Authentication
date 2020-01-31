const db = require('../database/dbConfig')
const Jokes = require('./jokes-model')

beforeEach(async () => {
  await db('jokes').truncate()
})

describe('Jokes model', () => {
  describe('insert()', () => {
    it('inserts the correct number of jokes', async () => {
      // setup
      await Jokes.insert({ joke: 'Not a dry joke' })
      await Jokes.insert({ joke: 'Hmmn' })
      const movies = await db('jokes')
      // assertion
      expect(jokes).toHaveLength(2)
    })

    it('inserts the jokes without breaking them', async () => {
      const joke = await Jokes.insert({ name: 'Hmmn' })
      expect(joke).toMatchObject({ joke: 'Hmmn' })
    })

    it('can find a joke in the db', async () => {
      // first we need a movie actually there
      // remember the db gets truncated after each test
      // don't entangle yourself with other model functions
      await db('jokes').insert({ name: 'Hmmn' })
      const Hmmn = await Jokes.findById(1)
      expect(Hmmn).toMatchObject({ joke: 'Hmmn' })
    })
  })
})
