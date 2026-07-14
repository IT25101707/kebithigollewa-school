// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to personalise the website for your school.
//  Replace the logo: put your file at  frontend/public/logo.png
//  and set  logo: '/logo.png'  below.
// ─────────────────────────────────────────────────────────────
export const SCHOOL = {
  name: 'Kebithigollewa Central College',
  shortName: 'KBGCC',
  motto: 'නොනවතින්න.. පෙරට යන්න..',
  established: 1902,
  logo: '/logo.png',                        // Homepage background slideshow — editable from Admin portal → Site settings
  heroImages: [
    'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1920&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1920&q=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=80&auto=format&fit=crop'
  ],                        // ← replace with '/logo.png' after adding your logo
  address: 'No. 120, Temple Road, Colombo 10, Sri Lanka',
  phone: '+94 11 269 5340',
  email: 'info@anandavidyalaya.lk',
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.86!2d79.8612!3d6.9271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2slk!4v1700000000000',
  social: {
    facebook: 'https://facebook.com/yourschool',
    youtube: 'https://youtube.com/@yourschool',
    instagram: 'https://instagram.com/yourschool',
    whatsapp: 'https://whatsapp.com/channel/yourschool'
  },
  colors: { maroon: '#7A1F2B', gold: '#D4A537' },
  stats: [
    { label: 'Students', value: 3200, suffix: '+' },
    { label: 'Teachers', value: 165, suffix: '+' },
    { label: 'National Achievements', value: 480, suffix: '+' },
    { label: 'Years of Excellence', value: new Date().getFullYear() - 1942, suffix: '' }
  ],
  principal: {
    name: 'Mrs. K. A. D. Senanayake',
    title: 'Principal',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    message2: 'Our teachers do more than deliver lessons; they light lamps. Our students do more than pass examinations; they learn to stand for something. Whether you are a parent choosing a school, an old pupil returning home, or a well-wisher of education — you are most welcome here.',
    message: 'For more than eight decades, our school has stood as a lamp of learning — shaping not just scholars, but citizens of character. Every child who walks through our gates carries the promise of tomorrow, and it is our privilege to nurture that promise with wisdom, discipline and love. I warmly invite you to explore our story, and to become part of it.'
  },
  // ── About page (all editable from Admin portal → Site settings) ──
  aboutTitle: 'Eight decades, one promise.',
  vision: 'To be a beacon of holistic education in the nation — producing virtuous, versatile citizens who lead with wisdom and serve with humility.',
  mission: 'To provide every student with a learning environment that blends academic rigour, sporting spirit, aesthetic sensibility and moral character — preparing them for the world while rooting them in our values.',
  tourVideo: 'https://www.youtube.com/embed/ysz5S6PUM-U',
  timeline: [
    { year: '1942', title: 'Foundation', text: 'Founded with 64 students and 3 teachers under a single hall, guided by a vision of free, values-based education.' },
    { year: '1958', title: 'The Main Hall', text: 'The iconic Main Hall was opened, still the heart of every assembly, concert and prize giving.' },
    { year: '1976', title: 'National School status', text: 'Elevated to National School status in recognition of academic excellence.' },
    { year: '1994', title: 'Science & Technology wing', text: 'New laboratories and the computer centre opened the door to modern STEM education.' },
    { year: '2010', title: 'Sporting golden era', text: 'National titles in cricket, athletics and chess established the school as an all-round powerhouse.' },
    { year: '2024', title: 'Smart campus', text: 'Digital classrooms, the online results portal and this website — learning without walls.' }
  ],
  adminTeam: [
    { name: 'Mrs. K. A. D. Senanayake', role: 'Principal' },
    { name: 'Mr. H. W. Bandara', role: 'Deputy Principal — Academic' },
    { name: 'Mrs. L. Ratnayake', role: 'Deputy Principal — Administration' },
    { name: 'Mr. C. Weerasinghe', role: 'Sectional Head — Primary' },
    { name: 'Mrs. A. Dias', role: 'Sectional Head — O/L' },
    { name: 'Mr. G. Kumara', role: 'Sectional Head — A/L' }
  ],
  anthem: [
    'Hail our school, the lamp of wisdom bright,',
    'Guiding young hearts from darkness into light.',
    'In maroon and gold thy children stand,',
    'To serve with honour, heart and hand.',
    '',
    'Through fields of green and halls of learning true,',
    'We pledge our finest, all our days, to you.',
    'May knowledge, discipline and service be',
    'Our gift, dear school, eternally.'
  ]
}
