import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css'
import MainPage from './pages/MainPage';
import Login from './pages/Login/Login';
import SignupPage from './pages/Signup/SignupPage';
import EmailSignupPage from './pages/Signup/EmailSignupPage';
// import FindID from './pages/FindID';
import FindIdPage from './pages/Find/FindIdPage';
import FindPwPage from './pages/Find/FindPwPage';
import TravelDestinations from './Navbar/TravelDestinations';
import TravelBags from './Navbar/TravelBags';
// import Search from './pages/Search';
import Music from './Navbar/Music';
import RePW from './pages/Find/RePW';
import Navbar from './Navbar/Navbar';
import Footer from './components/Footer';
import Contents from './pages/Contents';
import SearchSection from './Navbar/SearchSection';
import PostPage_tag from './pages/PostPage_tag.jsx';
import PostPage_title from './pages/PostPage_title.jsx';
import PostList from './pages/PostList.jsx';
import PostPage_tagcopy from './pages/PostPage_tagcopy.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
   
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
        <Route path='/postlist' element={<PostList/>}/>
        <Route path="/posttag" element={<PostPage_tagcopy/>} />
        <Route path="/post_tag/:id" element={<PostPage_tag/>} />
        <Route path='/post_title/:id' element={<PostPage_title/>}/>
        <Route path="/travel-destinations" element={<TravelDestinations />} />
        <Route path="/travel-bags" element={<TravelBags />} />
        <Route path="/search" element={<SearchSection />} />
        <Route path="/music" element={<Music />} />
      </Routes>
    
     
      <Footer/>
      
  </BrowserRouter>
)
