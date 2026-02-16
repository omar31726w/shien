import React, { useState } from 'react';
import { auth } from './firebase.js'; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'; // أضفنا Link و useNavigate
import './login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // تعريف أداة التنقل
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      // محاولة تسجيل الدخول
      await signInWithEmailAndPassword(auth, email, password);
      
      // التوجيه التلقائي لصفحة الواجهة الرئيسية الفخمة
      navigate('/home'); 
      
    } catch (error) {
      console.error("خطأ في الدخول:", error.code);
      // تنبيهات مخصصة حسب نوع الخطأ
      if (error.code === 'auth/user-not-found') {
        alert("هذا الحساب غير موجود، يرجى إنشاء حساب أولاً.");
      } else if (error.code === 'auth/wrong-password') {
        alert("كلمة المرور غير صحيحة.");
      } else {
        alert("عذراً، تأكد من البيانات وحاول مجدداً.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="logo">SHEIN SYRIA</div>
      
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">البريد الإلكتروني</label>
          <input 
            type="email" 
            id="email" 
            placeholder="أدخل بريدك الإلكتروني" 
            required 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">كلمة المرور</label>
          <input 
            type="password" 
            id="password" 
            placeholder="أدخل كلمة المرور" 
            required 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <button type="submit" className="login-btn">تسجيل الدخول</button>

        <div className="links">
          {/* استخدمنا Link لضمان سرعة التنقل ومنع تعليق الموقع */}
          <Link to="/reset-password">نسيت كلمة المرور؟</Link>
          <Link to="/create">إنشاء حساب جديد</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;