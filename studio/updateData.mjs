import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'zipme748',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
})

async function update() {
  console.log('Updating Sanity with resume data...\n')

  // 1. Hero — updated tagline
  console.log('-> Updating Hero...')
  await client.createOrReplace({
    _id: 'hero',
    _type: 'hero',
    name: 'Suraj B V',
    tagline: 'Software Engineer | Full-Stack Developer',
    techStack: 'React • Node.js • Convex',
    subtitle: 'I build beautiful, performant applications that make people smile',
    ctaText: 'See My Work ↓',
  })

  // 2. About — updated CGPA and role
  console.log('-> Updating About...')
  const aboutDoc = await client.getDocument('about')
  await client.createOrReplace({
    ...aboutDoc,
    _id: 'about',
    _type: 'about',
    bio: "I'm a Computer Science graduate (BE ISE, CGPA 9.06) from Shridevi Institute of Engineering and Technology. Currently a Software Engineer at Clean Fanatics, building customer-facing platforms and internal tools with React, React Native, Convex, and Sanity CMS.",
  })

  // 3. Skills — restructured
  console.log('-> Updating Skills...')
  // Delete old skill docs
  const oldSkills = await client.fetch('*[_type == "skill"]{ _id }')
  for (const s of oldSkills) {
    await client.delete(s._id)
  }

  const skillsData = [
    {
      _id: 'skill-languages', category: 'Languages', icon: 'faCode', color: 'coral', order: 1,
      skills: [
        {_key: 'py', name: 'Python', icon: 'faDna'},
        {_key: 'js', name: 'JavaScript', icon: 'faCode'},
        {_key: 'java', name: 'Java', icon: 'faCode'},
      ],
    },
    {
      _id: 'skill-frontend', category: 'Frontend', icon: 'faGlobe', color: 'peach', order: 2,
      skills: [
        {_key: 'react', name: 'ReactJs', icon: 'faCode'},
        {_key: 'rn', name: 'React Native', icon: 'faMobileScreenButton'},
        {_key: 'html', name: 'HTML & CSS', icon: 'faPalette'},
      ],
    },
    {
      _id: 'skill-backend', category: 'Backend', icon: 'faServer', color: 'gold', order: 3,
      skills: [
        {_key: 'node', name: 'Node.js', icon: 'faServer'},
        {_key: 'express', name: 'Express.js', icon: 'faServer'},
        {_key: 'convex', name: 'Convex', icon: 'faCubes'},
      ],
    },
    {
      _id: 'skill-tech', category: 'Technologies', icon: 'faGear', color: 'sage', order: 4,
      skills: [
        {_key: 'rest', name: 'REST APIs', icon: 'faGlobe'},
        {_key: 'jwt', name: 'JWT Authentication', icon: 'faFingerprint'},
      ],
    },
    {
      _id: 'skill-db', category: 'Databases', icon: 'faDatabase', color: 'coral', order: 5,
      skills: [
        {_key: 'mysql', name: 'MySQL', icon: 'faDatabase'},
        {_key: 'mongo', name: 'MongoDB', icon: 'faLeaf'},
      ],
    },
    {
      _id: 'skill-tools', category: 'Tools', icon: 'faWrench', color: 'peach', order: 6,
      skills: [
        {_key: 'git', name: 'Git & GitHub', icon: 'faCode'},
        {_key: 'zoho-creator', name: 'Zoho Creator', icon: 'faGear'},
        {_key: 'zoho-crm', name: 'Zoho CRM', icon: 'faGear'},
        {_key: 'zoho-flow', name: 'Zoho Flow', icon: 'faGear'},
        {_key: 'codex', name: 'Codex', icon: 'faRobot'},
        {_key: 'claude', name: 'Claude', icon: 'faRobot'},
        {_key: 'copilot', name: 'GitHub Copilot', icon: 'faRobot'},
      ],
    },
  ]
  for (const s of skillsData) {
    await client.createOrReplace({_type: 'skill', ...s})
  }
  console.log('   Done: 6 skill categories')

  // 4. Experience — two roles now
  console.log('-> Updating Experience...')
  await client.createOrReplace({
    _id: 'exp-cleanfanatics',
    _type: 'experience',
    company: 'Clean Fanatics',
    role: 'Software Engineer',
    duration: 'May 2026 – Present',
    location: 'Bangalore',
    icon: 'faBuilding',
    color: 'coral',
    order: 1,
    achievements: [
      'Contributed to the development of a customer-facing service platform and internal operations tools using ReactJs, React Native, JavaScript, and Convex, supporting end-to-end service booking and business operations.',
      'Built a shared wallet and referral platform, implementing wallet credits, referral attribution, and reward workflows integration.',
      'Built a feature-flagged partner-training environment with backward compatibility and safeguards to isolate test sandbox training data from live operational data.',
      'Integrated Sanity CMS to manage and deliver content across the customer-facing website and app, enabling centralized content management and streamlined updates.',
      'Contributed to increasing website booking volume from approximately 1,000+ to 3,000+ bookings per month (a 3x increase) through improvements to customer booking and service-management workflows.',
    ],
  })

  await client.createOrReplace({
    _id: 'exp-cleanfanatics-intern',
    _type: 'experience',
    company: 'Clean Fanatics',
    role: 'Software Engineer Intern',
    duration: 'Nov 2025 – Apr 2026',
    location: 'Bangalore',
    icon: 'faBuilding',
    color: 'peach',
    order: 2,
    achievements: [
      'Programmed 50+ custom Deluge routines, automated logic, and REST endpoints spanning Zoho Creator, CRM, and Flow.',
      'Architected an end-to-end civil operations hub using JavaScript, Tailwind CSS, OpenStreetMap APIs, and Zoho Creator; engineered 3-tier access roles, geofenced punch in/out attendance, plus real-time dashboards used across 20+ construction sites for 25+ users.',
      'Built a Zoho Creator application enabling inspection agents to manage assigned inspections, track quotations, and generate PDF quotations.',
      'Developed API integrations between Salesforce and Zoho Creator to synchronize Pidilite\'s leads, track deal outcomes, and report status updates back to Salesforce.',
    ],
  })

  await client.createOrReplace({
    _id: 'exp-shridevi',
    _type: 'experience',
    company: 'Shridevi Institute of Engineering and Technology',
    role: 'Bachelor of Engineering (Information Science and Engineering)',
    duration: 'Dec 2022 – May 2026',
    location: 'Tumkur, Karnataka',
    icon: 'faGraduationCap',
    color: 'gold',
    order: 3,
    achievements: [
      'Graduated with CGPA 9.06/10',
    ],
  })
  console.log('   Done: 3 experience entries')

  // 5. Projects — updated
  console.log('-> Updating Projects...')
  // Delete old projects
  const oldProjects = await client.fetch('*[_type == "project"]{ _id }')
  for (const p of oldProjects) {
    await client.delete(p._id)
  }

  const projectsData = [
    {
      _id: 'project-wandermate',
      title: 'WanderMate',
      description: 'Travel partner discovery platform with a multi-factor compatibility-scoring algorithm (0–100 match score). Features real-time one-on-one chat with read receipts on Convex\'s reactive backend, mutual-match detection with atomic match creation preventing race conditions, and authenticated routing with Clerk across a fully deployed full-stack app.',
      tags: ['React', 'Convex', 'Clerk'],
      github: 'https://github.com/surajbv/wandermate',
      live: 'https://wandermate.surajbv.me',
      icon: 'faPlaneDeparture',
      order: 1,
    },
    {
      _id: 'project-notes-app',
      title: 'Full-stack Notes Application',
      description: 'Full-stack notes management platform with JWT-based authentication, enabling secure user-specific CRUD operations and responsive cross-device access. Features RESTful APIs with modular backend routing, markdown rendering, and search/filter functionality. Deployed on Vercel (frontend) and Render (backend).',
      tags: ['React', 'Node.js', 'Express', 'SQL', 'JWT'],
      github: 'https://github.com/surajbv/notes-app',
      live: 'https://notes.surajbv.me',
      icon: 'faBookOpen',
      order: 2,
    },
  ]
  for (const p of projectsData) {
    await client.createOrReplace({_type: 'project', ...p})
  }
  console.log('   Done: 2 projects')

  // 6. Add Certifications as achievements (appending to existing)
  console.log('-> Adding Certifications...')
  // Keep existing hackathon achievements, add certifications
  await client.createOrReplace({
    _id: 'ach-nptel-dsa',
    _type: 'achievement',
    title: 'NPTEL DSA using Java',
    subtitle: 'NPTEL Certification',
    date: 'Certified',
    icon: 'faGraduationCap',
    color: 'coral',
    description: 'NPTEL Data Structures and Algorithms using Java certification.',
    order: 5,
  })
  await client.createOrReplace({
    _id: 'ach-nptel-python',
    _type: 'achievement',
    title: 'Joy of Computing - Python',
    subtitle: 'NPTEL Certification',
    date: 'Certified',
    icon: 'faGraduationCap',
    color: 'peach',
    description: 'NPTEL The Joy of Computing using Python certification.',
    order: 6,
  })
  await client.createOrReplace({
    _id: 'ach-nptel-dbms',
    _type: 'achievement',
    title: 'Database Management System',
    subtitle: 'NPTEL Certification',
    date: 'Certified',
    icon: 'faDatabase',
    color: 'gold',
    description: 'NPTEL Database Management System certification.',
    order: 7,
  })
  await client.createOrReplace({
    _id: 'ach-coursera-genai',
    _type: 'achievement',
    title: 'Generative AI for Everyone',
    subtitle: 'Coursera Certification',
    date: 'Certified',
    icon: 'faBrain',
    color: 'sage',
    description: 'Coursera Generative AI for Everyone certification.',
    order: 8,
  })
  console.log('   Done: 4 certifications added')

  console.log('\nAll data updated successfully!')
}

update().catch((err) => {
  console.error('Update failed:', err.message || err)
  process.exit(1)
})
