import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'
import AddPostPage from './pages/AddPost';
import LoginPage from './pages/LoginPage';
import { AlertProvider } from './context/alert';
import RegisterPage from './pages/RegisterPage';
import AccessDenied from './pages/AccessDenied';
import NavBar from './components/Header';
import ProtectedRoute from './pages/ProtectRoute';


function App() {
  return (
      <>
        <AlertProvider>
          <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage />} />
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/main" element={
              <ProtectedRoute
                errorPage = {<AccessDenied />}
                targetPage = { <NavBar/> }
              />
            }/>
            <Route path="" element={<AddPostPage/>}/>
            <Route path='*' element={<AccessDenied />} />

          </Routes>
        </AlertProvider>
      </>
  );
}

export default App;

