const { Router } = require('express')
const { getPoems, getAuthors, getPoemsByAuthor } = require('../../../services/poem')

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const poems = await getPoems(req.query.page)
    res.json(poems)
  } catch (err) {
    next(err)
  }
})

router.get('/authors', async (req, res, next) => {
  try {
    const authors = await getAuthors(req.query.page)
    res.json(authors)
  } catch (err) {
    next(err)
  }
})

router.get('/authors/:authorName', async (req, res, next) => {
  try {
    const poems = await getPoemsByAuthor(decodeURI(req.params.authorName), req.query.page)
    res.json(poems)
  } catch (err) {
    next(err)
  }
})

module.exports = router
