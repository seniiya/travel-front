// import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import './index.css';
import MainPage from './pages/MainPage.jsx';
import Login from './pages/Login/Login.jsx';
import SignupPage from './pages/Signup/SignupPage.jsx';
import EmailSignupPage from './pages/Signup/EmailSignupPage.jsx';
// import FindID from './pages/FindID';
import FindIdPage from './pages/Find/FindIdPage.jsx';
import FindPwPage from './pages/Find/FindPwPage.jsx';
import TravelDestinations from './Navbar/TravelDestinations.jsx';
import TravelBags from './Navbar/TravelBags.jsx';
// import Search from './pages/Search';
// import Music from './pages/Music.jsx';
import RePW from './pages/Find/RePW.jsx';
import Navbar from './Navbar/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Contents from './pages/Contents.jsx';
import SearchSection from './Navbar/SearchSection.jsx';
// import { useNavigate } from "react-router-dom";


function SearchSectionWrapper() {
  const navigate = useNavigate();
  return <SearchSection onClose={() => navigate('/')} />;
}
// searchsection에서 onclose 때문에 자꾸 오류가 생겨서 코드 수정 


 

function App() {
  return (
    <Router> 
      <Navbar/>
      <Routes>
      
        <Route path="/" element={
          <>
            <MainPage/>
            <Contents/>
          </>
        }/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/emailsignup' element={<EmailSignupPage/>}/>
        {/* <Route path='/find-id' element={<FindID/>}/> */}
        <Route path='/findid' element={<FindIdPage/>}/>
        <Route path='/findpw' element={<FindPwPage/>}/>
        <Route path='/repasswd' element={<RePW/>}/>

        <Route path="/travel-destinations" element={<TravelDestinations />} />
        <Route path="/travel-bags" element={<TravelBags />} />
        <Route path="/search" element={<SearchSection />} />
        {/* <Route path="/search" element={<SearchSection />} /> */}
        {/* <Route path="/music" element={<Music />} /> */}
      
      </Routes>
      <Footer/>
    </Router>
  );

}



export default App;
