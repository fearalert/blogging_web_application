import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateBlog from './pages/CreateBlog';
import MyBlogs from './pages/MyBlogs';
import BlogDetailPage from './pages/BlogDetail';
import ProtectedRoute from './context/ProtectedRoute';
import EditBlog from './pages/EditBlog';
import CategoryManagement from './pages/CategoryManagement';
import TagManagement from './pages/TagManagement';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <AuthProvider>
      <Router>
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
          <Route path="/categories" element={
            <ProtectedRoute>
              <CategoryManagement />
            </ProtectedRoute>
          } />
          <Route path="/tags" element={
            <ProtectedRoute>
              <TagManagement />
            </ProtectedRoute>
          } />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/edit/:id" element={<EditBlog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
