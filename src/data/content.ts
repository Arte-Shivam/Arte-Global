import type { FAQ, Job, MediaItem, Testimonial } from '../types'

export const COMPANY = {
  name: 'Arte Global Skills Recruitment Private Limited',
  shortName: 'Arte Recruitment',
  tagline: 'New Opportunities, around the world.',
  description:
    'Arte Global Skills Recruitment is a trusted recruitment agency offering global job opportunities for people from India, Nepal and beyond. We have successfully placed candidates across Europe, North Macedonia, Mauritius, Bulgaria, Montenegro, UAE, Qatar, and many other countries.',
  email: 'info@arterecruitment.com',
  phoneIndia: '+91 931 929 3434',
  phoneMontenegro: '+382 67 380 924',
  social: {
    linkedin: 'https://www.linkedin.com/company/arterecruitment',
    facebook: 'https://www.facebook.com/arterecruitment',
    instagram: 'https://www.instagram.com/arte_recruitment',
  },
  offices: [
    {
      name: 'India Office',
      company: 'Arte Global Skills Recruitment Pvt. Ltd.',
      address: '308, Emaar Emerald Plaza, Sector 65, Golf Course Extension Road, Gurugram 122101, Haryana, India',
      phone: '+91 931 929 3434',
      email: 'info@arterecruitment.com',
    },
    {
      name: 'Montenegro Office',
      company: 'Arte Global Skills DOO',
      address: 'Drugog Crnogorskog Bataljona br 2-4',
      phone: '+382 67 380 924',
      email: 'info@arterecruitment.com',
    },
  ],
  countries: [
    'Europe', 'North Macedonia', 'Mauritius', 'Bulgaria', 'Montenegro',
    'UAE', 'Qatar', 'Germany', 'Croatia', 'Serbia',
  ],
}

export const INDUSTRIES = [
  'Accounting / Finance', 'Agriculture', 'Automotive', 'Aviation', 'Construction',
  'Cruise', 'Customer Service', 'Design', 'Development', 'Education',
  'Electricals', 'Health and Care', 'Home Care', 'Hospitality', 'Human Resource',
  'ICT/BPO', 'Manufacturing', 'Marine & Logistics', 'Marketing', 'Medical',
  'Oil & Gas / Mining', 'Project Management', 'Textile & Garment',
]

export const COUNTRIES = [
  'Afghanistan', 'Albania', 'Bulgaria', 'Croatia', 'Germany', 'India', 'Mauritius',
  'Montenegro', 'Nepal', 'North Macedonia', 'Qatar', 'Serbia', 'UAE', 'United Kingdom',
]

export const CANDIDATE_NAV = [
  { label: 'Home', path: '/candidate' },
  { label: 'Jobs', path: '/candidate/jobs' },
  { label: 'About Us', path: '/candidate/about' },
  { label: 'Blog', path: '/candidate/blog' },
  { label: 'FAQs', path: '/candidate/faqs' },
  { label: 'Contact', path: '/candidate/contact' },
]

export const RECRUITER_NAV = [
  { label: 'Home', path: '/recruiter' },
  { label: 'Services', path: '/recruiter/services' },
  { label: 'About Us', path: '/recruiter/about' },
  { label: 'Blog', path: '/recruiter/blog' },
  { label: 'FAQs', path: '/recruiter/faqs' },
  { label: 'Contact', path: '/recruiter/contact' },
]

export const HOW_IT_WORKS_CANDIDATE = [
  { step: 1, title: 'Register', description: 'Create your free account and join our talent network.', icon: '/icons/register.svg' },
  { step: 2, title: 'Create your Profile', description: 'Complete your profile with skills, experience and preferences.', icon: '/icons/profile.svg' },
  { step: 3, title: 'Upload your Resume', description: 'Upload your CV so employers can discover your qualifications.', icon: '/icons/resume.svg' },
  { step: 4, title: 'Apply for Jobs', description: 'Browse global opportunities and apply to roles that match your goals.', icon: '/icons/apply.svg' },
]

export const HOW_IT_WORKS_RECRUITER = [
  { step: 1, title: 'Register', description: 'Sign up as an employer and tell us about your company.', icon: '/icons/register.svg' },
  { step: 2, title: 'Share Requirements', description: 'Describe the roles, skills and experience you need.', icon: '/icons/requirements.svg' },
  { step: 3, title: 'We Source Talent', description: 'Our team identifies and vets qualified candidates globally.', icon: '/icons/talent.svg' },
  { step: 4, title: 'Hire with Confidence', description: 'Interview shortlisted candidates and onboard your new team.', icon: '/icons/hire.svg' },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ashley Jenkins',
    role: 'Recruitment Agent',
    content: "Impressed doesn't even begin to cover it. Arte Recruitment delivered top-tier candidates that perfectly aligned with our requirements. Their expertise streamlined our hiring process, and we couldn't be happier with the results.",
    type: 'recruiter',
    is_active: true,
  },
  {
    id: '2',
    name: 'Nicole Wells',
    role: 'Property Developer',
    content: 'Partnering with Arte Recruitment was the best decision for our staffing needs. Their dedication and understanding of our industry set them apart. The candidates they brought forward were exceptional, making our choice an easy one.',
    type: 'recruiter',
    is_active: true,
  },
  {
    id: '3',
    name: 'Brooklyn Simmons',
    role: 'Consultant',
    content: 'Efficient, effective, and exceptional describe Arte Recruitment. They grasped our company culture and needs effortlessly, presenting candidates who were spot-on matches. Thanks to them, our team is stronger than ever.',
    type: 'recruiter',
    is_active: true,
  },
  {
    id: '4',
    name: 'Ronald Richards',
    role: 'Go Consults',
    content: "We've tried other recruitment services, but none have delivered like Arte Recruitment. Their commitment to finding the right talent is unmatched. They simplified the process and found us candidates who are now integral to our success.",
    type: 'recruiter',
    is_active: true,
  },
]

export const DEMO_JOBS: Job[] = [
  {
    id: '1',
    title: 'Finishing Carpenter',
    slug: 'finishing-carpenter',
    description: 'Seeking experienced finishing carpenters for projects in Europe. Must have proven experience in high-quality woodwork and finishing.',
    industry: 'Construction',
    country: 'Bulgaria',
    job_type: 'full-time',
    status: 'active',
    is_featured: true,
    is_urgent: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Shuttering Carpenter',
    slug: 'shuttering-carpenter',
    description: 'Shuttering carpenters needed for construction projects. Experience with formwork and concrete structures required.',
    industry: 'Construction',
    country: 'North Macedonia',
    job_type: 'full-time',
    status: 'active',
    is_featured: true,
    is_urgent: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Argon Welder',
    slug: 'argon-welder',
    description: 'Skilled argon welders required for manufacturing facility. TIG welding certification preferred.',
    industry: 'Manufacturing',
    country: 'Serbia',
    job_type: 'full-time',
    status: 'active',
    is_featured: false,
    is_urgent: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Solar Cleaner',
    slug: 'solar-cleaner',
    description: 'Solar panel cleaning and maintenance technicians for renewable energy projects in the UAE.',
    industry: 'Electricals',
    country: 'UAE',
    job_type: 'full-time',
    status: 'active',
    is_featured: false,
    is_urgent: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Electrician (Maintenance Technician)',
    slug: 'electrician-maintenance',
    description: 'Maintenance electricians needed for commercial facilities. Experience with industrial electrical systems required.',
    industry: 'Electricals',
    country: 'Qatar',
    job_type: 'full-time',
    status: 'active',
    is_featured: true,
    is_urgent: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Repairman (White Goods Technician)',
    slug: 'white-goods-technician',
    description: 'White goods repair technicians for household appliance service centres across Europe.',
    industry: 'Manufacturing',
    country: 'Croatia',
    job_type: 'full-time',
    status: 'active',
    is_featured: false,
    is_urgent: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export const DEMO_FAQS: FAQ[] = [
  {
    id: '1',
    question: 'How do I apply for a job through Arte Recruitment?',
    answer: 'Register as a candidate, complete your profile, upload your resume, and browse available jobs. Click "Apply" on any job listing to submit your application.',
    category: 'Applications',
    audience: 'candidate',
    sort_order: 1,
  },
  {
    id: '2',
    question: 'Which countries do you place candidates in?',
    answer: 'We place candidates across Europe (including North Macedonia, Bulgaria, Montenegro, Croatia, Serbia), Mauritius, UAE, Qatar, and other destinations worldwide.',
    category: 'General',
    audience: 'both',
    sort_order: 2,
  },
  {
    id: '3',
    question: 'Is registration free for candidates?',
    answer: 'Yes, candidate registration is completely free. Create your account and start exploring global opportunities at no cost.',
    category: 'Registration',
    audience: 'candidate',
    sort_order: 3,
  },
  {
    id: '4',
    question: 'How can employers partner with Arte Recruitment?',
    answer: 'Register as a recruiter/employer on our platform, share your hiring requirements, and our team will source qualified candidates tailored to your needs.',
    category: 'Partnership',
    audience: 'recruiter',
    sort_order: 4,
  },
  {
    id: '5',
    question: 'What industries do you specialise in?',
    answer: 'We cover Construction, Manufacturing, Hospitality, Healthcare, ICT/BPO, Marine & Logistics, Oil & Gas, and many more sectors.',
    category: 'General',
    audience: 'both',
    sort_order: 5,
  },
]

export const DEMO_MEDIA: MediaItem[] = [
  {
    id: '1',
    title: 'Arte Recruitment — advertisement',
    url: 'https://www.youtube.com/embed/qst4le8sq5I',
    type: 'video',
    is_active: true,
  },
  {
    id: '2',
    title: 'Hilton Hotel Interview',
    url: 'https://www.youtube.com/embed/j6sAramJv30',
    type: 'reel',
    is_active: true,
  },
]

export const BLOG_POSTS = [
  {
    id: '1',
    title: 'Jobs in Europe are waiting for you!',
    slug: 'jobs-in-europe',
    excerpt: 'Join hundreds of successful candidates who have already started their careers in Europe. Now it\'s your turn to take the leap.',
    content: 'Europe offers incredible opportunities for skilled workers from India, Nepal and beyond. At Arte Recruitment, we have helped hundreds of candidates secure positions across Bulgaria, North Macedonia, Croatia, Serbia and more...',
    author: 'Arte Team',
    published_at: '2026-01-15',
    is_published: true,
  },
  {
    id: '2',
    title: 'How to Prepare for an Overseas Job Interview',
    slug: 'overseas-interview-tips',
    excerpt: 'Essential tips to help you ace your international job interview and land your dream role abroad.',
    content: 'Preparing for an overseas job interview requires more than just reviewing your resume. Research the company culture, understand visa requirements, and practice common interview questions...',
    author: 'Arte Team',
    published_at: '2026-02-01',
    is_published: true,
  },
]
