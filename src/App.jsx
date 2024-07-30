import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import './index.css';
import MainPage from './pages/MainPage.jsx';
import Login from './pages/Login/Login.jsx';
import SignupPage from './pages/Signup/SignupPage.jsx';
import EmailSignupPage from './pages/Signup/EmailSignupPage.jsx';
import FindIdPage from './pages/Find/FindIdPage.jsx';
import FindPwPage from './pages/Find/FindPwPage.jsx';
import TravelDestinations from './pages/TravelDestinations.jsx'; // 여기에 페이지 컴포넌트를 임포트
import TravelBags from './Navbar/TravelBags.jsx';
import RePW from './pages/Find/RePW.jsx';
import Navbar from './Navbar/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Contents from './pages/Contents.jsx';
import SearchSection from './Navbar/SearchSection.jsx';

function SearchSectionWrapper() {
  const navigate = useNavigate();
  return <SearchSection onClose={() => navigate('/')} />;
}

function App() {
  return (
    <Router> 
      <Navbar/>
      <Routes>
        <Route path="/" element={<><MainPage /><Contents /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/emailsignup' element={<EmailSignupPage />} />
        <Route path='/findid' element={<FindIdPage />} />
        <Route path='/findpw' element={<FindPwPage />} />
        <Route path='/repasswd' element={<RePW />} />
        <Route path="/travel-destinations" element={<TravelDestinations />} /> {/* 경로 수정 */}
        <Route path="/travel-bags" element={<TravelBags />} />
        <Route path="/search" element={<SearchSectionWrapper />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
