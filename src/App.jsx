import { useState } from 'react'
import './App.css'
import NavBar from './Navbar'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Calculate from './Pages/Calculate';
import Login from './Pages/Login';
import PrivateRouteWrapper from './Components/PrivateRouteWrapper'

import Records from './pages/Records';

function App() {
  
  const [count, setCount] = useState(0)

  return (

     <Router>
       <NavBar />

       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
          

         <Route
           path="/calculate"
           element={
             <PrivateRouteWrapper>
               <Calculate />
             </PrivateRouteWrapper>
           }
         />

        <Route
           path="/records"
           element={
             <PrivateRouteWrapper>
               <Records />
             </PrivateRouteWrapper>
           }
         />

       </Routes>
     </Router>
      
   
  )
}
//<Route path='/Records' element={<Records/>} />
export default App
