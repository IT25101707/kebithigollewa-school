// Fallback data — used automatically when the backend API is not running,
// so the public website works even without MySQL. Replace freely.
const img = (id, w = 900) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`

export const NOTICES = [
  { id: 1, text: 'Term II examinations begin on 27 July — timetables are now in Downloads.' },
  { id: 2, text: 'Inter-house Athletics Meet: 8–9 August at the main grounds.' },
  { id: 3, text: 'Grade 1 admissions for 2027 open on 1 August.' },
  { id: 4, text: 'Prefects’ Investiture Ceremony — 15 August, Main Hall, 9.00 a.m.' },
  { id: 5, text: 'Science Society exhibition “Vidya 2026” — visitors welcome 22 August.' }
]

export const NEWS = [
  { id: 1, category: 'Achievements', date: '2026-07-02', title: 'Chess team crowned All-Island Champions', excerpt: 'Our senior chess team brought home the national trophy for the third consecutive year, defeating 42 schools.', image: img('photo-1529699211952-734e80c4d42b') },
  { id: 2, category: 'Academics', date: '2026-06-20', title: 'A/L 2025 results: 94% university eligibility', excerpt: 'The Physical Science stream recorded its best results in a decade with 11 district ranks.', image: img('photo-1523050854058-8df90110c9f1') },
  { id: 3, category: 'Events', date: '2026-06-05', title: 'Vesak lantern festival lights up the campus', excerpt: 'Students from every grade crafted over 300 lanterns for the annual Vesak celebration.', image: img('photo-1509027572446-af8401acfdc3') },
  { id: 4, category: 'Sports', date: '2026-05-28', title: 'Under-17 cricket team wins zonal tournament', excerpt: 'A thrilling last-over finish sealed the zonal title at the district grounds.', image: img('photo-1531415074968-036ba1b575da') },
  { id: 5, category: 'Culture', date: '2026-05-12', title: 'Oriental orchestra performs at national festival', excerpt: 'Our senior orchestra was selected to perform at the State Music Festival.', image: img('photo-1465847899084-d164df4dedc6') },
  { id: 6, category: 'Service', date: '2026-04-30', title: 'Interact Club completes rural library project', excerpt: 'Over 2,000 books were donated and a reading room built for a school in Monaragala.', image: img('photo-1481627834876-b7833e8f5570') }
]

export const EVENTS = [
  { id: 1, date: '2026-07-27', title: 'Term II Examinations', location: 'All halls', time: '8.00 a.m.', tag: 'Academic' },
  { id: 2, date: '2026-08-08', title: 'Inter-House Athletics Meet', location: 'Main Grounds', time: '7.30 a.m.', tag: 'Sports' },
  { id: 3, date: '2026-08-15', title: 'Prefects’ Investiture', location: 'Main Hall', time: '9.00 a.m.', tag: 'Ceremony' },
  { id: 4, date: '2026-08-22', title: 'Vidya 2026 Science Exhibition', location: 'Science Block', time: '9.00 a.m. – 4.00 p.m.', tag: 'Exhibition' },
  { id: 5, date: '2026-09-05', title: 'Annual Prize Giving', location: 'Main Hall', time: '3.00 p.m.', tag: 'Ceremony' },
  { id: 6, date: '2026-09-18', title: 'Cultural Day & Talent Show', location: 'Open-Air Theatre', time: '10.00 a.m.', tag: 'Culture' }
]

export const TIMELINE = [
  { year: 1942, title: 'Foundation', text: 'Founded with 64 students and 3 teachers under a single hall, guided by a vision of free, values-based education.' },
  { year: 1958, title: 'The Main Hall', text: 'The iconic Main Hall was opened, still the heart of every assembly, concert and prize giving.' },
  { year: 1976, title: 'National School status', text: 'Elevated to National School status in recognition of academic excellence.' },
  { year: 1994, title: 'Science & Technology wing', text: 'New laboratories and the computer centre opened the door to modern STEM education.' },
  { year: 2010, title: 'Sporting golden era', text: 'National titles in cricket, athletics and chess established the school as an all-round powerhouse.' },
  { year: 2024, title: 'Smart campus', text: 'Digital classrooms, the online results portal and this website — learning without walls.' }
]

export const GALLERY = [
  { id: 1, album: 'Sports Meet 2026', type: 'image', src: img('photo-1461896836934-ffe607ba8211'), title: 'Opening sprint' },
  { id: 2, album: 'Sports Meet 2026', type: 'image', src: img('photo-1552674605-db6ffd4facb5'), title: 'Relay finals' },
  { id: 3, album: 'Prize Giving 2025', type: 'image', src: img('photo-1523580494863-6f3031224c94'), title: 'Award ceremony' },
  { id: 4, album: 'Prize Giving 2025', type: 'image', src: img('photo-1541339907198-e08756dedf3f'), title: 'Graduates' },
  { id: 5, album: 'Cultural Events', type: 'image', src: img('photo-1514525253161-7a46d19cd819'), title: 'Kandyan dance' },
  { id: 6, album: 'Cultural Events', type: 'image', src: img('photo-1465847899084-d164df4dedc6'), title: 'Orchestra night' },
  { id: 7, album: 'Campus Life', type: 'image', src: img('photo-1580582932707-520aed937b7b'), title: 'Morning assembly' },
  { id: 8, album: 'Campus Life', type: 'image', src: img('photo-1503676260728-1c00da094a0b'), title: 'Library hours' },
  { id: 9, album: 'Campus Life', type: 'image', src: img('photo-1509062522246-3755977927d7'), title: 'Classroom' },
  { id: 10, album: 'Sports Meet 2026', type: 'image', src: img('photo-1571902943202-507ec2618e8f'), title: 'House cheering' },
  { id: 11, album: 'Science Exhibition', type: 'image', src: img('photo-1532094349884-543bc11b234d'), title: 'Chemistry demo' },
  { id: 12, album: 'Science Exhibition', type: 'image', src: img('photo-1567168544646-208fa5d408fb'), title: 'Robotics stall' },
  { id: 13, album: 'Videos', type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ', title: 'School documentary 2026' },
  { id: 14, album: 'Videos', type: 'video', src: 'https://www.youtube.com/embed/ysz5S6PUM-U', title: 'Sports meet highlights' }
]

export const CLUBS = [
  { name: 'Science Society', members: 240, desc: 'Exhibitions, olympiads and the annual Vidya fair.', icon: 'FlaskConical' },
  { name: 'Debating & Oratory', members: 120, desc: 'All-island debating champions, English & Sinhala.', icon: 'Mic' },
  { name: 'Interact Club', members: 180, desc: 'Community service, rural library projects, blood drives.', icon: 'HeartHandshake' },
  { name: 'Media Unit', members: 90, desc: 'School broadcasts, event coverage and the annual magazine.', icon: 'Camera' },
  { name: 'Robotics & ICT', members: 150, desc: 'National robotics competitions and coding bootcamps.', icon: 'Cpu' },
  { name: 'Oriental Orchestra', members: 110, desc: 'Traditional music, state festival performers.', icon: 'Music' },
  { name: 'Scouts & Cadets', members: 200, desc: 'Leadership, camping and national parades.', icon: 'Compass' },
  { name: 'Art & Drama Circle', members: 130, desc: 'Stage plays, murals and inter-school drama festivals.', icon: 'Palette' }
]

export const SPORTS = [
  { name: 'Cricket', img: img('photo-1531415074968-036ba1b575da'), honours: 'Zonal Champions 2026' },
  { name: 'Athletics', img: img('photo-1461896836934-ffe607ba8211'), honours: '14 national colours' },
  { name: 'Chess', img: img('photo-1529699211952-734e80c4d42b'), honours: 'All-Island Champions ×3' },
  { name: 'Basketball', img: img('photo-1546519638-68e109498ffc'), honours: 'District runners-up' },
  { name: 'Swimming', img: img('photo-1530549387789-4c1017266635'), honours: '6 national medals' },
  { name: 'Volleyball', img: img('photo-1592656094267-764a45160876'), honours: 'Zonal Champions' }
]

export const TEACHERS = [
  { name: 'Mr. R. Perera', subject: 'Mathematics', grade: 'A/L', photo: img('photo-1560250097-0b93528c311a', 400) },
  { name: 'Mrs. S. Fernando', subject: 'Physics', grade: 'A/L', photo: img('photo-1573496359142-b8d87734a5a2', 400) },
  { name: 'Mr. T. Jayasuriya', subject: 'English', grade: 'O/L', photo: img('photo-1472099645785-5658abf4ff4e', 400) },
  { name: 'Ms. N. Wickramasinghe', subject: 'Chemistry', grade: 'A/L', photo: img('photo-1580489944761-15a19d654956', 400) },
  { name: 'Mr. D. Silva', subject: 'ICT', grade: 'O/L & A/L', photo: img('photo-1519085360753-af0119f7cbe7', 400) },
  { name: 'Mrs. P. Gunawardena', subject: 'Sinhala', grade: 'All grades', photo: img('photo-1438761681033-6461ffad8d80', 400) }
]

export const DOWNLOADS = [
  { id: 1, category: 'Admissions', name: 'Grade 1 Admission Form 2027', size: '420 KB', type: 'PDF' },
  { id: 2, category: 'Admissions', name: 'Grade 6 Scholarship Intake Form', size: '380 KB', type: 'PDF' },
  { id: 3, category: 'Timetables', name: 'Term II Timetable — Grades 6–11', size: '1.2 MB', type: 'PDF' },
  { id: 4, category: 'Timetables', name: 'A/L Section Timetable 2026', size: '860 KB', type: 'PDF' },
  { id: 5, category: 'Term Test Papers', name: 'Grade 10 Mathematics — Term I 2026', size: '2.1 MB', type: 'PDF' },
  { id: 6, category: 'Term Test Papers', name: 'Grade 11 Science — Term I 2026', size: '1.8 MB', type: 'PDF' },
  { id: 7, category: 'School Letters', name: 'Leave Application Format', size: '120 KB', type: 'DOCX' },
  { id: 8, category: 'School Letters', name: 'Character Certificate Request', size: '96 KB', type: 'PDF' },
  { id: 9, category: 'Assignments', name: 'Grade 9 History Assignment — August', size: '540 KB', type: 'PDF' }
]

export const STREAMS = [
  { grade: 'Primary (Grades 1–5)', desc: 'Foundation years built on activity-based learning, values and joy.', subjects: ['Sinhala / Tamil', 'English', 'Mathematics', 'Environment Studies', 'Religion', 'Aesthetics'] },
  { grade: 'Junior Secondary (Grades 6–9)', desc: 'A broad curriculum that discovers each child’s strengths.', subjects: ['Mathematics', 'Science', 'English', 'History', 'Geography', 'ICT', 'Health & PE', 'Aesthetics', 'Second Language'] },
  { grade: 'O/L Section (Grades 10–11)', desc: 'Focused preparation for the G.C.E. Ordinary Level examination.', subjects: ['Mathematics', 'Science', 'English', 'Sinhala', 'History', 'Religion', '3 Optional Subjects'] },
  { grade: 'A/L — Physical Science', desc: 'Combined Maths, Physics, Chemistry / ICT.', subjects: ['Combined Mathematics', 'Physics', 'Chemistry', 'ICT'] },
  { grade: 'A/L — Biological Science', desc: 'Biology, Physics and Chemistry for medicine & life sciences.', subjects: ['Biology', 'Physics', 'Chemistry', 'Agriculture'] },
  { grade: 'A/L — Commerce', desc: 'Accounting, Business Studies and Economics.', subjects: ['Accounting', 'Business Studies', 'Economics', 'ICT'] },
  { grade: 'A/L — Arts', desc: 'Languages, humanities and social sciences.', subjects: ['Sinhala', 'Political Science', 'Geography', 'Media', 'Logic', 'Languages'] },
  { grade: 'A/L — Technology', desc: 'Engineering & Bio-systems Technology streams.', subjects: ['Engineering Technology', 'Science for Technology', 'ICT'] }
]

export const ACADEMIC_CALENDAR = [
  { term: 'Term I', period: 'January – April', highlights: ['New admissions week', 'Term I tests (March)', 'Sinhala & Tamil New Year break'] },
  { term: 'Term II', period: 'May – August', highlights: ['Vesak celebrations', 'Term II examinations (July)', 'Inter-house sports meet'] },
  { term: 'Term III', period: 'September – December', highlights: ['Prize Giving', 'Term III examinations', 'Christmas & year-end concert'] }
]

export const PREFECTS = [
  { role: 'Head Prefect', name: 'K. Dilshan Perera', house: 'Gamunu' },
  { role: 'Deputy Head Prefect', name: 'S. Amaya Fernando', house: 'Parakrama' },
  { role: 'Senior Prefect', name: 'M. Ravindu Silva', house: 'Vijaya' },
  { role: 'Senior Prefect', name: 'T. Sanduni Herath', house: 'Tissa' }
]

export const ADMIN_TEAM = [
  { name: 'Mrs. K. A. D. Senanayake', role: 'Principal' },
  { name: 'Mr. H. W. Bandara', role: 'Deputy Principal — Academic' },
  { name: 'Mrs. L. Ratnayake', role: 'Deputy Principal — Administration' },
  { name: 'Mr. C. Weerasinghe', role: 'Sectional Head — Primary' },
  { name: 'Mrs. A. Dias', role: 'Sectional Head — O/L' },
  { name: 'Mr. G. Kumara', role: 'Sectional Head — A/L' }
]
