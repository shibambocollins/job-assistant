import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthenticatedLayout } from './components/AuthenticatedLayout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Cv } from './pages/Cv';
import { JobDetail } from './pages/JobDetail';
import { Chat } from './pages/Chat';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<AuthenticatedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cv" element={<Cv />} />
            <Route path="/jobs/:id" element={<JobDetail />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
