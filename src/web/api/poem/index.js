const { Router } = require('express')
const { getPoemByAuthor } = require('../../services/poem')

const router = Router()

router.get('/', async (req, res, next) => {
  const poems = await getPoemByAuthor(req.query.author)

  try {
    res.json(poems)
  } catch (err) {
    next(err)
  }
})

module.exports = router
