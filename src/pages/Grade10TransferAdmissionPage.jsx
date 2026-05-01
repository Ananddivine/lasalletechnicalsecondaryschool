import { useNavigate } from 'react-router-dom'
import AdmissionFormPage from '../components/admissions/AdmissionFormPage'

export default function Grade10TransferAdmissionPage() {
  const navigate = useNavigate()

  return <AdmissionFormPage slug="grade-10-transfer" navigate={navigate} />
}