const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { authenticate, requireRole } = require('../middleware/auth')

const dir = path.join(__dirname, '..', 'uploads')
fs.mkdirSync(dir, { recursive: true })

const storage = multer.diskStorage({
  destination: dir,
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_')
    cb(null, Date.now() + '-' + safe)
  }
})
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB
  fileFilter: (_req, file, cb) => {
    const ok = /\.(png|jpe?g|gif|webp|svg|pdf|docx?|xlsx?|pptx?|zip)$/i.test(file.originalname)
    cb(ok ? null : new Error('File type not allowed'), ok)
  }
})

// POST /api/uploads  (form field name: "file") → { url, size }
router.post('/', authenticate, requireRole('admin', 'teacher'), upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file received.' })
  const kb = req.file.size / 1024
  const size = kb > 1024 ? (kb / 1024).toFixed(1) + ' MB' : Math.round(kb) + ' KB'
  res.status(201).json({ url: '/uploads/' + req.file.filename, size })
})

module.exports = router
