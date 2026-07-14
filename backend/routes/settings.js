const router = require('express').Router()
const pool = require('../config/db')
const { authenticate, requireRole } = require('../middleware/auth')

// GET /api/settings — public; returns the saved school config (or {} if none)
router.get('/', async (_req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT v FROM settings WHERE k = 'school'")
    res.json(rows.length ? JSON.parse(rows[0].v) : {})
  } catch (e) { next(e) }
})

// PUT /api/settings — admin saves the whole school config object
router.put('/', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const v = JSON.stringify(req.body || {})
    await pool.query(
      "INSERT INTO settings (k, v) VALUES ('school', ?) ON DUPLICATE KEY UPDATE v = VALUES(v)", [v])
    res.json({ ok: true })
  } catch (e) { next(e) }
})

module.exports = router
