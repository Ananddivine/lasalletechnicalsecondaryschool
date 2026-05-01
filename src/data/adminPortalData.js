import principalPhoto from '../assets/principle.jpeg'
import examHallPhoto from '../assets/students writing exams.jpeg'
import schoolLogo from '../assets/logo.jpeg'
import grade9Doc from '../assets/GRADE 9.docx?url'
import grade10TransferDoc from '../assets/GRADE 10 TRANSFER.docx?url'
import grade11Doc from '../assets/GRADE 11.docx?url'
import grade12Doc from '../assets/GRADE 12.docx?url'
import nc12Doc from '../assets/NC 1 & 2.docx?url'

export const adminCredentials = {
  email: 'admin@lasalletech.edu.pg',
  password: 'Admin@2026',
}

export const defaultAdminUser = {
  name: 'Br. Antony Samy Pancras',
  role: 'Admissions Coordinator',
  email: adminCredentials.email,
  avatar: principalPhoto,
}

export const adminSidebarSections = [
  {
    title: 'Overview',
    items: [
      {
        label: 'Dashboard',
        path: '/portal/dashboard',
        description: 'Live admissions summary and intake performance.',
      },
    ],
  },
  {
    title: 'Operations',
    items: [
      {
        label: 'Manage',
        path: '/portal/manage',
        description: 'Review payment checks, document status, and routing.',
      },
      {
        label: 'Admission Results',
        path: '/portal/results',
        description: 'See every applicant and open the full decision record.',
      },
    ],
  },
  {
    title: 'Engagement',
    items: [
      {
        label: 'Activities',
        path: '/portal/activities',
        description: 'Upcoming registration work, interviews, and follow-up tasks.',
      },
    ],
  },
]

export const dashboardChecklist = [
  'Check passport-size photo and birth record attachments before final approval.',
  'Confirm first-installment payments against the fee schedule for each intake type.',
  'Escalate medical report cases to student welfare before class placement.',
  'Prepare registration-day attendance sheets for Grade 9, Grade 11, and NC 1 & 2.',
]

export const manageCards = [
  {
    title: 'Document Verification',
    count: '41 waiting',
    description: 'Birth records, attainment certificates, offer letters, and passport photos.',
  },
  {
    title: 'Payment Matching',
    count: '18 exceptions',
    description: 'Applications with partial, missing, or unmatched parent support payments.',
  },
  {
    title: 'Interview Routing',
    count: '12 scheduled',
    description: 'Transfer and repeat applicants requiring additional academic review.',
  },
]

export const activities = [
  {
    day: 'Monday',
    title: 'NC 1 & 2 registration desk setup',
    time: '08:00 AM',
    owner: 'Admissions Office',
    status: 'Scheduled',
  },
  {
    day: 'Tuesday',
    title: 'Grade 9 intake document verification',
    time: '09:30 AM',
    owner: 'Records Team',
    status: 'In progress',
  },
  {
    day: 'Wednesday',
    title: 'Transfer applicant academic review',
    time: '11:00 AM',
    owner: 'Academic Panel',
    status: 'Scheduled',
  },
  {
    day: 'Thursday',
    title: 'Payment reconciliation and receipt check',
    time: '02:00 PM',
    owner: 'Finance Office',
    status: 'Ready',
  },
]

const namePool = [
  'Mary Kila',
  'Samuel Aia',
  'Alice Miro',
  'Peter Manu',
  'Theresa Nako',
  'Michael Tovu',
  'Ruth Evara',
  'Joseph Kari',
  'Diana Puka',
  'Steven Heni',
  'Lucy Tisa',
  'Henry Ove',
  'Martha Raka',
  'Pauline Tega',
  'Andrew Lohia',
  'Clara Puri',
  'Daniel Eri',
  'Rose Mapa',
  'Isaac Dune',
  'Angela Wau',
  'Kevin Remi',
  'Miriam Talo',
  'Brian Kori',
  'Esther Kona',
]

const applicantTemplates = [
  {
    formTitle: 'Grade 9',
    applicantType: 'New intake',
    status: 'Approved',
    reviewer: 'Br. Antony Samy Pancras',
    paymentStatus: 'Paid K500',
    decision: 'Approved for registration day attendance.',
    notes:
      'All compulsory documents were attached, passport-size photo was accepted, and parent support fund first installment was verified.',
    courseInterest: 'General Grade 9 intake',
    medicalNote: 'No medical issues declared.',
    checklistStatus: [
      'Grade 8 certificate and NCD offer letter verified.',
      'Acceptance letter attached.',
      'Passport-size photo attached.',
      'Birth evidence attached.',
    ],
    fileSet: [
      { label: 'Grade 9 Registration Form', type: 'document', url: grade9Doc },
      { label: 'Applicant Passport Photo', type: 'image', url: principalPhoto },
      { label: 'Verification Scan', type: 'image', url: examHallPhoto },
    ],
  },
  {
    formTitle: 'Grade 10 Transfer',
    applicantType: 'Transfer / Repeat',
    status: 'Pending',
    reviewer: 'Academic Review Desk',
    paymentStatus: 'Awaiting K1050',
    decision: 'Pending fee confirmation and cumulative report review.',
    notes:
      'The transfer report is attached, but finance has not confirmed the first installment payment yet.',
    courseInterest: 'Transfer into Grade 10 stream',
    medicalNote: 'Awaiting attached doctor report verification.',
    checklistStatus: [
      'Grade 8 certificate attached.',
      'Grade 9 term reports attached.',
      'Photo attached.',
      'Payment still outstanding.',
    ],
    fileSet: [
      { label: 'Grade 10 Transfer Form', type: 'document', url: grade10TransferDoc },
      { label: 'Academic Report Scan', type: 'image', url: examHallPhoto },
      { label: 'Applicant Photo', type: 'image', url: schoolLogo },
    ],
  },
  {
    formTitle: 'Grade 11',
    applicantType: 'Continuing',
    status: 'Approved',
    reviewer: 'Senior Registrar',
    paymentStatus: 'Paid K550',
    decision: 'Approved with all continuing-student requirements complete.',
    notes:
      'Grade 10 certificate copy and acceptance letter matched the student record. Medical declaration not required.',
    courseInterest: 'Continuing Grade 11 placement',
    medicalNote: 'No medical concerns listed.',
    checklistStatus: [
      'Grade 10 certificate verified.',
      'Acceptance letter verified.',
      'Photo attached.',
      'Payment cleared.',
    ],
    fileSet: [
      { label: 'Grade 11 Registration Form', type: 'document', url: grade11Doc },
      { label: 'School ID Photo', type: 'image', url: principalPhoto },
      { label: 'Term Report Copy', type: 'image', url: examHallPhoto },
    ],
  },
  {
    formTitle: 'Grade 12',
    applicantType: 'Continuing',
    status: 'Review',
    reviewer: 'Student Welfare',
    paymentStatus: 'Paid K550',
    decision: 'Held for medical report confirmation before final class placement.',
    notes:
      'Applicant disclosed an ongoing medical condition. Doctor report was referenced but needs verification before the file is closed.',
    courseInterest: 'Continuing Grade 12 placement',
    medicalNote: 'Declared asthma history with attached doctor comment.',
    checklistStatus: [
      'Grade 11 term 4 report attached.',
      'Payment cleared.',
      'Medical report under review.',
      'Final clearance pending.',
    ],
    fileSet: [
      { label: 'Grade 12 Registration Form', type: 'document', url: grade12Doc },
      { label: 'Medical Review Photo', type: 'image', url: principalPhoto },
      { label: 'Grade Report Scan', type: 'image', url: examHallPhoto },
    ],
  },
  {
    formTitle: 'NC 1 & 2',
    applicantType: 'Certificate course',
    status: 'Approved',
    reviewer: 'NC Admissions Team',
    paymentStatus: 'Paid K2000',
    decision: 'Accepted into the NC 1 intake queue for course placement.',
    notes:
      'The applicant selected Office Administration and supplied both grade certificates plus the required photo copies.',
    courseInterest: 'Office Administration',
    medicalNote: 'No medical issues declared.',
    checklistStatus: [
      'Grade 10 and 12 certificates attached.',
      'Course choice recorded.',
      'Two photos confirmed.',
      'First installment cleared.',
    ],
    fileSet: [
      { label: 'NC 1 & 2 Registration Form', type: 'document', url: nc12Doc },
      { label: 'Applicant Photo', type: 'image', url: schoolLogo },
      { label: 'Course Interview Scan', type: 'image', url: examHallPhoto },
    ],
  },
  {
    formTitle: 'Grade 9 Transfer',
    applicantType: 'Transfer / Re-instate / Repeat',
    status: 'Rejected',
    reviewer: 'Admissions Committee',
    paymentStatus: 'Not received',
    decision: 'Rejected because compulsory documents and fee payment were missing.',
    notes:
      'Application arrived late and was not accompanied by the required birth evidence or first-installment support payment.',
    courseInterest: 'Transfer back into Grade 9',
    medicalNote: 'No medical report submitted.',
    checklistStatus: [
      'Offer letter missing.',
      'Birth evidence missing.',
      'No payment receipt attached.',
      'Late registration not entertained.',
    ],
    fileSet: [
      { label: 'Transfer Cover Letter', type: 'document', url: grade10TransferDoc },
      { label: 'Late Submission Scan', type: 'image', url: examHallPhoto },
      { label: 'Profile Photo', type: 'image', url: principalPhoto },
    ],
  },
]

function buildResult(index) {
  const template = applicantTemplates[index % applicantTemplates.length]
  const applicantName = namePool[index]
  const applicantNumber = index + 1
  const month = String((index % 2) + 1).padStart(2, '0')
  const day = String((index % 24) + 1).padStart(2, '0')
  const gender = index % 2 === 0 ? 'Female' : 'Male'
  const lastSchools = [
    'Sacred Heart Primary',
    'Hohola Demonstration School',
    'Gerehu Secondary',
    'Port Moresby Secondary',
  ]

  return {
    id: `ADM-2026-${String(applicantNumber).padStart(3, '0')}`,
    applicantName,
    formTitle: template.formTitle,
    applicantType: template.applicantType,
    status: template.status,
    submittedOn: `2026-${month}-${day}`,
    paymentStatus: template.paymentStatus,
    reviewer: template.reviewer,
    decision: template.decision,
    notes: template.notes,
    checklistStatus: template.checklistStatus,
    email: `${applicantName.toLowerCase().replace(/\s+/g, '.')}@mail.com`,
    whatsapp: `6757${String(2000000 + applicantNumber * 237).slice(0, 7)}`,
    guardianName: applicantNumber % 2 === 0 ? 'Martha Naka' : 'Joseph Tuli',
    guardianContact: `6757${String(4000000 + applicantNumber * 193).slice(0, 7)}`,
    dateOfBirth: `200${index % 8}-0${(index % 8) + 1}-1${index % 9}`,
    age: 14 + (index % 7),
    gender,
    address: `${10 + applicantNumber} Hohola Street, Port Moresby`,
    homeProvince: ['NCD', 'Central', 'Gulf', 'Morobe'][index % 4],
    lastSchool: lastSchools[index % lastSchools.length],
    courseInterest: template.courseInterest,
    medicalNote: template.medicalNote,
    interviewDate: `2026-02-${String((index % 20) + 1).padStart(2, '0')}`,
    registeredBy: template.reviewer,
    profilePhoto: index % 3 === 0 ? principalPhoto : index % 3 === 1 ? schoolLogo : examHallPhoto,
    uploadedFiles: template.fileSet.map((file, fileIndex) => ({
      id: `${String(applicantNumber).padStart(3, '0')}-FILE-${fileIndex + 1}`,
      label: file.label,
      type: file.type,
      url: file.url,
    })),
  }
}

export const initialAdmissionResults = Array.from({ length: 24 }, (_, index) => buildResult(index))

const portalSessionKey = 'lasalle-admin-session'
const admissionResultsKey = 'lasalle-admission-results'

export function getPortalSession() {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = window.localStorage.getItem(portalSessionKey)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw)
  } catch {
    window.localStorage.removeItem(portalSessionKey)
    return null
  }
}

export function setPortalSession(session) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(portalSessionKey, JSON.stringify(session))
}

export function clearPortalSession() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(portalSessionKey)
}

export function getAdmissionResults() {
  if (typeof window === 'undefined') {
    return initialAdmissionResults
  }

  const raw = window.localStorage.getItem(admissionResultsKey)

  if (!raw) {
    window.localStorage.setItem(admissionResultsKey, JSON.stringify(initialAdmissionResults))
    return initialAdmissionResults
  }

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : initialAdmissionResults
  } catch {
    window.localStorage.setItem(admissionResultsKey, JSON.stringify(initialAdmissionResults))
    return initialAdmissionResults
  }
}

export function saveAdmissionResults(results) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(admissionResultsKey, JSON.stringify(results))
  window.dispatchEvent(new CustomEvent('admission-results-updated'))
}