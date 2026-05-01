import { useState } from 'react'
import { admissionFormMap, admissionForms } from '../../data/admissionForms'

const gradeBaseSections = (form) => [
  {
    title: 'Office Use',
    description: 'The original document reserves these fields for school processing.',
    fields: [
      {
        name: 'applicationNumber',
        label: 'Application number',
        type: 'text',
        placeholder: 'Office only',
      },
      {
        name: 'passportPhoto',
        label: 'Passport size photo of the student',
        type: 'file',
        accept: '.png,.jpg,.jpeg,.pdf',
      },
    ],
  },
  {
    title: 'Personal Information',
    fields: [
      { name: 'surname', label: 'Surname', required: true },
      { name: 'givenName', label: 'Given Name', required: true },
      {
        name: 'schoolLastAttended',
        label: 'School last attended (Name)',
        defaultValue: form.defaults?.schoolLastAttended ?? '',
      },
      {
        name: 'gradeLastAttended',
        label: 'Grade last attended',
        defaultValue: form.defaults?.gradeLastAttended ?? '',
      },
      {
        name: 'yearLastAttended',
        label: 'Year',
        defaultValue: form.defaults?.yearLastAttended ?? '',
      },
      {
        name: 'reasonForChoosing',
        label: 'Reason for choosing La Salle Tech. Secondary, Hohola',
        type: 'radio',
        options: form.reasonOptions,
      },
      {
        name: 'applyingGrade',
        label: 'What Grade are you applying?',
        defaultValue: form.defaults?.applyingGrade ?? '',
      },
      { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
      { name: 'age', label: 'Age', type: 'number', min: 0 },
      { name: 'religion', label: 'Religion / Denomination' },
      {
        name: 'sacraments',
        label: 'Sacraments Received',
        type: 'checkbox-group',
        options: form.sacramentOptions,
      },
      { name: 'physicalDisabilities', label: 'Physical Disabilities' },
      { name: 'seriousIllness', label: 'Serious Illness' },
      { name: 'sectionUnit', label: 'Residential Address: Section / Unit' },
      { name: 'lotBuilding', label: 'Lot / Building' },
      { name: 'streetName', label: 'Street Name' },
      { name: 'suburb', label: 'Suburb' },
      { name: 'postalAddress', label: 'Postal Address', type: 'textarea' },
      { name: 'homeProvince', label: 'Home Province' },
    ],
  },
  {
    title: 'Family Information',
    fields: [
      { name: 'fatherName', label: 'Father’s Name' },
      { name: 'motherName', label: 'Mother’s Name' },
      { name: 'fatherAddress', label: 'Father’s Address', type: 'textarea' },
      { name: 'motherAddress', label: 'Mother’s Address', type: 'textarea' },
      { name: 'fatherHomeProvince', label: 'Father’s Home Province' },
      { name: 'motherHomeProvince', label: 'Mother’s Home Province' },
      { name: 'fatherOccupation', label: 'Father’s Occupation' },
      { name: 'motherOccupation', label: 'Mother’s Occupation' },
      { name: 'fatherContactNumber', label: 'Father’s Contact Number', type: 'tel' },
      { name: 'motherContactNumber', label: 'Mother’s Contact Number', type: 'tel' },
      { name: 'fatherEmailAddress', label: 'Father’s Email Address', type: 'email' },
      { name: 'motherEmailAddress', label: 'Mother’s Email Address', type: 'email' },
      { name: 'fatherEmployer', label: 'Father’s Employer' },
      { name: 'motherEmployer', label: 'Mother’s Employer' },
      { name: 'fatherEmployerNumber', label: 'Father’s Employer Number', type: 'tel' },
      { name: 'motherEmployerNumber', label: 'Mother’s Employer Number', type: 'tel' },
    ],
  },
  {
    title: 'Guardian And Emergency Contact',
    description: 'Complete this section if the student is living with a guardian.',
    fields: [
      { name: 'guardianFullName', label: 'Guardian’s full Name' },
      { name: 'guardianContactNumber', label: 'Guardian’s Contact Number', type: 'tel' },
      { name: 'guardianRelationship', label: 'Relationship to guardian' },
      { name: 'guardianOccupation', label: 'Guardian’s Occupation' },
      { name: 'emergencyContactPerson', label: 'Contact Person/s in case of emergency' },
      { name: 'emergencyContactNumber', label: 'Emergency Contact No.', type: 'tel' },
      {
        name: 'transportMode',
        label: 'Mode of transport to and from school daily',
        type: 'select',
        options: form.transportOptions,
      },
      {
        name: 'supportPaidBy',
        label: form.supportLabel,
        type: 'select',
        options: form.payerOptions,
      },
    ],
  },
]

const ncSections = (form) => [
  {
    title: 'Office Use',
    description: 'The school completes these fields during registration processing.',
    fields: [
      {
        name: 'applicationNumber',
        label: 'Application number',
        type: 'text',
        placeholder: 'Office only',
      },
      {
        name: 'passportPhoto',
        label: 'Photo of the student (passport size photo)',
        type: 'file',
        accept: '.png,.jpg,.jpeg,.pdf',
      },
    ],
  },
  {
    title: 'Personal Information',
    fields: [
      { name: 'surname', label: 'Surname', required: true },
      { name: 'givenName', label: 'Given Name', required: true },
      { name: 'schoolLastAttended', label: 'School (Name) last attended' },
      { name: 'yearGradeLastAttended', label: 'Year / Grade last attended' },
      { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
      { name: 'age', label: 'Age', type: 'number', min: 0 },
      { name: 'placeOfBirth', label: 'Place of Birth' },
      { name: 'religion', label: 'Religion / Denomination' },
      { name: 'gender', label: 'Gender', type: 'radio', options: form.genderOptions },
      {
        name: 'sacraments',
        label: 'Sacraments Received',
        type: 'checkbox-group',
        options: form.sacramentOptions,
      },
      {
        name: 'physicalDisabilitiesIllnessAllergies',
        label: 'Physical Disabilities / Illness / Allergies',
        type: 'textarea',
      },
      { name: 'medicalDoctor', label: 'Medical Doctor' },
      { name: 'residentialSuburb', label: 'Residential Suburb' },
      { name: 'streetName', label: 'Street Name' },
      {
        name: 'courseApplying',
        label: 'What Course (National Certificate 1) are you applying?',
        type: 'select',
        options: form.courses,
      },
      { name: 'upgradeSubjectOne', label: 'Grade 10 / 12 upgrade subject 1' },
      { name: 'upgradeSubjectTwo', label: 'Grade 10 / 12 upgrade subject 2' },
      { name: 'upgradeSubjectThree', label: 'Grade 10 / 12 upgrade subject 3' },
    ],
  },
  {
    title: 'Family Information',
    fields: [
      { name: 'fatherName', label: 'Father’s Name' },
      { name: 'motherName', label: 'Mother’s Name' },
      { name: 'fatherAddress', label: 'Father’s Address', type: 'textarea' },
      { name: 'motherAddress', label: 'Mother’s Address', type: 'textarea' },
      { name: 'fatherHomeProvince', label: 'Father’s Home Province' },
      { name: 'motherHomeProvince', label: 'Mother’s Home Province' },
      { name: 'fatherOccupation', label: 'Father’s Occupation' },
      { name: 'motherOccupation', label: 'Mother’s Occupation' },
      { name: 'fatherContactNumber', label: 'Father’s Contact Number', type: 'tel' },
      { name: 'motherContactNumber', label: 'Mother’s Contact Number', type: 'tel' },
      { name: 'fatherEmailAddress', label: 'Father’s Email Address', type: 'email' },
      { name: 'motherEmailAddress', label: 'Mother’s Email Address', type: 'email' },
      { name: 'fatherEmployer', label: 'Father’s Employer' },
      { name: 'motherEmployer', label: 'Mother’s Employer' },
      { name: 'fatherEmployerNumber', label: 'Father’s Employer Number', type: 'tel' },
      { name: 'motherEmployerNumber', label: 'Mother’s Employer Number', type: 'tel' },
    ],
  },
  {
    title: 'Guardian And Emergency Contact',
    description: 'Complete this section if the student is living with a guardian or relatives.',
    fields: [
      { name: 'guardianFullName', label: 'Guardian’s full Name' },
      { name: 'guardianContactNumber', label: 'Guardian’s Contact Number', type: 'tel' },
      { name: 'guardianRelationship', label: 'Relationship to guardian' },
      { name: 'guardianOccupation', label: 'Guardian’s Occupation' },
      { name: 'emergencyContactPerson', label: 'Contact Person/s in case of emergency' },
      { name: 'emergencyContactNumber', label: 'Emergency Contact No.', type: 'tel' },
      {
        name: 'transportMode',
        label: 'Mode of transport to and from school daily',
        type: 'select',
        options: form.transportOptions,
      },
      {
        name: 'supportPaidBy',
        label: form.supportLabel,
        type: 'select',
        options: form.payerOptions,
      },
    ],
  },
]

const declarationFields = [
  { name: 'studentDeclarationName', label: 'Student’s Name', required: true },
  { name: 'studentSignature', label: 'Student Signature' },
  { name: 'studentDeclarationDate', label: 'Date', type: 'date' },
  { name: 'parentGuardianDeclarationName', label: 'Parent’s / Guardian’s Name', required: true },
  { name: 'parentGuardianSignature', label: 'Parent’s / Guardian’s Signature' },
]

const officeUseFields = [
  { name: 'officeDateReceived', label: 'Date of registration form received', type: 'date' },
  { name: 'receivingStaffName', label: 'Name of the receiving staff' },
  { name: 'receivingStaffSignature', label: 'Staff signature' },
]

function Field({ field }) {
  const inputClasses =
    'mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100'

  if (field.type === 'textarea') {
    return (
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">{field.label}</span>
        <textarea
          name={field.name}
          rows={4}
          defaultValue={field.defaultValue}
          required={field.required}
          className={inputClasses}
        />
      </label>
    )
  }

  if (field.type === 'select') {
    return (
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">{field.label}</span>
        <select
          name={field.name}
          defaultValue={field.defaultValue ?? ''}
          required={field.required}
          className={inputClasses}
        >
          <option value="">Select an option</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    )
  }

  if (field.type === 'radio') {
    return (
      <fieldset className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <legend className="px-2 text-sm font-semibold text-slate-700">{field.label}</legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {field.options.map((option) => (
            <label
              key={option}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
            >
              <input type="radio" name={field.name} value={option} defaultChecked={field.defaultValue === option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
    )
  }

  if (field.type === 'checkbox-group') {
    return (
      <fieldset className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <legend className="px-2 text-sm font-semibold text-slate-700">{field.label}</legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {field.options.map((option) => (
            <label
              key={option}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700"
            >
              <input type="checkbox" name={`${field.name}-${option}`} value={option} />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>
    )
  }

  if (field.type === 'file') {
    return (
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">{field.label}</span>
        <input
          type="file"
          name={field.name}
          accept={field.accept}
          className={`${inputClasses} file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white`}
        />
      </label>
    )
  }

  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{field.label}</span>
      <input
        type={field.type ?? 'text'}
        name={field.name}
        defaultValue={field.defaultValue}
        placeholder={field.placeholder}
        min={field.min}
        required={field.required}
        className={inputClasses}
      />
    </label>
  )
}

export default function AdmissionFormPage({ slug, navigate }) {
  const [submitted, setSubmitted] = useState(false)
  const form = admissionFormMap[slug]

  if (!form) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="rounded-[2rem] border border-rose-200 bg-rose-50 p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-rose-900">Admission form not found</h1>
          <p className="mt-3 text-sm leading-6 text-rose-800">
            The requested admission form does not exist in the current data set.
          </p>
          <button
            type="button"
            onClick={() => navigate('/admissions')}
            className="mt-6 rounded-full bg-rose-700 px-5 py-3 text-sm font-semibold text-white"
          >
            Back to admissions
          </button>
        </div>
      </section>
    )
  }

  const sections = form.template === 'nc' ? ncSections(form) : gradeBaseSections(form)
  const otherForms = admissionForms.filter((item) => item.slug !== slug)

  return (
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/95 shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
        <div className="bg-gradient-to-r from-slate-950 via-sky-900 to-cyan-700 px-6 py-10 text-white sm:px-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-4xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200">
                {form.formHeading}
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{form.title}</h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-cyan-50 sm:text-base">
                {form.shortTitle}. Complete every field carefully to match the school registration
                form.
              </p>
            </div>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white">
              {form.badge}
            </span>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <div className="rounded-[1.5rem] bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">
                Registration Schedule
              </p>
              <p className="mt-3 text-sm leading-6 text-white">{form.registrationSchedule}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">
                Payment Summary
              </p>
              <p className="mt-3 text-sm leading-6 text-white">Total: {form.paymentSummary.total}</p>
              <p className="mt-1 text-sm leading-6 text-cyan-50">
                First installment: {form.paymentSummary.firstInstallment}
              </p>
              <p className="mt-1 text-sm leading-6 text-cyan-50">{form.paymentSummary.extras}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-5 backdrop-blur-sm">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-200">
                Source Document
              </p>
              <a
                href={form.documentUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900"
              >
                Open {form.documentName}
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-8 px-6 py-8 sm:px-10 xl:grid-cols-[1.45fr_0.9fr]">
          <form
            className="space-y-8"
            onSubmit={(event) => {
              event.preventDefault()
              setSubmitted(true)
            }}
          >
            {submitted && (
              <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-900">
                Form captured in the browser. Connect this submit action to your backend or email
                workflow when you are ready to receive admissions online.
              </div>
            )}

            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
              >
                <div className="mb-6">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">{section.title}</h2>
                  {section.description && (
                    <p className="mt-2 text-sm leading-6 text-slate-600">{section.description}</p>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {section.fields.map((field) => (
                    <div
                      key={field.name}
                      className={field.type === 'textarea' || field.type === 'checkbox-group' || field.type === 'radio' ? 'md:col-span-2' : ''}
                    >
                      <Field field={field} />
                    </div>
                  ))}
                </div>

                {form.template === 'nc' && section.title === 'Personal Information' && form.courseNote && (
                  <div className="mt-5 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                    {form.courseNote}
                  </div>
                )}
              </div>
            ))}

            <div className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Declaration</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                I/We hereby certify that I/We have read all the information and declare that the
                information given is correct to the best of our knowledge.
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {declarationFields.map((field) => (
                  <Field key={field.name} field={field} />
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Office Use Only</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {officeUseFields.map((field) => (
                  <Field key={field.name} field={field} />
                ))}
              </div>
              <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                <p className="font-semibold uppercase tracking-[0.2em] text-slate-500">Approved</p>
                <p className="mt-2 text-slate-900">Br. Antony Samy PANCRAS, FSC</p>
                <p>Principal</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_32px_rgba(15,23,42,0.18)] transition hover:bg-sky-700"
              >
                Submit form
              </button>
              <button
                type="button"
                onClick={() => navigate('/admissions')}
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Back to all admissions
              </button>
            </div>
          </form>

          <aside className="space-y-6">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Checklist</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{form.checklistIntro}</p>
              <div className="mt-4 rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                {form.checklistWarning}
              </div>
              <ol className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
                {form.checklist.map((item) => (
                  <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Conditions</h2>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
                {form.conditions.map((item) => (
                  <li key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-6 text-slate-100 shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">Note</p>
              <p className="mt-4 text-sm leading-7 text-slate-200">{form.note}</p>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Other Forms</h2>
              <div className="mt-5 space-y-3">
                {otherForms.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => navigate(`/admissions/${item.slug}`)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left transition hover:border-sky-300 hover:bg-sky-50"
                  >
                    <p className="text-sm font-semibold text-slate-900">{item.navLabel}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{item.badge}</p>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}