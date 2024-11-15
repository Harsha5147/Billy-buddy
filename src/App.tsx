import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import Report from './pages/Report';
import Community from './pages/Community';
import Statistics from './pages/Statistics';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-blue-50">
        <Header className="shadow-lg bg-white" />
        <main className="flex-grow container mx-auto px-6 py-8 sm:py-12 transition-transform duration-300">
          <div className="rounded-lg bg-white p-8 shadow-xl backdrop-filter backdrop-blur-md">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/report" element={<Report />} />
              <Route path="/community" element={<Community />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              {/* Optional 404 Route */}
              <Route
                path="*"
                element={
                  <div className="text-center text-red-500">Page Not Found</div>
                }
              />
            </Routes>
          </div>
        </main>
        <Footer className="bg-blue-900 text-white py-4 shadow-inner" />
      </div>
    </Router>
  );
}

export default App;
