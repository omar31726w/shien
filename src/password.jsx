import React, { useState } from 'react';
import { auth } from './firebase.js'; // استيراد إعدادات الفايربيس من ملفك
import { sendPasswordResetEmail } from "firebase/auth";
import './login.css'; // يمكنك استخدام نفس تنسيق تسجيل الدخول

const PasswordReset = () => {
  const [email, setEmail] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني! تفقد البريد الوارد.");
    } catch (error) {
      console.error("خطأ:", error.message);
      alert("عذراً، لم نجد حساباً بهذا البريد الإلكتروني.");
    }
  };

  return (
    <div className="login-container">
      <div className="logo">SHEIN SYRIA</div>
      <h2>استعادة كلمة المرور</h2>
      <form onSubmit={handleReset}>
        <div className="input-group">
          <label>البريد الإلكتروني</label>
          <input 
            type="email" 
            placeholder="أدخل بريدك المسجل" 
            required 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <button type="submit" className="login-btn">إرسال رابط التغيير</button>
        <div className="links">
          <a href="/">العودة لتسجيل الدخول</a>
        </div>
      </form>
    </div>
  );
};

export default PasswordReset;