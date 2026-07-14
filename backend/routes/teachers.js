const router = require('express').Router()
const pool = require('../config/db')
const { authenticate, requireRole } = require('../middleware/auth')

router.get('/', async (_req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM teachers ORDER BY name')
    res.json(rows)
  } catch (e) { next(e) }
})

router.post('/', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const { name, subject, grade, photo } = req.body
    if (!name) return res.status(400).json({ message: 'Name is required.' })
    const [r] = await pool.query('INSERT INTO teachers (name, subject, grade, photo) VALUES (?, ?, ?, ?)',
      [name, subject || '', grade || '', photo || ''])
    res.status(201).json({ id: r.insertId })
  } catch (e) { next(e) }
})

router.put('/:id', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    const { name, subject, grade, photo } = req.body
    await pool.query('UPDATE teachers SET name=?, subject=?, grade=?, photo=? WHERE id=?',
      [name, subject || '', grade || '', photo || '', req.params.id])
    res.json({ ok: true })
  } catch (e) { next(e) }
})

router.delete('/:id', authenticate, requireRole('admin'), async (req, res, next) => {
  try {
    await pool.query('DELETE FROM teachers WHERE id=?', [req.params.id])
    res.json({ ok: true })
  } catch (e) { next(e) }
})

module.exports = router
