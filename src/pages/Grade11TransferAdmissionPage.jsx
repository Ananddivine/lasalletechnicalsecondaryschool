import { useNavigate } from 'react-router-dom'
import AdmissionFormPage from '../components/admissions/AdmissionFormPage'

export default function Grade11TransferAdmissionPage() {
  const navigate = useNavigate()

  return <AdmissionFormPage slug="grade-11-transfer" navigate={navigate} />
}