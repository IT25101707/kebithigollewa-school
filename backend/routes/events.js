const router = require('express').Router()
const pool = require('../config/db')
const { authenticate, requireRole } = require('../middleware/auth')

router.get('/', async (_req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM events WHERE date >= CURDATE() ORDER BY date ASC')
    res.json(rows)
  } catch (e) { next(e) }
})


router.post('/', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const { date, title, location, time, tag } = req.body
    const [r] = await pool.query('INSERT INTO events (date, title, location, time, tag) VALUES (?, ?, ?, ?, ?)', [date, title, location, time, tag])
    res.status(201).json({ id: r.insertId })
  } catch (e) { next(e) }
})

router.put('/:id', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const { date, title, location, time, tag } = req.body
    await pool.query('UPDATE events SET date=?, title=?, location=?, time=?, tag=? WHERE id=?', [date, title, location, time, tag, req.params.id])
    res.json({ ok: true })
  } catch (e) { next(e) }
})

router.delete('/:id', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    await pool.query('DELETE FROM events WHERE id=?', [req.params.id])
    res.json({ ok: true })
  } catch (e) { next(e) }
})

module.exports = router
