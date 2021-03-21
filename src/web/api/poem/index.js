const { Router } = require('express')
const { getPoemsByAuthor } = require('../../../services/poem')

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const poems = await getPoemsByAuthor(req.query.author)
    res.json(poems)
  } catch (err) {
    next(err)
  }
})

module.exports = router
