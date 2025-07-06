import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Context
import { AuthProvider } from './context/AuthContext'

// Layout
import Layout from './components/common/Layout'
import ProtectedRoute from './components/common/ProtectedRoute'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import BookDetail from './pages/BookDetail'
import AddBook from './pages/AddBook'
import EditBook from './pages/EditBook'
import Profile from './pages/Profile'



function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            {/* 
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            */}
            <Route path="/book/:id" element={<BookDetail />} />

            {/* Protected Routes 
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/add-book" element={
              <ProtectedRoute>
                <AddBook />
              </ProtectedRoute>
            } />
            <Route path="/edit-book/:id" element={
              <ProtectedRoute>
                <EditBook />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          */}
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  )
}

export default App;