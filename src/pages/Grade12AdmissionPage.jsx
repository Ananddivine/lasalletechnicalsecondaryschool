import { useNavigate } from 'react-router-dom'
import AdmissionFormPage from '../components/admissions/AdmissionFormPage'

export default function Grade12AdmissionPage() {
  const navigate = useNavigate()

  return <AdmissionFormPage slug="grade-12" navigate={navigate} />
}