import grade9Doc from '../assets/GRADE 9.docx?url'
import grade9TransferDoc from '../assets/GRADE 9 TRANSFER.docx?url'
import grade10Doc from '../assets/GRADE 10.docx?url'
import grade10TransferDoc from '../assets/GRADE 10 TRANSFER.docx?url'
import grade11Doc from '../assets/GRADE 11.docx?url'
import grade11TransferDoc from '../assets/GRADE 11 TRANSFER.docx?url'
import grade12Doc from '../assets/GRADE 12.docx?url'
import nc12Doc from '../assets/NC 1 & 2.docx?url'

const gradeChecklistWarning =
  'These documents will be verified and kept for school records. Submission of false or forged documents will lead to termination, expulsion, and legal action.'

const gradeCommonFields = {
  reasonOptions: ['Selected', 'Interested'],
  sacramentOptions: ['Baptism', 'Holy Communion', 'Confirmation'],
  transportOptions: ['PMV', 'Own Vehicle', 'Company Car', 'Walk (By foot)'],
  payerOptions: ['Parents', 'Guardians', 'Employer', 'Government', 'Company', 'Others'],
}

export const admissionForms = [
  {
    slug: 'grade-9',
    navLabel: 'Grade 9',
    title: 'Grade 9 Student Registration Form - 2026',
    shortTitle: 'Grade 9 New Intake',
    badge: 'New intake',
    template: 'grade',
    documentUrl: grade9Doc,
    documentName: 'GRADE 9.docx',
    formHeading: 'Grade 9',
    formSubheading: '2026 student registration form',
    registrationSchedule: 'Tuesday, 20th & Wednesday 21st January 2026 at 8am',
    checklistIntro:
      'The school registration committee will check all documents on the registration day listed above before students are allowed to attend classes.',
    checklistWarning: gradeChecklistWarning,
    checklist: [
      'Copy of the Grade 8 Certificate / Attainment Certificate and offer letter from the NCD Education Service (compulsory).',
      'Acceptance letter from La Salle Technical Secondary School Hohola (compulsory).',
      'ID photograph attached on the front page. Must be a proper passport size photo (compulsory).',
      'If the student has a medical issue, a doctor\'s report must be attached (compulsory).',
      'Copy of NID / Birth Certificate / Evidence of Birth Date / Clinic Book copy (compulsory).',
    ],
    conditions: [
      'Grade 9 students\' Parents support fund and GTFS parental component is K 1000.00.',
      'Every student is required to pay K500 as the first installment of the parents support fund and Government Tuition Fee Subsidy (GTFS) parental component.',
      'Every student is required to wear full school uniform, ID card, and a pair of formal black shoes to school every day.',
      'New intake students\' registration, school uniform, and accessories fee is K320. School provides school uniform and accessories.',
      'Registration form, school uniform, and school accessories fee is separate from the school fees.',
      'Registration, school uniform, accessories, and first installment parents/guardians support fund will not be refunded.',
    ],
    note:
      'Parents / Guardians / Students are required to bring the completed application on the registration day. No application will be accepted without the first installment of parents/guardians support fund payment of K500. Late application will not be considered.',
    paymentSummary: {
      total: 'K 1000.00',
      firstInstallment: 'K500',
      extras: 'K320 new intake registration, school uniform, and accessories',
    },
    defaults: {
      applyingGrade: 'Grade 9',
    },
    supportLabel: 'School support fund will be paid by',
    ...gradeCommonFields,
  },
  {
    slug: 'grade-9-transfer',
    navLabel: 'Grade 9 Transfer',
    title: 'Grade 9 Student Registration Form - 2026',
    shortTitle: 'Grade 9 Transfer / Re-instate / Repeat',
    badge: 'Transfer / Re-instate / Repeat',
    template: 'grade',
    documentUrl: grade9TransferDoc,
    documentName: 'GRADE 9 TRANSFER.docx',
    formHeading: 'Grade 9',
    formSubheading: '2026 re-instate / transfer-in / repeat form',
    registrationSchedule: 'Tuesday, 20th & Wednesday 21st January 2026 at 8am',
    checklistIntro:
      'The school registration committee will check all documents on the registration day listed above before students are allowed to attend classes.',
    checklistWarning: gradeChecklistWarning,
    checklist: [
      'Copy of the Grade 8 Certificate / Attainment Certificate and offer letter from the NCD Education Service (compulsory).',
      'Acceptance letter from La Salle Technical Secondary School Hohola (compulsory).',
      'ID photograph attached on the front page. Must be a proper passport size photo (compulsory).',
      'If the student has a medical issue, a doctor\'s report must be attached (compulsory).',
      'Copy of NID / Birth Certificate / Evidence of Birth Date / Clinic Book copy (compulsory).',
    ],
    conditions: [
      'Grade 9 students\' Parents support fund and GTFS parental component is K 2,100.00.',
      'Every student is required to pay K1050 as the first installment of the parents support fund and Government Tuition Fee Subsidy (GTFS) parental component.',
      'Every student is required to wear full school uniform, ID card, and a pair of formal black shoes to school every day.',
      'Students\' registration, school uniform, and accessories fee is K320. School provides school uniform and accessories.',
      'Registration form, school uniform, and school accessories fee is separate from the school fees.',
      'Registration, school uniform, accessories, and first installment parents/guardians support fund will not be refunded.',
    ],
    note:
      'Parents / Guardians / Students are required to bring the completed application on the registration day. No application will be accepted without the first installment of parents/guardians support fund payment of K1050. Late application will not be considered.',
    paymentSummary: {
      total: 'K 2,100.00',
      firstInstallment: 'K1050',
      extras: 'K320 registration, school uniform, and accessories',
    },
    supportLabel: 'School support fund will be paid by',
    ...gradeCommonFields,
  },
  {
    slug: 'grade-10',
    navLabel: 'Grade 10',
    title: 'Grade 10 Student Registration Form - 2026',
    shortTitle: 'Grade 10 Continuing Students',
    badge: 'Continuing students',
    template: 'grade',
    documentUrl: grade10Doc,
    documentName: 'GRADE 10.docx',
    formHeading: 'Grade 10',
    formSubheading: '2026 continuing student form',
    registrationSchedule: 'Thursday 22nd January 2026 at 8am',
    checklistIntro:
      'The school registration committee will check all documents on the registration day listed above before students are allowed to attend classes.',
    checklistWarning: gradeChecklistWarning,
    checklist: [
      'Acceptance letter from La Salle Technical Secondary School Hohola (compulsory).',
      'Copy of the Grade 9 cumulative and term 4 report (compulsory).',
      'ID photograph attached on the front page. Must be a proper passport size photo (compulsory).',
      'If the student has a medical issue, a doctor\'s report must be attached.',
    ],
    conditions: [
      'Grade 10 students\' Parents support fund and GTFS parental component is K 1000.00.',
      'Every student is required to pay K500 as the first installment of parents support fund and Government Tuition Fee Subsidy (GTFS) parental component.',
      'Every student is required to wear full school uniform, ID card, and a pair of formal black shoes to school every day.',
      'Continuing students\' registration form and school accessories fee is K200.',
      'Registration form, school uniform, and school accessories fee is separate from the school fees.',
      'Registration, accessories, and first installment parents/guardians support fund will not be refunded.',
    ],
    note:
      'Parents / Guardians / Students are required to bring the completed application on the registration day. No application will be accepted without the first installment of parents/guardians support fund payment of K500. Late application will not be considered.',
    paymentSummary: {
      total: 'K 1000.00',
      firstInstallment: 'K500',
      extras: 'K200 continuing registration form and school accessories',
    },
    defaults: {
      schoolLastAttended: 'La Salle Tech Secondary, Hohola',
      gradeLastAttended: 'Grade 9',
      yearLastAttended: '2025',
      applyingGrade: 'Grade 10',
    },
    supportLabel: 'School support fund will be paid by',
    ...gradeCommonFields,
  },
  {
    slug: 'grade-10-transfer',
    navLabel: 'Grade 10 Transfer',
    title: 'Grade 10 Student Registration Form - 2026',
    shortTitle: 'Grade 10 Transfer / Re-instate / Repeat',
    badge: 'Transfer / Re-instate / Repeat',
    template: 'grade',
    documentUrl: grade10TransferDoc,
    documentName: 'GRADE 10 TRANSFER.docx',
    formHeading: 'Grade 10',
    formSubheading: '2026 re-instate / transfer-in / repeat form',
    registrationSchedule: 'Thursday 22nd January 2026',
    checklistIntro:
      'The school registration committee will check all documents on the registration day listed above before students are allowed to attend classes.',
    checklistWarning: gradeChecklistWarning,
    checklist: [
      'Copy of the Grade 8 Certificate and Grade 9 termly assessment report (Term 1-4) with cumulative marks (compulsory).',
      'Acceptance letter from La Salle Technical Secondary School Hohola (compulsory).',
      'ID photograph attached on the front page. Must be a proper passport size photo (compulsory).',
      'If the student has a medical issue, a doctor\'s report must be attached (compulsory).',
      'Copy of NID / Birth Certificate / Evidence of Birth Date / Clinic Book copy (compulsory).',
    ],
    conditions: [
      'Grade 10 students\' Parents support fund and GTFS parental component is K 2100.00.',
      'Every student is required to pay K1050 as the first installment of parents support fund and Government Tuition Fee Subsidy (GTFS) parental component.',
      'Every student is required to wear full school uniform, ID card, and a pair of formal black shoes to school every day.',
      'Students\' registration, school uniform, and accessories fee is K320. School provides school uniform and accessories.',
      'Registration form, school uniform, and school accessories fee is separate from the school fees.',
      'Registration, school uniform, accessories, and first installment parents/guardians support fund will not be refunded.',
    ],
    note:
      'Parents / Guardians / Students are required to bring the completed application on the registration day. No application will be accepted without the first installment of parents/guardians support fund payment of K1050. Late application will not be considered.',
    paymentSummary: {
      total: 'K 2100.00',
      firstInstallment: 'K1050',
      extras: 'K320 registration, school uniform, and accessories',
    },
    supportLabel: 'School support fund will be paid by',
    ...gradeCommonFields,
  },
  {
    slug: 'grade-11',
    navLabel: 'Grade 11',
    title: 'Grade 11 Student Registration Form - 2026',
    shortTitle: 'Grade 11 Continuing Students',
    badge: 'Continuing students',
    template: 'grade',
    documentUrl: grade11Doc,
    documentName: 'GRADE 11.docx',
    formHeading: 'Grade 11',
    formSubheading: '2026 continuing student form',
    registrationSchedule: 'Tuesday, 20th & Wednesday 21st January 2026 at 8am',
    checklistIntro:
      'The school registration committee will check all documents on the registration day listed above before students are allowed to attend classes.',
    checklistWarning: gradeChecklistWarning,
    checklist: [
      'Grade 10 Certificate copy / Attainment Certificate and offer letter from the General Education Services (DoE) (compulsory).',
      'Acceptance letter from La Salle Technical Secondary School Hohola (compulsory).',
      'ID photograph attached on the front page. Must be a proper passport size photo (compulsory).',
      'If the student has a medical issue, a doctor\'s report must be attached (compulsory).',
      'Copy of NID / Birth Certificate / Evidence of Birth Date / Clinic Book copy (compulsory).',
    ],
    conditions: [
      'Grade 11 students\' Parents support fund and GTFS parental component is K 1100.00.',
      'Every student is required to pay K550 as the first installment of parents support fund and Government Tuition Fee Subsidy (GTFS) parental component.',
      'Every student is required to wear full school uniform, ID card, and a pair of formal black shoes to school every day.',
      'Students\' school uniform, accessories, and registration form fee is K200 for continuing students and K320 for new intake.',
      'Registration form, school uniform, and school accessories fee is separate from the school fees.',
      'Registration, school uniform, accessories, and first installment parents/guardians support fund will not be refunded.',
    ],
    note:
      'Parents / Guardians / Students are required to bring the completed application on the registration day. No application will be accepted without the first installment of parents/guardians support fund payment of K550. Late application will not be considered.',
    paymentSummary: {
      total: 'K 1100.00',
      firstInstallment: 'K550',
      extras: 'K200 continuing registration fee or K320 new intake registration and uniform fee',
    },
    supportLabel: 'School support fund will be paid by',
    ...gradeCommonFields,
  },
  {
    slug: 'grade-11-transfer',
    navLabel: 'Grade 11 Transfer',
    title: 'Grade 11 Student Registration Form - 2025',
    shortTitle: 'Grade 11 Transfer / Re-instate / Repeat',
    badge: 'Transfer / Re-instate / Repeat',
    template: 'grade',
    documentUrl: grade11TransferDoc,
    documentName: 'GRADE 11 TRANSFER.docx',
    formHeading: 'Grade 11',
    formSubheading: '2025 re-instate / transfer-in / repeat form',
    registrationSchedule: 'Tuesday, 20th & Wednesday 21st January 2026',
    checklistIntro:
      'The school registration committee will check all documents on the registration day listed above before students are allowed to attend classes.',
    checklistWarning: gradeChecklistWarning,
    checklist: [
      'Grade 10 Certificate copy / Attainment Certificate and offer letter from the General Education Service (DoE) (compulsory).',
      'Acceptance letter from La Salle Technical Secondary School Hohola (compulsory).',
      'ID photograph attached on the front page. Must be a proper passport size photo (compulsory).',
      'If the student has a medical issue, a doctor\'s report must be attached (compulsory).',
      'Copy of NID / Birth Certificate / Evidence of Birth Date / Clinic Book copy (compulsory).',
    ],
    conditions: [
      'Grade 11 students\' Parents support fund and GTFS parental component is K2200.00.',
      'Every student is required to pay K1100 as the first installment of parents support fund and Government Tuition Fee Subsidy (GTFS) parental component.',
      'Every student is required to wear full school uniform, ID card, and a pair of formal black shoes to school every day.',
      'Students\' registration, school uniform, and accessories fee is K320. School provides school uniform and accessories.',
      'Registration form, school uniform, and school accessories fee is separate from the school fees.',
      'Registration, school uniform, accessories, and first installment parents/guardians support fund will not be refunded.',
    ],
    note:
      'Parents / Guardians / Students are required to bring the completed application on the registration day. No application will be accepted without the first installment of parents/guardians support fund payment including school uniform and accessories totaling K1420. Late application will not be considered.',
    paymentSummary: {
      total: 'K2200.00',
      firstInstallment: 'K1100',
      extras: 'K320 registration, school uniform, and accessories',
    },
    supportLabel: 'School support fund will be paid by',
    ...gradeCommonFields,
  },
  {
    slug: 'grade-12',
    navLabel: 'Grade 12',
    title: 'Grade 12 Student Registration Form - 2026',
    shortTitle: 'Grade 12 Continuing Students',
    badge: 'Continuing students',
    template: 'grade',
    documentUrl: grade12Doc,
    documentName: 'GRADE 12.docx',
    formHeading: 'Grade 12',
    formSubheading: '2026 continuing student form',
    registrationSchedule: 'Thursday 22nd January 2025 at 8am',
    checklistIntro:
      'The school registration committee will check all documents on the registration day listed above before students are allowed to attend classes.',
    checklistWarning: gradeChecklistWarning,
    checklist: [
      'Acceptance letter from La Salle Technical Secondary School Hohola (compulsory).',
      'Copy of the Grade 11 cumulative and term 4 report (compulsory).',
      'ID photograph attached on the front page. Must be a proper passport size photo (compulsory).',
      'If the student has a medical issue, a doctor\'s report must be attached.',
    ],
    conditions: [
      'Grade 12 students\' Parents support fund and GTFS parental component is K 1100.00.',
      'Every student is required to pay K550 as the first installment of parents support fund and Government Tuition Fee Subsidy (GTFS) parental component.',
      'Every student is required to wear full school uniform, ID card, and a pair of formal black shoes to school every day.',
      'Continuing students\' registration form and school accessories fee is K200.',
      'Registration form, school uniform, and school accessories fee is separate from the school fees.',
      'Registration, school uniform, accessories, and first installment parents/guardians support fund will not be refunded.',
    ],
    note:
      'Parents / Guardians / Students are required to bring the completed application on the registration day. No application will be accepted without the first installment of parents/guardians support fund payment of K550. Late application will not be considered.',
    paymentSummary: {
      total: 'K 1100.00',
      firstInstallment: 'K550',
      extras: 'K200 continuing registration form and school accessories',
    },
    defaults: {
      schoolLastAttended: 'La Salle Tech Secondary, Hohola',
      gradeLastAttended: 'Grade 11',
      yearLastAttended: '2025',
      applyingGrade: 'Grade 12',
    },
    supportLabel: 'School support fund will be paid by',
    ...gradeCommonFields,
  },
  {
    slug: 'nc-1-2',
    navLabel: 'NC 1 & 2',
    title: 'NC 1 & 2 Student Registration Form - 2026',
    shortTitle: 'NC 1 & 2 National Certificate Course',
    badge: 'FODE upgrade / certificate course',
    template: 'nc',
    documentUrl: nc12Doc,
    documentName: 'NC 1 & 2.docx',
    formHeading: 'NC 1 & 2',
    formSubheading: '2026 national certificate course form',
    registrationSchedule: 'Monday 02nd February 2026 at 8am',
    checklistIntro:
      'The La Salle Technical Secondary staff will check all documents on the registration day listed above before students are allowed to attend classes.',
    checklistWarning:
      'It is not necessary to submit the documents below again if they were already submitted with the entry application. Submission of false or forged documents will lead to termination, expulsion, and legal action.',
    checklist: [
      'Non-school leavers: Original / Copy of the Grade 10 and 12 Certificates (compulsory).',
      'School leavers: Grade 10 Certificate of Attainment copy and 12 Certificate of Attainment (compulsory).',
      'Two ID photographs. One must be attached on the application (compulsory).',
      'If the student has a medical issue, a doctor\'s report must be attached (compulsory).',
      'Copy of NID / Birth Certificate / Evidence of Birth Date / Clinic Book copy (compulsory).',
    ],
    conditions: [
      'NC 1 & 2 students\' school fee is K 4000.00. (K2000 for NC 1 Certificate Course and K2000 for NC 2 Certificate Course).',
      'To enroll/register, every student is required to pay K2000 as the first installment school fee. It is compulsory for all students.',
      'Every student is required to wear full school uniform, ID card, a pair of black shoes, and white socks to school every day.',
      'New intake students\' registration and school uniform and accessories fee is K320. Uniform must be purchased from the school.',
      'Continuing students\' registration form and school accessories fee is K200.',
      'Registration form, school uniform, and school accessories fee is separate from the school fees.',
      'Re-registration form and school accessories fee are non-refundable.',
    ],
    note:
      'Parents / Guardians / Students are requested to bring the completed application on the registration day. Registration form will be accepted with the first installment school fees payment of K2000 and school uniform and accessories payment of K320. Late application will not be accepted.',
    paymentSummary: {
      total: 'K 4000.00',
      firstInstallment: 'K2000',
      extras: 'K320 new intake registration, uniform, and accessories or K200 continuing re-registration and accessories',
    },
    genderOptions: ['Female', 'Male'],
    sacramentOptions: ['Baptism', 'Holy Communion', 'Confirmation'],
    transportOptions: ['PMV', 'Own Vehicle', 'Company Car', 'Walk'],
    payerOptions: ['Parents', 'Guardians', 'Employer', 'Government', 'Council', 'Company', 'Others'],
    supportLabel: 'School fees will be paid by',
    courses: [
      'Electro Technology',
      'Metal Fabrication & Welding',
      'Office Administration (Business Studies)',
      'Tourism & Hospitality (Tourism Operation & Hospitality Commercial Cookery)',
    ],
    courseNote:
      'There is no guarantee that you will be given your preferred course. Placement depends on the space availability of each course.',
  },
]

export const admissionFormMap = Object.fromEntries(
  admissionForms.map((form) => [form.slug, form]),
)