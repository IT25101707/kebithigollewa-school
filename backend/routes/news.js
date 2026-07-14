const router = require('express').Router()
const pool = require('../config/db')
const { authenticate, requireRole } = require('../middleware/auth')

router.get('/', async (_req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM news ORDER BY date DESC')
    res.json(rows)
  } catch (e) { next(e) }
})


router.post('/', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const { category, date, title, excerpt, image } = req.body
    const [r] = await pool.query('INSERT INTO news (category, date, title, excerpt, image) VALUES (?, ?, ?, ?, ?)', [category, date, title, excerpt, image])
    res.status(201).json({ id: r.insertId })
  } catch (e) { next(e) }
})

router.put('/:id', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const { category, date, title, excerpt, image } = req.body
    await pool.query('UPDATE news SET category=?, date=?, title=?, excerpt=?, image=? WHERE id=?', [category, date, title, excerpt, image, req.params.id])
    res.json({ ok: true })
  } catch (e) { next(e) }
})

router.delete('/:id', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    await pool.query('DELETE FROM news WHERE id=?', [req.params.id])
    res.json({ ok: true })
  } catch (e) { next(e) }
})

module.exports = router
