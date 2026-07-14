const router = require('express').Router()
const pool = require('../config/db')
const { authenticate, requireRole } = require('../middleware/auth')

const toGrade = (m) => (m >= 75 ? 'A' : m >= 65 ? 'B' : m >= 50 ? 'C' : m >= 35 ? 'S' : 'W')

// GET /api/marks/me — signed-in student's marks
router.get('/me', authenticate, requireRole('student'), async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT m.subject, m.term, m.marks FROM marks m
       JOIN students s ON s.id = m.student_id
       WHERE s.user_id = ? ORDER BY m.term, m.subject`, [req.user.id])
    res.json(rows.map(r => ({ ...r, grade: toGrade(r.marks) })))
  } catch (e) { next(e) }
})

// POST /api/marks — teacher enters/updates a mark
router.post('/', authenticate, requireRole('teacher', 'admin'), async (req, res, next) => {
  try {
    const { studentId, subject, term, marks } = req.body
    if (!studentId || !subject || !term || marks == null) {
      return res.status(400).json({ message: 'studentId, subject, term and marks are required.' })
    }
    await pool.query(
      `INSERT INTO marks (student_id, subject, term, marks, entered_by)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE marks = VALUES(marks), entered_by = VALUES(entered_by)`,
      [studentId, subject, term, marks, req.user.id])
    res.status(201).json({ ok: true })
  } catch (e) { next(e) }
})

module.exports = router
