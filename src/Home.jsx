import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [balance, setBalance] = useState("12,946");

  const categories = [
    { id: 1, label: "ملابس", icon: "👕" },
    { id: 2, label: "أحذية", icon: "👟" },
    { id: 3, label: "حقائب", icon: "👜" },
    { id: 4, label: "إكسسوار", icon: "💍" },
    { id: 5, label: "عطور", icon: "✨" },
    { id: 6, label: "مكياج", icon: "💄" },
    { id: 7, label: "منزل", icon: "🏠" },
    { id: 8, label: "أطفال", icon: "👶" },
    { id: 9, label: "عروض", icon: "🔥" },
  ];

  return (
    <div className="app-frame" style={{ direction: 'rtl' }}>
      {/* هيدر التطبيق */}
      <header className="app-header">
        <div style={{ color: 'white', fontSize: '24px' }}>☰</div>
        
        <div className="balance-box">
          <div className="plus-btn" onClick={() => alert('صفحة الشحن')}>+</div>
          <span className="balance-amount">{balance} ل.س</span>
        </div>

        <div className="brand-text">SHEIN SYRIA</div>
      </header>

      {/* محتوى التطبيق القابل للتمرير */}
      <div className="app-content">
        <div className="category-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="category-card">
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-label">{cat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* القائمة السفلية العائمة */}
      <nav className="app-bottom-nav">
        <div className="nav-tab">👤</div>
        <div className="nav-tab">❤️</div>
        <div className="center-tab">🏠</div>
        <div className="nav-item">🔍</div>
        <div className="nav-tab">⚙️</div>
      </nav>
    </div>
  );
};

export default Home;