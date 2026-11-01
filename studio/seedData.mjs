import {createClient} from '@sanity/client'
import {readFileSync} from 'fs'
import {join, dirname} from 'path'
import {fileURLToPath} from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const client = createClient({
  projectId: 'zipme748',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

async function uploadImage(filePath) {
  const buffer = readFileSync(filePath)
  const asset = await client.assets.upload('image', buffer, {
    filename: filePath.split('/').pop(),
  })
  return {
    _type: 'image',
    asset: {_type: 'reference', _ref: asset._id},
  }
}

async function seed() {
  console.log('Seeding Sanity with portfolio data...\n')

  // 1. Hero (singleton)
  console.log('-> Creating Hero...')
  await client.createOrReplace({
    _id: 'hero',
    _type: 'hero',
    name: 'Suraj B V',
    tagline: 'Full-Stack Developer | Aspiring AI Engineer',
    techStack: 'React • Node.js • AI/ML',
    subtitle: 'I build beautiful, performant applications that make people smile',
    ctaText: 'See My Work ↓',
  })
  console.log('   Done: Hero')

  // 2. About (singleton) with photo uploads
  console.log('-> Creating About + uploading photos...')
  const assetsDir = join(__dirname, '..', 'assets')
  const photoFiles = ['1.jpeg', '2.jpg', '3.jpeg', '4.jpg', '5.jpeg', '6.jpg']
  const photos = []
  for (const file of photoFiles) {
    try {
      const img = await uploadImage(join(assetsDir, file))
      img.alt = 'Portrait photo ' + (photoFiles.indexOf(file) + 1)
      img._key = 'photo' + (photoFiles.indexOf(file) + 1)
      photos.push(img)
      console.log('   Uploaded ' + file)
    } catch (err) {
      console.warn('   Could not upload ' + file + ': ' + err.message)
    }
  }

  await client.createOrReplace({
    _id: 'about',
    _type: 'about',
    bio: "I'm a Computer Science student (BE ISE, CGPA 8.93) at Shridevi Institute of Engineering and Technology, passionate about AI/ML, full-stack development, and automation. Currently a Software Engineering Intern at Clean Fanatics, working with the Zoho ecosystem to build scalable business solutions.",
    photos,
    highlights: [
      {
        _key: 'whatILove',
        heading: 'What I Love',
        items: [
          {_key: 'ai', icon: 'faBrain', text: 'Building AI/ML-driven systems'},
          {_key: 'auto', icon: 'faWrench', text: 'Automating workflows with integrations'},
          {_key: 'solve', icon: 'faBolt', text: 'Solving complex problems with elegant code'},
        ],
      },
      {
        _key: 'strengths',
        heading: 'My Strengths',
        items: [
          {_key: 'learn', icon: 'faBookOpen', text: 'Quick learner across tech stacks'},
          {_key: 'hack', icon: 'faTrophy', text: 'Hackathon winner & Hack-2-Intern finalist'},
          {_key: 'fs', icon: 'faLink', text: 'Full-stack development: React, Python, Java, Zoho'},
        ],
      },
    ],
  })
  console.log('   Done: About')

  // 3. Skills
  console.log('-> Creating Skills...')
  const skillsData = [
    {
      _id: 'skill-languages', category: 'Programming Languages', icon: 'faCode', color: 'coral', order: 1,
      skills: [
        {_key: 'py', name: 'Python', icon: 'faDna'},
        {_key: 'js', name: 'JavaScript', icon: 'faCode'},
        {_key: 'java', name: 'Java', icon: 'faCode'},
        {_key: 'del', name: 'Deluge', icon: 'faGear'},
      ],
    },
    {
      _id: 'skill-web', category: 'Web Development', icon: 'faGlobe', color: 'peach', order: 2,
      skills: [
        {_key: 'react', name: 'React', icon: 'faCode'},
        {_key: 'html', name: 'HTML & CSS', icon: 'faCode'},
        {_key: 'convex', name: 'Convex', icon: 'faCubes'},
        {_key: 'django', name: 'Django', icon: 'faServer'},
      ],
    },
    {
      _id: 'skill-mobile', category: 'Mobile & App Dev', icon: 'faMobileScreenButton', color: 'gold', order: 3,
      skills: [
        {_key: 'rn', name: 'React Native', icon: 'faMobileScreenButton'},
        {_key: 'swing', name: 'Java Swings', icon: 'faCode'},
        {_key: 'st', name: 'Streamlit', icon: 'faClapperboard'},
        {_key: 'ux', name: 'UI/UX Design', icon: 'faPalette'},
      ],
    },
    {
      _id: 'skill-ai', category: 'AI/ML & Data', icon: 'faBrain', color: 'sage', order: 4,
      skills: [
        {_key: 'tf', name: 'TensorFlow & PyTorch', icon: 'faDna'},
        {_key: 'cv', name: 'OpenCV & FaceNet', icon: 'faEye'},
        {_key: 'pd', name: 'Pandas & NumPy', icon: 'faChartSimple'},
        {_key: 'sk', name: 'Scikit-learn', icon: 'faRobot'},
      ],
    },
    {
      _id: 'skill-db', category: 'Databases & Tools', icon: 'faDatabase', color: 'coral', order: 5,
      skills: [
        {_key: 'mysql', name: 'MySQL', icon: 'faDatabase'},
        {_key: 'mongo', name: 'MongoDB', icon: 'faLeaf'},
        {_key: 'git', name: 'Git & GitHub', icon: 'faCode'},
        {_key: 'zoho', name: 'Zoho Ecosystem', icon: 'faGear'},
        {_key: 'n8n', name: 'n8n', icon: 'faGear'},
      ],
    },
  ]
  for (const s of skillsData) {
    await client.createOrReplace({_type: 'skill', ...s})
  }
  console.log('   Done: 5 skill categories')

  // 4. Projects
  console.log('-> Creating Projects...')
  const projectsData = [
    {
      _id: 'project-crimetrace', title: 'Crimetrace AI',
      description: 'AI-driven criminal face recognition system with real-time identification. Engineered Django backend for authentication, integrated OpenCV & FaceNet for video processing, and built interactive Streamlit UI with optimized low-latency performance.',
      tags: ['Django', 'OpenCV', 'FaceNet', 'Python', 'Streamlit'],
      github: 'https://github.com/surajbv/crimetrace-ai', live: 'https://crimetrace.surajbv.me',
      icon: 'faFingerprint', order: 1,
    },
    {
      _id: 'project-wandermate', title: 'WanderMate',
      description: 'Travel mate finding platform connecting users based on calculated compatibility scores. Integrated TalkJS API for real-time chat, managed full development lifecycle with clean GitHub version control, delivering a complete functional webpage.',
      tags: ['React', 'TalkJS', 'MongoDB', 'Node.js'],
      github: 'https://github.com/surajbv/wandermate', live: 'https://wandermate.surajbv.me',
      icon: 'faPlaneDeparture', order: 2,
    },
    {
      _id: 'project-quickrent', title: 'QuickRent',
      description: 'Rental application with responsive Java Swing UI and real-time application logic using JDBC. Designed complete system with MySQL persistence, applied OOP principles for maintainability and scalability.',
      tags: ['Java', 'Swing', 'JDBC', 'MySQL', 'OOP'],
      github: 'https://github.com/surajbv/quickrent', live: '#',
      icon: 'faHouse', order: 3,
    },
  ]
  for (const p of projectsData) {
    await client.createOrReplace({_type: 'project', ...p})
  }
  console.log('   Done: 3 projects')

  // 5. Achievements
  console.log('-> Creating Achievements...')
  const achievementsData = [
    {_id: 'ach-hack2intern', title: 'Hack-2-Intern Winner', subtitle: 'VTU, Mysore', date: 'Dec 2024', icon: 'faTrophy', color: 'coral', description: '1st Candidate shortlisted for paid internship among 200+ participants. Demonstrated exceptional problem-solving and innovation skills.', order: 1},
    {_id: 'ach-hackathon', title: 'Hackathon Champion', subtitle: 'Shridevi Institute & VTU', date: 'Oct & Dec 2024', icon: 'faMedal', color: 'peach', description: 'Led team to develop innovative solution website within 24 hours. Showcased leadership and rapid prototyping capabilities.', order: 2},
    {_id: 'ach-merit', title: 'Merit Scholarship', subtitle: 'Excellence in Academics', date: '2022-2024', icon: 'faGraduationCap', color: 'gold', description: 'Consistently maintained CGPA of 8.5 or higher throughout the course. Recognized for academic excellence and dedication.', order: 3},
    {_id: 'ach-hackerrank', title: 'HackerRank 5-Star', subtitle: 'Python Proficiency', date: '2022-Present', icon: 'faStar', color: 'sage', description: 'Earned 5-Star Rating in Python on HackerRank, demonstrating strong coding proficiency on global competitive platform.', order: 4},
  ]
  for (const a of achievementsData) {
    await client.createOrReplace({_type: 'achievement', ...a})
  }
  console.log('   Done: 4 achievements')

  // 6. Experience
  console.log('-> Creating Experience...')
  const experienceData = [
    {
      _id: 'exp-cleanfanatics', company: 'Clean Fanatics', role: 'Software Engineering Intern',
      duration: 'Nov 2025 - Present', location: 'On-Site, Bengaluru', icon: 'faBuilding', color: 'coral', order: 1,
      achievements: [
        'Adapted quickly to Zoho ecosystem including Creator, CRM, Analytics, Flow, and REST API integrations',
        'Developed custom Deluge functions to automate business processes and translate requirements into scalable solutions',
        'Configured workflows and integrations to streamline operations and improve data flow between Zoho applications',
        'Gained hands-on experience across multiple Zoho platforms with deep understanding of business logic',
      ],
    },
    {
      _id: 'exp-shridevi', company: 'Shridevi Institute of Engineering and Technology',
      role: 'Bachelor of Engineering (Information Science and Engineering)',
      duration: 'Dec 2022 - May 2026', location: 'Tumkur, Karnataka', icon: 'faGraduationCap', color: 'peach', order: 2,
      achievements: [
        'Graduating with CGPA 8.93/10 and consistently listed for merit scholarship',
        'Built strong foundations in programming, databases, and software engineering principles',
        'Applied classroom learning through projects in AI/ML, full-stack development, and Java applications',
        'Actively participated in hackathons and technical problem-solving competitions',
      ],
    },
  ]
  for (const e of experienceData) {
    await client.createOrReplace({_type: 'experience', ...e})
  }
  console.log('   Done: 2 experience entries')

  // 7. Social Links
  console.log('-> Creating Social Links...')
  const socialData = [
    {_id: 'social-github', name: 'GitHub', url: 'https://github.com/suraj-bv', icon: 'faGithub', label: 'Open GitHub profile', order: 1},
    {_id: 'social-linkedin', name: 'LinkedIn', url: 'https://www.linkedin.com/in/suraj-bv/', icon: 'faLinkedin', label: 'Open LinkedIn profile', order: 2},
    {_id: 'social-x', name: 'X', url: 'https://x.com/Suraj_bv_', icon: 'faXTwitter', label: 'Open X profile', order: 3},
    {_id: 'social-email', name: 'Email', url: 'mailto:surajbv5566@gmail.com', icon: 'faEnvelope', label: 'Send an email', order: 4},
  ]
  for (const s of socialData) {
    await client.createOrReplace({_type: 'socialLink', ...s})
  }
  console.log('   Done: 4 social links')

  console.log('\nAll data seeded successfully!')
}

seed().catch((err) => {
  console.error('Seed failed:', err.message || err)
  process.exit(1)
})
