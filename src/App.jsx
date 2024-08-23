// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { AuthProvider } from './pages/Login/AuthContext.jsx';
import axios from 'axios';
import './index.css';
import MainPage from './pages/MainPage.jsx';
import Login from './pages/Login/Login.jsx';
import SignupPage from './pages/Signup/SignupPage.jsx';
import EmailSignupPage from './pages/Signup/EmailSignupPage.jsx';
import FindIdPage from './pages/Find/FindIdPage.jsx';
import FindPwPage from './pages/Find/FindPwPage.jsx';
import EmailChange from './pages/Change/EmailChange.jsx';
import IdChange from './pages/Change/IdChange.jsx';
import PwChange from './pages/Change/PwChange.jsx';
import Leave from './pages/Change/Leave.jsx';
import Destinations from './pages/Destinations.jsx';
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
import Music from './Navbar/Music.jsx';
import WritePage from './pages/Write/Write.jsx';
import PostPage_tag from './pages/PostPage_tag.jsx';
import PostPage_title from './pages/PostPage_title.jsx';
import MyPage from './pages/MyPage/MyPage.jsx';
import TravelBagDropdown from './Navbar/TravelBagDropdown.jsx'

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
  const [selectedDest, setSelectedDest] = useState('여행지 - 전체');
  const [selectedCategory, setSelectedCategory] = useState('여행 가방 - 전체'); // 추가된 상태
  const location = useLocation();
  const isWritePage = location.pathname === '/write';
  const noFooterPaths = ['/login', '/signup', '/emailsignup', '/findid', '/findpw', '/repasswd', '/write', '/emailchange', '/id-change', '/pw-change', '/leave', '/MyPage'];

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
          <Route path='/emailchange' element={<EmailChange />} />
          <Route path='/id-change' element={<IdChange />} />
          <Route path='/pw-change' element={<PwChange />} />
          <Route path='/leave' element={<Leave />} />
          <Route path="/travel-destinations" element={<><Header selectedDest={selectedDest} setSelectedDest={setSelectedDest} /><Destinations selectedDest={selectedDest} /></>} />
          <Route path="/travel-bag" element={<>
            <Header2 selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <TravelBag selectedCategory={selectedCategory} />
          </>} />
          <Route path='/traveler-rank' element={<TravelerRank />} />
          <Route path='/popular-page' element={<PopularPage />} />
          <Route path="/search" element={<SearchSectionWrapper />} />
          <Route path="/music" element={<Music />} />
          <Route path="/write" element={<WritePage />} />
          <Route path='/PostPage_tag' element={<PostPage_tag />} />
          <Route path='/postpage_title' element={<PostPage_title />} />
          <Route path="/MyPage" element={<MyPage />} />
        </Routes>
      </ContentContainer>
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </AppContainer>
  );
}

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
