const router = require('express').Router()
const pool = require('../config/db')
const { authenticate, requireRole } = require('../middleware/auth')

router.get('/stats', authenticate, requireRole('admin'), async (_req, res, next) => {
  try {
    const [[{ students }]] = await pool.query('SELECT COUNT(*) AS students FROM students')
    const [[{ teachers }]] = await pool.query("SELECT COUNT(*) AS teachers FROM users WHERE role = 'teacher'")
    res.json({ students, teachers })
  } catch (e) { next(e) }
})

module.exports = router
