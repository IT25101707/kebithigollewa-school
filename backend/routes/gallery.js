const router = require('express').Router()
const pool = require('../config/db')
const { authenticate, requireRole } = require('../middleware/auth')

router.get('/', async (_req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM gallery ORDER BY id DESC')
    res.json(rows)
  } catch (e) { next(e) }
})


router.post('/', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const { album, type, src, title } = req.body
    const [r] = await pool.query('INSERT INTO gallery (album, type, src, title) VALUES (?, ?, ?, ?)', [album, type, src, title])
    res.status(201).json({ id: r.insertId })
  } catch (e) { next(e) }
})

router.put('/:id', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const { album, type, src, title } = req.body
    await pool.query('UPDATE gallery SET album=?, type=?, src=?, title=? WHERE id=?', [album, type, src, title, req.params.id])
    res.json({ ok: true })
  } catch (e) { next(e) }
})

router.delete('/:id', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    await pool.query('DELETE FROM gallery WHERE id=?', [req.params.id])
    res.json({ ok: true })
  } catch (e) { next(e) }
})

module.exports = router
