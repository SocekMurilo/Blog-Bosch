import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'
import AddPostPage from './pages/AddPost';
import LoginPage from './pages/LoginPage';
import { AlertProvider } from './context/alert';
import RegisterPage from './pages/RegisterPage';
import AccessDenied from './pages/AccessDenied';
function App() {
  return (
      <>
        <AlertProvider>
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/add" element={<AddPostPage/>}/>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/acc' element={<AccessDenied />} />

          </Routes>
        </AlertProvider>
      </>
  );
}

export default App;
