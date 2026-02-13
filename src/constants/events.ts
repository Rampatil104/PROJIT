import { Event, TransportRoute } from '@/types';

export const EVENTS: Event[] = [
  {
    id: 'project-competition',
    name: 'Project Competition',
    entryFee: 400,
    maxTeamSize: 4,
    minTeamSize: 1,
    description: 'Showcase your innovative projects and compete with the best minds',
    registeredCount: 48,
    maxParticipants: 100,
    rules: [
      'Entry Fee: ₹400 per group',
      'Maximum Team Size: 4 members',
      'Abstract submission required before 10/02/2026',
      'Demo time: 8-10 minutes',
      'Must bring own laptop',
      'Transport from New CBS at 8:00 AM'
    ],
    coordinators: [
      { name: 'Prof. R. R. Sonawane', phone: '9130465798' },
      { name: 'Prof. K. K. Sirsath', phone: '9423348982' },
      { name: 'Prof. P. D. Dalve', phone: '8862027616' },
      { name: 'Dr. S. Srivastava', phone: '9027073823' },
      { name: 'Prof. N. B. Shaikh', phone: '9096241615' },
      { name: 'Prof. B. V. Tayade', phone: '9960336237' },
      { name: 'Prof. S. J. Birari', phone: '9850839199' },
      { name: 'Prof. P. J. Patel', phone: '9033377643' }
    ],
    specialRequirements: ['Laptop', 'Project Abstract', 'Presentation']
  },
  {
    id: 'robo-war',
    name: 'Robo War',
    entryFee: 500,
    maxTeamSize: 4,
    minTeamSize: 2,
    description: 'Build a combat robot and battle it out in the arena',
    registeredCount: 32,
    maxParticipants: 60,
    rules: [
      'Team Size: 4 members',
      'Maximum Weight: 3kg',
      'Maximum Dimension: 40x40x40 cm',
      'Combat format with elimination rounds'
    ],
    judging: [
      { criterion: 'Aggression', percentage: 30 },
      { criterion: 'Damage', percentage: 30 },
      { criterion: 'Control', percentage: 20 },
      { criterion: 'Strategy & Design', percentage: 20 }
    ],
    coordinators: [
      { name: 'Prof. S. S. Aher', phone: '9552650839' },
      { name: 'Akshay Dandekar', phone: '8010643849', designation: 'Student Coordinator' }
    ],
    specialRequirements: ['Robot (max 3kg)', 'Remote Control', 'Battery']
  },
  {
    id: 'robo-race',
    name: 'Robo Race (Sprint)',
    entryFee: 300,
    maxTeamSize: 4,
    minTeamSize: 2,
    description: 'Race your robot through challenging obstacle courses',
    registeredCount: 28,
    maxParticipants: 50,
    rules: [
      'Maximum Weight: 3kg',
      'Maximum Dimension: 30x30x30 cm',
      'Maximum Voltage: 24V',
      '5 minutes arena time',
      '3 attempts allowed'
    ],
    coordinators: [
      { name: 'Prof. G. B. Patil', phone: '9284178489' },
      { name: 'Rohit Jagdale', phone: '8010963505', designation: 'Student Coordinator' },
      { name: 'Rohan Lohar', phone: '8767158469', designation: 'Student Coordinator' }
    ],
    specialRequirements: ['Robot (max 3kg)', 'Remote Control']
  },
  {
    id: 'c-coding',
    name: 'C Coding Competition',
    entryFee: 100,
    maxTeamSize: 2,
    minTeamSize: 1,
    description: 'Test your C programming skills in a competitive environment',
    registeredCount: 56,
    maxParticipants: 80,
    location: 'Computer Lab Room 105',
    rules: [
      'Entry Fee: ₹100',
      'Maximum Team: 2 members',
      'Round 1: Multiple Choice Questions',
      'Round 2: C Programming Challenges',
      'No Internet Access',
      'No ChatGPT or AI tools allowed',
      'Location: Computer Lab Room 105'
    ],
    coordinators: [
      { name: 'Mrs. J. N. Thakur', phone: '8275008129' },
      { name: 'Mr. K. N. Nagare', phone: '9423853161' },
      { name: 'Mr. Ganesh Sonawane', phone: '7499096064' },
      { name: 'Miss. Kirti Shinde', phone: '8208311134' },
      { name: 'Miss. Vaishali Rathod', phone: '8007680777' },
      { name: 'Miss. Minakshi Bhavsar', phone: '9518970487' }
    ],
    specialRequirements: ['Basic knowledge of C programming']
  },
  {
    id: 'web-design',
    name: 'Web Design Competition',
    entryFee: 150,
    maxTeamSize: 1,
    minTeamSize: 1,
    description: 'Create stunning websites using modern web technologies',
    registeredCount: 24,
    maxParticipants: 40,
    rules: [
      'Individual participation only',
      'Time Limit: 1.5 hours',
      'Technologies: HTML, CSS, JavaScript, Bootstrap',
      'Theme will be announced on the spot',
      'Judged on design, creativity, and functionality'
    ],
    coordinators: [
      { name: 'Ms. P. A. Agrawal', phone: '9876543210' },
      { name: 'Ms. D. D. Survase', phone: '9876543211' }
    ],
    specialRequirements: ['Laptop with code editor']
  },
  {
    id: 'slideshow',
    name: 'Slide Show Competition',
    entryFee: 100,
    maxTeamSize: 1,
    minTeamSize: 1,
    description: 'Present your ideas through compelling visual presentations',
    registeredCount: 20,
    maxParticipants: 35,
    rules: [
      'Entry Fee: ₹100',
      'Individual participation',
      '12-15 slides required',
      'Duration: 3 minutes',
      'No oral presentation required',
      'Automatic slideshow format'
    ],
    coordinators: [
      { name: 'Dr. Sonal Borase', phone: '8983521050' },
      { name: 'Shruti Sanap', phone: '7620495758', designation: 'Student Coordinator' }
    ],
    specialRequirements: ['PPT file on USB drive']
  },
  {
    id: 'bridge-making',
    name: 'Bridge Making',
    entryFee: 200,
    maxTeamSize: 4,
    minTeamSize: 2,
    description: 'Design and construct a strong bridge using limited materials',
    registeredCount: 16,
    maxParticipants: 30,
    rules: [
      'Entry Fee: ₹200',
      'Team Size: 4 members',
      'Bridge Span: 80cm',
      'Materials: Ice-cream sticks and Fevicol only',
      'Time Limit: 2.5 hours',
      'Judged on strength and design'
    ],
    coordinators: [
      { name: 'Mr. G. V. Sabale', phone: '7304707582' },
      { name: 'Mr. K. N. Marathe', phone: '8551833135' },
      { name: 'Mr. Ritesh Padaya', phone: '9373276530' }
    ],
    specialRequirements: ['All materials provided on-site']
  }
];

export const TRANSPORT_ROUTES: TransportRoute[] = [
  {
    id: 'cidco',
    name: 'Cidco Route',
    driver: {
      name: 'Mr. Yogesh Marathe',
      phone: '8975432138'
    },
    stops: [
      'Cidco Bus Stand',
      'Rajiv Gandhi Bhavan',
      'Pathardi Phata',
      'Canada Corner',
      'College Road',
      'JIT College Campus'
    ],
    arrivalTime: '9:00 AM'
  },
  {
    id: 'jatra-hotel',
    name: 'Jatra Hotel Route',
    driver: {
      name: 'Mr. Jitendra Patil',
      phone: '9158335081'
    },
    stops: [
      'Jatra Hotel',
      'Dwarka Circle',
      'Ashok Stambh',
      'Govind Nagar',
      'Panchavati',
      'JIT College Campus'
    ],
    arrivalTime: '9:00 AM'
  },
  {
    id: 'cbs-ashok',
    name: 'CBS Ashok Stambh Route',
    driver: {
      name: 'Mr. Anil Patil',
      phone: '9975759200'
    },
    stops: [
      'New CBS',
      'Old CBS',
      'Ashok Stambh',
      'Golf Club',
      'Mhasrul',
      'JIT College Campus'
    ],
    arrivalTime: '9:00 AM'
  },
  {
    id: 'nashik-road',
    name: 'Nashik Road Route',
    driver: {
      name: 'Mr. Pandurang Tidame',
      phone: '8888669865'
    },
    stops: [
      'Nashik Road Railway Station',
      'Satpur MIDC',
      'Ambad',
      'Trimbak Naka',
      'College Road Junction',
      'JIT College Campus'
    ],
    arrivalTime: '9:00 AM'
  }
];
