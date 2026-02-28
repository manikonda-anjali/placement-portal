import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import useAuth from '../hooks/useAuth'
import { ROLE_HOME } from '../utils/rolePermissions'

// Auth pages
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

// Admin
import AdminDashboard from '../pages/admin/AdminDashboard'
import UserManagement from '../pages/admin/UserManagement'
import SystemReports from '../pages/admin/SystemReports'

// Student
import StudentDashboard from '../pages/student/StudentDashboard'
import JobListings from '../pages/student/JobListings'
import MyApplications from '../pages/student/MyApplications'
import Profile from '../pages/student/Profile'

// Employer
import EmployerDashboard from '../pages/employer/EmployerDashboard'
import PostJob from '../pages/employer/PostJob'
import ApplicationReview from '../pages/employer/ApplicationReview'

// Officer
import OfficerDashboard from '../pages/officer/OfficerDashboard'
import PlacementTracking from '../pages/officer/PlacementTracking'
import Reports from '../pages/officer/Reports'

function RootRedirect() {
  const { user } = useAuth()
  if (user) return <Navigate to={ROLE_HOME[user.role] || '/login'} replace />
  return <Navigate to="/login" replace />
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UserManagement /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><SystemReports /></ProtectedRoute>} />

        {/* Student Routes */}
        <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/jobs" element={<ProtectedRoute allowedRoles={['student']}><JobListings /></ProtectedRoute>} />
        <Route path="/student/applications" element={<ProtectedRoute allowedRoles={['student']}><MyApplications /></ProtectedRoute>} />
        <Route path="/student/profile" element={<ProtectedRoute allowedRoles={['student']}><Profile /></ProtectedRoute>} />

        {/* Employer Routes */}
        <Route path="/employer" element={<ProtectedRoute allowedRoles={['employer']}><EmployerDashboard /></ProtectedRoute>} />
        <Route path="/employer/post-job" element={<ProtectedRoute allowedRoles={['employer']}><PostJob /></ProtectedRoute>} />
        <Route path="/employer/applications" element={<ProtectedRoute allowedRoles={['employer']}><ApplicationReview /></ProtectedRoute>} />

        {/* Officer Routes */}
        <Route path="/officer" element={<ProtectedRoute allowedRoles={['officer']}><OfficerDashboard /></ProtectedRoute>} />
        <Route path="/officer/tracking" element={<ProtectedRoute allowedRoles={['officer']}><PlacementTracking /></ProtectedRoute>} />
        <Route path="/officer/reports" element={<ProtectedRoute allowedRoles={['officer']}><Reports /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
