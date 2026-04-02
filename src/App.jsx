import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ProgramsPage from './pages/ProgramsPage'
import ProgramDetail from './pages/ProgramDetail'
import AdmissionsPage from './pages/AdmissionsPage'
import ContactPage from './pages/ContactPage'
import HistoryPage from './pages/HistoryPage'
import StudentHandbookPage from './pages/StudentHandbookPage'

function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto w-full px-6 pb-12">
        <Navbar />
        <main className="grid gap-16 py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/programs/:slug" element={<ProgramDetail />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/handbook" element={<StudentHandbookPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
