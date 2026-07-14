const router = require('express').Router()
const pool = require('../config/db')
const { authenticate, requireRole } = require('../middleware/auth')

const toGrade = (m) => (m >= 75 ? 'A' : m >= 65 ? 'B' : m >= 50 ? 'C' : m >= 35 ? 'S' : 'W')

// GET /api/parents/child — overview for the signed-in parent's child
router.get('/child', authenticate, requireRole('parent'), async (req, res, next) => {
  try {
    const [students] = await pool.query(
      'SELECT id, full_name, grade, admission_no FROM students WHERE parent_user_id = ? LIMIT 1', [req.user.id])
    if (!students.length) return res.status(404).json({ message: 'No student is linked to this parent account.' })
    const child = students[0]

    const [marks] = await pool.query('SELECT subject, marks FROM marks WHERE student_id = ? ORDER BY subject', [child.id])
    const [[att]] = await pool.query(
      `SELECT SUM(status = 'present') AS present, COUNT(*) AS total FROM attendance WHERE student_id = ?`, [child.id])

    res.json({
      child: { name: child.full_name, grade: child.grade, admission_no: child.admission_no },
      attendance: { present: Number(att.present) || 0, total: Number(att.total) || 1 },
      marks: marks.map(m => ({ ...m, grade: toGrade(m.marks) })),
      teacher: { name: 'Class Teacher', subject: `Class teacher — ${child.grade}`, email: process.env.SCHOOL_EMAIL || 'office@school.lk' }
    })
  } catch (e) { next(e) }
})

module.exports = router
