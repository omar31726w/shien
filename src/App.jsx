import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './Create'; // تأكد أن حرف C كبير ليطابق اسم ملفك
import Login from './login'; 
import PasswordReset from './password'; 
import Home from './Home';
function App() {
  return (
    <Router>
      <Routes>
        {/* هذا هو السطر اللي كان ناقص وحل مشكلة No routes matched */}
        <Route path="/" element={<Login />} /> 
        
        {/* صفحة إنشاء الحساب */}
        <Route path="/create" element={<Create />} />
        
        {/* صفحة استعادة كلمة المرور */}
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;