import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import styled from 'styled-components';
import './index.css';
import MainPage from './pages/MainPage.jsx';
import Login from './pages/Login/Login.jsx';
import SignupPage from './pages/Signup/SignupPage.jsx';
import EmailSignupPage from './pages/Signup/EmailSignupPage.jsx';
import FindIdPage from './pages/Find/FindIdPage.jsx';
import FindPwPage from './pages/Find/FindPwPage.jsx';
import TravelDestinations from './pages/Destinations.jsx';
import PopularPage from "./pages/PopularPage.jsx";
import TravelerRank from "./pages/TravelerRank.jsx";
import RePW from './pages/Find/RePW.jsx';
import Navbar from './Navbar/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Header2 from './components/Header2.jsx';
import Contents from './pages/Contents.jsx';
import SearchSection from './Navbar/SearchSection.jsx';
import TravelBag from './pages/TravelBag.jsx';
import WritePage from './pages/Write/Write.jsx';
import PostPage from './pages/PostPage.jsx';
import MyPage from './pages/MyPage/MyPage.jsx';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function SearchSectionWrapper() {
  const navigate = useNavigate();
  return <SearchSection onClose={() => navigate('/')} />;
}

function AppContent() {
  const location = useLocation();
  console.log("현재 경로:", location.pathname); 
  const isWritePage = location.pathname === '/write';
  const noFooterPaths = ['/login', '/signup', '/emailsignup', '/findid', '/findpw', '/repasswd', '/write'];

  return (
    <AppContainer>
      {!isWritePage && <Navbar />}
      <ContentContainer>
        <Routes>
          <Route path="/" element={<><MainPage /><Contents /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path='/emailsignup' element={<EmailSignupPage />} />
          <Route path='/findid' element={<FindIdPage />} />
          <Route path='/findpw' element={<FindPwPage />} />
          <Route path='/repasswd' element={<RePW />} />
          <Route path="/travel-destinations" element={<><Header /><TravelDestinations /></>} />
          <Route path="/travel-bag" element={<><Header2 /> <TravelBag /></>} />
          <Route path='/traveler-rank' element={<TravelerRank />} />
          <Route path='/popular-page' element={<PopularPage />} />
          <Route path="/search" element={<SearchSectionWrapper />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/postpage" element={<PostPage />} />
          <Route path="/MyPage" element={<MyPage />} />
        </Routes>
      </ContentContainer>
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </AppContainer>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

