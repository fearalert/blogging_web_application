import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
// import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateBlog from './pages/CreateBlog';
import MyBlogs from './pages/MyBlogs';
import BlogDetailPage from './pages/BlogDetail';
import ProtectedRoute from './context/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={
             <ProtectedRoute>
                <CreateBlog />
           </ProtectedRoute>
          } />
          <Route path="/blogs" element={
            <ProtectedRoute>
              <MyBlogs />
            </ProtectedRoute>
          } />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
