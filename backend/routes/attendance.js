const router = require('express').Router()
const pool = require('../config/db')
const { authenticate, requireRole } = require('../middleware/auth')

// GET /api/attendance/me — signed-in student's summary
router.get('/me', authenticate, requireRole('student'), async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT SUM(status = 'present') AS present, COUNT(*) AS total
       FROM attendance a JOIN students s ON s.id = a.student_id
       WHERE s.user_id = ?`, [req.user.id])
    const { present, total } = rows[0]
    res.json({ present: Number(present) || 0, total: Number(total) || 0 })
  } catch (e) { next(e) }
})

// POST /api/attendance — teacher records a day
router.post('/', authenticate, requireRole('teacher', 'admin'), async (req, res, next) => {
  try {
    const { studentId, date, status } = req.body
    if (!studentId || !date || !status) return res.status(400).json({ message: 'studentId, date and status are required.' })
    await pool.query(
      `INSERT INTO attendance (student_id, date, status, marked_by) VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE status = VALUES(status), marked_by = VALUES(marked_by)`,
      [studentId, date, status, req.user.id])
    res.status(201).json({ ok: true })
  } catch (e) { next(e) }
})

module.exports = router
