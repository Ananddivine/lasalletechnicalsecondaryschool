import { useNavigate } from 'react-router-dom'
import AdmissionFormPage from '../components/admissions/AdmissionFormPage'

export default function NC12AdmissionPage() {
  const navigate = useNavigate()

  return <AdmissionFormPage slug="nc-1-2" navigate={navigate} />
}