const router = require('express').Router()
const bcrypt = require('bcryptjs')
const pool = require('../config/db')
const { authenticate, requireRole } = require('../middleware/auth')

router.use(authenticate, requireRole('admin'))

// GET /api/users — list all accounts (never returns password hashes)
router.get('/', async (_req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT u.id, u.username, u.full_name, u.role, u.email, s.grade, s.admission_no
       FROM users u LEFT JOIN students s ON s.user_id = u.id
       ORDER BY u.role, u.username`)
    res.json(rows)
  } catch (e) { next(e) }
})

// POST /api/users — create an account. For students: also pass grade + admissionNo.
// For parents: pass childAdmissionNo to link them to their child.
router.post('/', async (req, res, next) => {
  try {
    const { username, password, fullName, role, email, grade, admissionNo, childAdmissionNo } = req.body
    if (!username || !password || !fullName || !role) {
      return res.status(400).json({ message: 'Username, password, full name and role are required.' })
    }
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters.' })

    const hash = await bcrypt.hash(password, 10)
    const [r] = await pool.query(
      'INSERT INTO users (username, password_hash, full_name, role, email) VALUES (?, ?, ?, ?, ?)',
      [username.trim(), hash, fullName.trim(), role, email || null])

    if (role === 'student') {
      if (!grade || !admissionNo) return res.status(400).json({ message: 'Students need a grade and admission number.' })
      await pool.query('INSERT INTO students (user_id, admission_no, full_name, grade) VALUES (?, ?, ?, ?)',
        [r.insertId, admissionNo, fullName.trim(), grade])
    }
    if (role === 'parent' && childAdmissionNo) {
      const [u] = await pool.query('UPDATE students SET parent_user_id=? WHERE admission_no=?', [r.insertId, childAdmissionNo])
      if (!u.affectedRows) return res.status(400).json({ message: 'Account created, but no student found with that admission number — link it later.' })
    }
    res.status(201).json({ id: r.insertId })
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'That username or admission number is already taken.' })
    next(e)
  }
})

// PUT /api/users/:id/password — admin resets someone's password
router.put('/:id/password', async (req, res, next) => {
  try {
    const { password } = req.body
    if (!password || password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters.' })
    const hash = await bcrypt.hash(password, 10)
    await pool.query('UPDATE users SET password_hash=? WHERE id=?', [hash, req.params.id])
    res.json({ ok: true })
  } catch (e) { next(e) }
})

// DELETE /api/users/:id — cannot delete yourself
router.delete('/:id', async (req, res, next) => {
  try {
    if (Number(req.params.id) === req.user.id) return res.status(400).json({ message: 'You cannot delete your own account.' })
    await pool.query('DELETE FROM users WHERE id=?', [req.params.id])
    res.json({ ok: true })
  } catch (e) { next(e) }
})

module.exports = router
