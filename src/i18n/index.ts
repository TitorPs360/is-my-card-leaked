'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      title: "Is your credit card number in a hacker's database?",
      subtitle: "You can easily find out now! All you need to do is enter its information here and we will scan thousands of hacker database to see if any they have match yours",
      cardNumber: "Card Number",
      expDate: "MM/YY",
      cardHolder: "Card Holder Name",
      cvv: "CVV",
      next: "Next",
      back: "Back",
      submit: "Submit",
      scanning: "Scanning database...",
      success: "Your card number did not show up in any hacker database",
      makeAnother: "Check Another Card",
      creditCard: "Credit Card",
      validThru: "Valid Thru",
      cardHolderLabel: "CARD HOLDER",
      bankProperty: "This card is property of Your Bank"
    }
  },
  th: {
    translation: {
      title: "หมายเลขบัตรเครดิตของคุณอยู่ในฐานข้อมูลแฮกเกอร์หรือไม่?",
      subtitle: "ค้นหาได้ง่ายๆ เพียงกรอกข้อมูลบัตรของคุณที่นี่ เราจะสแกนฐานข้อมูลแฮกเกอร์หลายพันรายการเพื่อตรวจสอบว่ามีข้อมูลที่ตรงกับบัตรของคุณหรือไม่",
      cardNumber: "หมายเลขบัตร",
      expDate: "เดือน/ปี",
      cardHolder: "ชื่อผู้ถือบัตร",
      cvv: "รหัส CVV",
      next: "ถัดไป",
      back: "ย้อนกลับ",
      submit: "ตรวจสอบ",
      scanning: "กำลังสแกนฐานข้อมูล...",
      success: "ไม่พบหมายเลขบัตรของคุณในฐานข้อมูลแฮกเกอร์",
      makeAnother: "ตรวจสอบบัตรอื่น",
      creditCard: "บัตรเครดิต",
      validThru: "ใช้ได้ถึง",
      cardHolderLabel: "ชื่อผู้ถือบัตร",
      bankProperty: "บัตรนี้เป็นทรัพย์สินของธนาคารของคุณ"
    }
  }
};

// Initialize i18next on the client side only
if (typeof window !== 'undefined') {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage']
      }
    });
}

export default i18n;