const router = require('express').Router()
const pool = require('../config/db')
const { authenticate, requireRole } = require('../middleware/auth')

// GET /api/students?grade=10-A  (teachers & admin)
router.get('/', authenticate, requireRole('teacher', 'admin'), async (req, res, next) => {
  try {
    const { grade } = req.query
    const sql = grade
      ? 'SELECT id, full_name AS name, admission_no, grade FROM students WHERE grade = ? ORDER BY full_name'
      : 'SELECT id, full_name AS name, admission_no, grade FROM students ORDER BY grade, full_name'
    const [rows] = await pool.query(sql, grade ? [grade] : [])
    res.json(rows)
  } catch (e) { next(e) }
})

module.exports = router
