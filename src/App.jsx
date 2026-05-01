import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import AdminLayout from './components/admin/AdminLayout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProgramsPage from './pages/ProgramsPage'
import ProgramDetail from './pages/ProgramDetail'
import AdmissionsPage from './pages/AdmissionsPage'
import AdminActivitiesPage from './pages/AdminActivitiesPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminManagePage from './pages/AdminManagePage'
import AdmissionResultDetailPage from './pages/AdmissionResultDetailPage'
import AdmissionResultsPage from './pages/AdmissionResultsPage'
import Grade9AdmissionPage from './pages/Grade9AdmissionPage'
import Grade9TransferAdmissionPage from './pages/Grade9TransferAdmissionPage'
import Grade10AdmissionPage from './pages/Grade10AdmissionPage'
import Grade10TransferAdmissionPage from './pages/Grade10TransferAdmissionPage'
import Grade11AdmissionPage from './pages/Grade11AdmissionPage'
import Grade11TransferAdmissionPage from './pages/Grade11TransferAdmissionPage'
import Grade12AdmissionPage from './pages/Grade12AdmissionPage'
import NC12AdmissionPage from './pages/NC12AdmissionPage'
import ContactPage from './pages/ContactPage'
import HistoryPage from './pages/HistoryPage'
import StudentHandbookPage from './pages/StudentHandbookPage'

function AppContent() {
  const location = useLocation()
  const isPortalRoute = location.pathname.startsWith('/portal')

  return (
    <div className={isPortalRoute ? 'w-full' : 'mx-auto w-full px-6 pb-12'}>
      {!isPortalRoute && <Navbar />}
      <main className={isPortalRoute ? '' : 'grid gap-16 py-6'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/:slug" element={<ProgramDetail />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/admissions/grade-9" element={<Grade9AdmissionPage />} />
          <Route path="/admissions/grade-9-transfer" element={<Grade9TransferAdmissionPage />} />
          <Route path="/admissions/grade-10" element={<Grade10AdmissionPage />} />
          <Route path="/admissions/grade-10-transfer" element={<Grade10TransferAdmissionPage />} />
          <Route path="/admissions/grade-11" element={<Grade11AdmissionPage />} />
          <Route path="/admissions/grade-11-transfer" element={<Grade11TransferAdmissionPage />} />
          <Route path="/admissions/grade-12" element={<Grade12AdmissionPage />} />
          <Route path="/admissions/nc-1-2" element={<NC12AdmissionPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/handbook" element={<StudentHandbookPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/portal/login" element={<AdminLoginPage />} />
          <Route path="/portal" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="manage" element={<AdminManagePage />} />
            <Route path="activities" element={<AdminActivitiesPage />} />
            <Route path="results" element={<AdmissionResultsPage />} />
            <Route path="results/:resultId" element={<AdmissionResultDetailPage />} />
          </Route>
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
      {!isPortalRoute && <Footer />}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
