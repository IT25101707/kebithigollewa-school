const router = require('express').Router()
const pool = require('../config/db')

router.post('/', async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !message) return res.status(400).json({ message: 'Name, email and message are required.' })
    await pool.query(
      'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject || '', message]
    )
    res.status(201).json({ ok: true })
  } catch (e) { next(e) }
})

module.exports = router
