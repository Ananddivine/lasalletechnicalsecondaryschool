import { useNavigate } from 'react-router-dom'
import AdmissionsPageView from '../components/admissions/AdmissionsPage'

export default function AdmissionsPage() {
  const navigate = useNavigate()

  return <AdmissionsPageView navigate={navigate} />
}