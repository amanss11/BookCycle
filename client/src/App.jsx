import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import AddBook from './pages/AddBook';
import ProtectedRoute from './components/ProtectedRoute';
import MyBooks from './pages/MyBooks';
import BookDetails from './pages/BookDetails';
import EditBook from './pages/EditBook';
import Chat from './pages/Chat';
import ChatList from './pages/Chatlist';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated';
import Footer from './components/Footer';
import './index.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<RedirectIfAuthenticated>
          <Login />
        </RedirectIfAuthenticated>} />
        <Route path='/register' element={<RedirectIfAuthenticated>
          <Register />
        </RedirectIfAuthenticated>} />
        <Route path="/add-book" element={<ProtectedRoute><AddBook /></ProtectedRoute>} />
        <Route path="/my-books" element={<ProtectedRoute><MyBooks /></ProtectedRoute>}/>
        <Route path="/edit-book/:id" element={<ProtectedRoute><EditBook /></ProtectedRoute>} />
        <Route path="/chats" element={<ProtectedRoute><ChatList /></ProtectedRoute>} />
        <Route path="/chat/:conversationId" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
