import React, { useState } from 'react';
import './Create.css'; 
import { db, auth } from './firebase.js'; // أضفنا استيراد auth هنا
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth"; // دالة إنشاء مستخدم حقيقي
import { Link } from 'react-router-dom';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // التأكد من تطابق كلمة المرور قبل البدء
    if (formData.password !== formData.confirmPassword) {
      alert("كلمات المرور غير متطابقة!");
      return;
    }
  
    try {
      // الخطوة الأولى: إنشاء مستخدم حقيقي في Firebase Authentication
      // هذا الجزء هو الذي يسمح لاحقاً بميزة "نسيت كلمة السر"
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;
      console.log("تم إنشاء مستخدم حقيقي بنجاح: ", user.uid);

      // الخطوة الثانية: حفظ البيانات الإضافية في Firestore
      // قمنا بإضافة معرف المستخدم (uid) للربط بين البيانات والحساب الحقيقي
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        fullName: formData.fullName,
        phone: formData.phone,
        city: formData.city,
        email: formData.email,
        createdAt: new Date()
      });
      
      alert("أهلاً بك في شي إن سوريا! تم إنشاء حسابك الحقيقي بنجاح.");
      
    } catch (error) {
      console.error("حدث خطأ: ", error.code);
      
      // رسائل تنبيه للمستخدم حسب نوع الخطأ
      if (error.code === 'auth/email-already-in-use') {
        alert("هذا البريد الإلكتروني مسجل بالفعل!");
      } else if (error.code === 'auth/weak-password') {
        alert("كلمة المرور ضعيفة جداً، يجب أن تكون 6 أحرف على الأقل.");
      } else {
        alert("عذراً، حدث خطأ أثناء إنشاء الحساب: " + error.message);
      }
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h1 className="logo">SHEIN SYRIA</h1>
        
        <form id="signupForm" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>الاسم الكامل</label>
            <input type="text" id="fullName" placeholder="أدخل اسمك الكامل" required onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>رقم الهاتف</label>
            <input type="text" id="phone" placeholder="ادخل رقم الهاتف" required onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>المحافظة</label>
            <select id="city" className="custum-select" required onChange={handleChange} defaultValue="">
              <option value="" disabled>اختر المحافظة</option>
              <option value="damascus">دمشق</option>
              <option value="aleppo">حلب</option>
              <option value="homs">حمص</option>
              <option value="latakia">اللاذقية</option>
            </select>
          </div>

          <div className="input-group">
            <label>البريد الإلكتروني</label>
            <input type="email" id="email" placeholder="أدخل بريدك الإلكتروني" required onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>كلمة المرور</label>
            <input type="password" id="password" placeholder="أدخل كلمة المرور" required onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>تأكيد كلمة المرور</label>
            <input type="password" id="confirmPassword" placeholder="أعد إدخال كلمة المرور" required onChange={handleChange} />
          </div>

          <button type="submit" className="btn-submit">إنشاء حساب</button>
        </form>
        <div className="footer-links">
          <Link to="/">لديك حساب بالفعل؟ تسجيل الدخول</Link>
        </div>
      </div>
    </div>
  );
}

export default App;