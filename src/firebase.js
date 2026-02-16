import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyCfue3E_N-N2i-RksjJSmSmdunUFfAIo5Y",
  authDomain: "shein-syria-eead4.firebaseapp.com",
  projectId: "shein-syria-eead4",
  storageBucket: "shein-syria-eead4.firebasestorage.app",
  messagingSenderId: "1063434662230",
  appId: "1:1063434662230:web:648f9f9699345944a6a6f7",
  measurementId: "G-FDTHJ16KN2"
};

// تشغيل Firebase
const app = initializeApp(firebaseConfig);

// تصدير الأدوات لاستخدامها في صفحات التسجيل
export const auth = getAuth(app);
export const db = getFirestore(app);