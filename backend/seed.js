// Seeds demo users (with properly hashed passwords), students, marks,
// attendance, notices, news, events, gallery and downloads.
// Run once:  npm run seed   (after creating the schema)
const bcrypt = require('bcryptjs')
const pool = require('./config/db')

async function main() {
  const hash = (p) => bcrypt.hash(p, 10)

  console.log('Seeding users…')
  const users = [
    ['admin', await hash('admin123'), 'School Administrator', 'admin'],
    ['teacher1', await hash('teacher123'), 'Mr. R. Perera', 'teacher'],
    ['student1', await hash('student123'), 'K. Dilshan Perera', 'student'],
    ['student2', await hash('student123'), 'S. Amaya Fernando', 'student'],
    ['parent1', await hash('parent123'), 'Mr. K. Perera (Parent)', 'parent']
  ]
  for (const u of users) {
    await pool.query(
      'INSERT INTO users (username, password_hash, full_name, role) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)', u)
  }
  const [[admin]] = await pool.query("SELECT id FROM users WHERE username='admin'")
  const [[teacher]] = await pool.query("SELECT id FROM users WHERE username='teacher1'")
  const [[stu1]] = await pool.query("SELECT id FROM users WHERE username='student1'")
  const [[stu2]] = await pool.query("SELECT id FROM users WHERE username='student2'")
  const [[par1]] = await pool.query("SELECT id FROM users WHERE username='parent1'")

  console.log('Seeding students…')
  const students = [
    [stu1.id, par1.id, 'AV2019/001', 'K. Dilshan Perera', '10-A'],
    [stu2.id, null, 'AV2019/014', 'S. Amaya Fernando', '10-A'],
    [null, null, 'AV2019/027', 'M. Ravindu Silva', '10-A'],
    [null, null, 'AV2019/033', 'T. Sanduni Herath', '10-A'],
    [null, null, 'AV2019/041', 'N. Kavindu Jayalath', '10-A']
  ]
  for (const s of students) {
    await pool.query(
      'INSERT INTO students (user_id, parent_user_id, admission_no, full_name, grade) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE full_name = VALUES(full_name)', s)
  }
  const [[st1]] = await pool.query("SELECT id FROM students WHERE admission_no='AV2019/001'")

  console.log('Seeding marks & attendance for student1…')
  const marks = [['Mathematics', 88], ['Science', 92], ['English', 76], ['Sinhala', 84], ['History', 71], ['ICT', 95]]
  for (const [subject, m] of marks) {
    await pool.query(
      `INSERT INTO marks (student_id, subject, term, marks, entered_by) VALUES (?, ?, 'Term I', ?, ?)
       ON DUPLICATE KEY UPDATE marks = VALUES(marks)`, [st1.id, subject, m, teacher.id])
  }
  for (let i = 0; i < 40; i++) {
    const d = new Date(); d.setDate(d.getDate() - i)
    if (d.getDay() === 0 || d.getDay() === 6) continue
    await pool.query(
      `INSERT INTO attendance (student_id, date, status, marked_by) VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE status = VALUES(status)`,
      [st1.id, d.toISOString().slice(0, 10), i % 9 === 0 ? 'absent' : 'present', teacher.id])
  }

  console.log('Seeding public content…')
  await pool.query('DELETE FROM notices')
  for (const t of [
    'Term II examinations begin on 27 July — timetables are now in Downloads.',
    'Inter-house Athletics Meet: 8–9 August at the main grounds.',
    'Grade 1 admissions for 2027 open on 1 August.',
    'Prefects’ Investiture Ceremony — 15 August, Main Hall, 9.00 a.m.'
  ]) await pool.query('INSERT INTO notices (text, created_by) VALUES (?, ?)', [t, admin.id])

  await pool.query('DELETE FROM events')
  const events = [
    ['2026-07-27', 'Term II Examinations', 'All halls', '8.00 a.m.', 'Academic'],
    ['2026-08-08', 'Inter-House Athletics Meet', 'Main Grounds', '7.30 a.m.', 'Sports'],
    ['2026-08-15', 'Prefects’ Investiture', 'Main Hall', '9.00 a.m.', 'Ceremony'],
    ['2026-09-05', 'Annual Prize Giving', 'Main Hall', '3.00 p.m.', 'Ceremony']
  ]
  for (const e of events) await pool.query('INSERT INTO events (date, title, location, time, tag) VALUES (?, ?, ?, ?, ?)', e)

  await pool.query('DELETE FROM news')
  const news = [
    ['Achievements', '2026-07-02', 'Chess team crowned All-Island Champions',
      'Our senior chess team brought home the national trophy for the third consecutive year.',
      'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=900&q=80'],
    ['Academics', '2026-06-20', 'A/L 2025 results: 94% university eligibility',
      'The Physical Science stream recorded its best results in a decade with 11 district ranks.',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80'],
    ['Sports', '2026-05-28', 'Under-17 cricket team wins zonal tournament',
      'A thrilling last-over finish sealed the zonal title at the district grounds.',
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=900&q=80']
  ]
  for (const n of news) await pool.query('INSERT INTO news (category, date, title, excerpt, image) VALUES (?, ?, ?, ?, ?)', n)

  await pool.query('DELETE FROM downloads')
  const dls = [
    ['Admissions', 'Grade 1 Admission Form 2027', '420 KB', 'PDF'],
    ['Timetables', 'Term II Timetable — Grades 6–11', '1.2 MB', 'PDF'],
    ['Term Test Papers', 'Grade 10 Mathematics — Term I 2026', '2.1 MB', 'PDF'],
    ['School Letters', 'Leave Application Format', '120 KB', 'DOCX']
  ]
  for (const d of dls) await pool.query('INSERT INTO downloads (category, name, size, type) VALUES (?, ?, ?, ?)', d)

  await pool.query('DELETE FROM teachers')
  const teachers = [
    ['Mr. R. Perera', 'Mathematics', 'A/L', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'],
    ['Mrs. S. Fernando', 'Physics', 'A/L', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'],
    ['Mr. T. Jayasuriya', 'English', 'O/L', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80'],
    ['Ms. N. Wickramasinghe', 'Chemistry', 'A/L', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80']
  ]
  for (const t of teachers) await pool.query('INSERT INTO teachers (name, subject, grade, photo) VALUES (?, ?, ?, ?)', t)

  console.log('✅ Seed complete. Demo logins: admin/admin123, teacher1/teacher123, student1/student123, parent1/parent123')
  process.exit(0)
}

main().catch(e => { console.error('Seed failed:', e.message); process.exit(1) })
