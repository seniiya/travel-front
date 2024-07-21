import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css'
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import SignupPage from './pages/SignupPage';
import EmailSignupPage from './pages/EmailSignupPage';
import FindID from './pages/FindID';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
    <>
      {/* <Navbar> */}
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/emailsignup' element={<EmailSignupPage/>}/>
        <Route path='/find-id' element={<FindID/>}/>
      </Routes>
    </>
  </BrowserRouter>
)
