import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Navbar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import QuoteForm from './components/QuoteForm'; 
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import ProtectedRoutes from './components/ProtectedRoutes';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [quote, setQuote] = useState(null);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/quote" element={
            <>
              <QuoteForm setQuote={setQuote} />
              {quote && (
                <div className="quote-result">
                  <h2>Quote Result:</h2>
                  <p>Number of Windows: {quote.numberOfWindows}</p>
                  <p>Quote Amount: {quote.quoteAmount}</p>
                  <p>Address: {quote.address}</p>
                  <p>Date: {quote.created_at}</p>
                </div>
              )}
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<ProtectedRoutes>{<Profile/>}</ProtectedRoutes> } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
