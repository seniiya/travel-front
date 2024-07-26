import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css'
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import SignupPage from './pages/SignupPage';
import EmailSignupPage from './pages/EmailSignupPage';
// import FindID from './pages/FindID';
import FindIdPage from './pages/FindIdPage';
import FindPwPage from './pages/FindPwPage';
import TravelDestinations from './pages/TravelDestinations';
import TravelBags from './pages/TravelBags';
import Search from './pages/Search';
import Music from './pages/Music';
import RePW from './pages/RePW';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
   
      <Navbar/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/emailsignup' element={<EmailSignupPage/>}/>
        {/* <Route path='/find-id' element={<FindID/>}/> */}
        <Route path='/findid' element={<FindIdPage/>}/>
        <Route path='/findpw' element={<FindPwPage/>}/>
        <Route path='/repasswd' element={<RePW/>}/>

        <Route path="/travel-destinations" element={<TravelDestinations />} />
        <Route path="/travel-bags" element={<TravelBags />} />
        <Route path="/search" element={<Search />} />
        <Route path="/music" element={<Music />} />
      </Routes>
      <Footer/>
    
  </BrowserRouter>
)
