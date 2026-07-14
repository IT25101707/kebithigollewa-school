const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../config/db')
const { authenticate } = require('../middleware/auth')

// POST /api/auth/login  { username, password }
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ message: 'Enter a username and password.' })

    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username])
    const user = rows[0]
    if (!user) return res.status(401).json({ message: 'Invalid username or password.' })

    const ok = await bcrypt.compare(password, user.password_hash)
    if (!ok) return res.status(401).json({ message: 'Invalid username or password.' })

    const payload = { id: user.id, role: user.role, name: user.full_name }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '8h' })
    res.json({ token, user: payload })
  } catch (e) { next(e) }
})


// PUT /api/auth/profile — change your own name / username / password.
// Requires the current password to confirm it's really you.
router.put('/profile', authenticate, async (req, res, next) => {
  try {
    const { currentPassword, newUsername, newPassword, fullName } = req.body
    if (!currentPassword) return res.status(400).json({ message: 'Enter your current password to confirm changes.' })

    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.user.id])
    const user = rows[0]
    if (!user || !(await bcrypt.compare(currentPassword, user.password_hash))) {
      return res.status(401).json({ message: 'Current password is incorrect.' })
    }

    const username = newUsername?.trim() || user.username
    const name = fullName?.trim() || user.full_name
    let hash = user.password_hash
    if (newPassword) {
      if (newPassword.length < 6) return res.status(400).json({ message: 'New password must be at least 6 characters.' })
      hash = await bcrypt.hash(newPassword, 10)
    }
    await pool.query('UPDATE users SET username=?, full_name=?, password_hash=? WHERE id=?',
      [username, name, hash, req.user.id])

    const payload = { id: user.id, role: user.role, name }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '8h' })
    res.json({ token, user: payload })
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'That username is already taken.' })
    next(e)
  }
})

module.exports = router
