import { useNavigate } from 'react-router-dom'
import AdmissionFormPage from '../components/admissions/AdmissionFormPage'

export default function Grade9TransferAdmissionPage() {
  const navigate = useNavigate()

  return <AdmissionFormPage slug="grade-9-transfer" navigate={navigate} />
}