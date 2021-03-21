const { Router } = require('express')
const redis = require('../../helpers/redis')

const router = Router()
router.get('/', async (req, res, next) => {
  try {
    const pong = await redis.ping()
    res.json({
      status: 'ok',
      redis: pong === 'pong' ? 'ok' : 'failed'
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
