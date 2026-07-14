const router = require('express').Router()
const pool = require('../config/db')
const { authenticate, requireRole } = require('../middleware/auth')

router.get('/', async (_req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT id, text FROM notices ORDER BY created_at DESC LIMIT 12')
    res.json(rows)
  } catch (e) { next(e) }
})

router.post('/', authenticate, requireRole('teacher', 'admin'), async (req, res, next) => {
  try {
    const { text } = req.body
    if (!text?.trim()) return res.status(400).json({ message: 'Notice text is required.' })
    const [r] = await pool.query('INSERT INTO notices (text, created_by) VALUES (?, ?)', [text.trim(), req.user.id])
    res.status(201).json({ id: r.insertId, text })
  } catch (e) { next(e) }
})


router.delete('/:id', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    await pool.query('DELETE FROM notices WHERE id=?', [req.params.id])
    res.json({ ok: true })
  } catch (e) { next(e) }
})

module.exports = router
