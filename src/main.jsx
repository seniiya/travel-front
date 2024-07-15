import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css'
import Login from './components/Login';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
    <>
      {/* <Navbar> */}
      <Routes>

        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  </BrowserRouter>
)
