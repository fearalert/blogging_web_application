import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
// import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateBlog from './pages/CreateBlog';
import MyBlogs from './pages/MyBlogs';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
