import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import Navbar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import QuoteForm from './components/QuoteForm'; 
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import QuoteDetail from './components/QuoteDetails';
import ThankYou from './components/ThankYou'
import ProtectedRoutes from './components/ProtectedRoutes';
import { AuthProvider } from './context/AuthContext';
import OrderForm from './components/OrderForm';


function App() {
  const [isAllowed, setIsAllowed] = useState(false);


  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<ProtectedRoutes>{<Profile/>}</ProtectedRoutes> } />
          <Route path="/quote"element={<QuoteForm setIsAllowed={setIsAllowed}  /> }/>
          <Route path="/quote-details/:id" element={isAllowed ?<QuoteDetail setIsAllowed={setIsAllowed} /> : <Navigate to="/quote" />} />
          <Route path="/order/:id" element={isAllowed ? <OrderForm setIsAllowed={setIsAllowed} /> : <Navigate to="/quote" />} />
          <Route path="/thank-you" element={isAllowed ? <ThankYou/> : <Navigate to="/quote" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
