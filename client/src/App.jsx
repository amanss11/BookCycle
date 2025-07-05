import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/common/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BookDetail from './pages/BookDetail'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
