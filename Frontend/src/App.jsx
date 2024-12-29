import './App.css'
import { Dashboard } from './components/Dashboard'
import Login from './pages/Login'
import HomeScreen from './pages/HomeScreen'
import ProfileScreen from './pages/ProfileScreen'
import ProgressScreen from './pages/ProgressScreen'
import { BrowserRouter, Route, Routes } from 'react-router'
import TutorScreenCPlusPlus from './pages/TutorScreenCPlusPlus'
import TutorScreenPython from './pages/TutorScreenPython'
import TutorScreenJava from './pages/TutorScreenJava'
import { ProtectedRoutes } from './components/ProtectedRoutes'
import { Toaster } from 'sonner'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" index element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route element={<Dashboard />} >
              <Route index element={<HomeScreen />} />
              <Route path="perfil" element={<ProfileScreen />} />
              <Route path="progreso" element={<ProgressScreen />} />
            </Route>

            <Route path="cpp">
              <Route index element={<TutorScreenCPlusPlus />} />
            </Route>

            <Route path="python">
              <Route index element={<TutorScreenPython />} />
            </Route>

            <Route path="java">
              <Route index element={<TutorScreenJava />} />
            </Route>

            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster />
    </div>
  )
}

export default App
