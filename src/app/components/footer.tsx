import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full p-4 text-center bg-white/80 backdrop-blur-sm shadow-lg mt-auto">
      <div className="flex flex-col gap-1">
        <div className="flex justify-center items-center gap-4">
          <a
            href="https://www.youtube.com/@TitorPs360"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
          >
            Created by TitorPs360
          </a>
          <div className="h-4 w-px bg-gray-300" />
          <a
            href="https://github.com/TitorPs360/is-my-card-leaked"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-purple-600 transition-colors duration-200"
          >
            GitHub
          </a>
        </div>
        <div className="text-sm text-gray-500">
          อย่าเชื่อนะโว้ยยยยย นี่มันเว็บทำปลอมๆ ไม่ใช่ของจริง อย่าใส่ข้อมูลจริงๆนะ
        </div>
      </div>
    </footer>
  );
};

export default Footer;
