const router = require('express').Router()
const pool = require('../config/db')
const { authenticate, requireRole } = require('../middleware/auth')

router.get('/', async (_req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM downloads ORDER BY category, name')
    res.json(rows)
  } catch (e) { next(e) }
})


router.post('/', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const { category, name, size, type, file_url } = req.body
    const [r] = await pool.query('INSERT INTO downloads (category, name, size, type, file_url) VALUES (?, ?, ?, ?, ?)', [category, name, size, type, file_url])
    res.status(201).json({ id: r.insertId })
  } catch (e) { next(e) }
})

router.put('/:id', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const { category, name, size, type, file_url } = req.body
    await pool.query('UPDATE downloads SET category=?, name=?, size=?, type=?, file_url=? WHERE id=?', [category, name, size, type, file_url, req.params.id])
    res.json({ ok: true })
  } catch (e) { next(e) }
})

router.delete('/:id', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    await pool.query('DELETE FROM downloads WHERE id=?', [req.params.id])
    res.json({ ok: true })
  } catch (e) { next(e) }
})

module.exports = router
