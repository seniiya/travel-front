// import React, { useState } from 'react';
// import {BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
// import './index.css';
// import MainPage from './pages/MainPage.jsx';
// import Login from './pages/Login/Login.jsx';
// import SignupPage from './pages/Signup/SignupPage.jsx';
// import EmailSignupPage from './pages/Signup/EmailSignupPage.jsx';
// import FindIdPage from './pages/Find/FindIdPage.jsx';
// import FindPwPage from './pages/Find/FindPwPage.jsx';
// import TravelDestinations from './pages/Destinations.jsx';
// import TravelBags from './Navbar/TravelBags.jsx';
// // import Search from './pages/Search';
// // import Music from './pages/Music.jsx';
// import RePW from './pages/Find/RePW.jsx';
// import Navbar from './Navbar/Navbar.jsx';
// import Footer from './components/Footer.jsx';
// import Header from './components/Header.jsx';
// import Contents from './pages/Contents.jsx';
// import SearchSection from './Navbar/SearchSection.jsx';
// import PopularPage from "./pages/PopularPage.jsx";
// import TravelerRank from "./pages/TravelerRank.jsx";

// function SearchSectionWrapper() {
//   const navigate = useNavigate();
//   return <SearchSection onClose={() => navigate('/')} />;
// }


 

// function App() {
//   const [selectedDest, setSelectedDest] = useState('여행지 - 전체');

//   return (
//     <Router> 
//       <Navbar/>
//       <Routes>
//         <Route path="/" element={<><MainPage/><Contents/></>}/>
//         <Route path="/login" element={<Login/>}/>
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path='/emailsignup' element={<EmailSignupPage/>}/>
//         <Route path='/findid' element={<FindIdPage/>}/>
//         <Route path='/findpw' element={<FindPwPage/>}/>
//         <Route path='/repasswd' element={<RePW/>}/>

//         <Route path="/travel-destinations" element={<><Header selectedDest={selectedDest} setSelectedDest={setSelectedDest} /><TravelDestinations selectedDest={selectedDest} /></>} />
//         <Route path="/travel-bags" element={<TravelBags />} />
//         <Route path="/search" element={<SearchSection />} />
//         {/* <Route path="/music" element={<Music />} /> */}

//         <Route path='/traveler-rank' element={<TravelerRank/>}/>
//         <Route path='/popular-record' element={<PopularPage/>}/>
//       </Routes>
//       <Footer/>
//     </Router>
//   );

// }



// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import './index.css';
import MainPage from './pages/MainPage.jsx';
import Login from './pages/Login/Login.jsx';
import SignupPage from './pages/Signup/SignupPage.jsx';
import EmailSignupPage from './pages/Signup/EmailSignupPage.jsx';
import FindIdPage from './pages/Find/FindIdPage.jsx';
import FindPwPage from './pages/Find/FindPwPage.jsx';
import TravelDestinations from './pages/Destinations.jsx';
import TravelBags from './Navbar/TravelBagDropdown.jsx';
import PopularPage from "./pages/PopularPage.jsx";
import TravelerRank from "./pages/TravelerRank.jsx";
import RePW from './pages/Find/RePW.jsx';
import Navbar from './Navbar/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Contents from './pages/Contents.jsx';
import SearchSection from './Navbar/SearchSection.jsx';
import TravelBagDropdown from "./Navbar/TravelBagDropdown.jsx";
import Music from './Navbar/Music.jsx';
import TravelDestinationsBag from './pages/DestinationsBag.jsx';
import WritePage from './pages/Write/Write.jsx';
import PostPage from './pages/PostPage.jsx';


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
  const isWritePage = location.pathname === '/write';
  const noFooterPaths = ['/login', '/signup', '/emailsignup', '/findid', '/findpw', '/repasswd', '/write'];
  const [selectedDest, setSelectedDest] = useState('여행지 - 전체');

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
          <Route path="/travel-destinations" element={<><Header selectedDest={selectedDest} setSelectedDest={setSelectedDest} /><TravelDestinations selectedDest={selectedDest} /></>} />
          <Route path="/travel-destinations-bag" element={<TravelDestinationsBag/>} />
          <Route path='/traveler-rank' element={<TravelerRank/>}/>
          <Route path='/popular-page' element={<PopularPage/>}/>
          <Route path="/travel-bags" element={<TravelBagDropdown />} />
          <Route path="/search" element={<SearchSectionWrapper />} />
          <Route path="/music" element={<Music />} />
          <Route path="/write" element={<WritePage/>} />
          <Route path="/postpage" element={<PostPage />} /> {/* 새로운 PostPage 경로 추가 */}
        </Routes>
      </ContentContainer>
      {!noFooterPaths.includes(location.pathname) && <Footer />}
    </AppContainer>
  );
}

function App() {

  // return (
  //   <Router>
  //     <AppContainer>
  //       <AppContent />
  //     </AppContainer>
  //   </Router>
  // );

  return (
    <Router>
        <AppContent />
    </Router>
  );
}

export default App;