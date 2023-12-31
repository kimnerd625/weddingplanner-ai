"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

interface SimpleBottomModalProps {
  text: string;
  onNextClick: () => void;
  onBackClick: () => void;
}

const SimpleBottomModal: React.FC<SimpleBottomModalProps> = ({
  text,
  onNextClick,
  onBackClick,
}) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextAbled, setNextAbled] = useState(false);

  // 타이핑 효과
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 50);

      return () => clearTimeout(timeout);
    } else {
      setNextAbled(true);
    }
  }, [currentIndex, text]);

  const handleClick = () => {
    // 타이핑 효과 스킵
    if (currentText != text) {
      setCurrentIndex(text.length);
      setCurrentText(text);
      return;
    }
    // 다음 화면
    if (nextAbled) {
      onNextClick();
    }
  };

  return (
    <div className="absolute w-11/12 h-126 bottom-20 left-1/2 transform -translate-x-1/2 ">
      <div className="relative w-full h-full bg-white/80 rounded-10 border-brown-700 border-1.5">
        {/* 뒤로가기 버튼 */}
        <div
          onClick={onBackClick}
          className="w-32 h-32 absolute -top-38 right-0 bg-brown-700 rounded-10 flex justify-center items-center"
        >
          <Image
            src="/icons/back_arrow.png"
            width={25}
            height={25}
            alt="뒤로가기 아이콘"
            className="ml-1 mb-1"
          />
        </div>
        {/* 텍스트 */}
        <p
          onClick={handleClick}
          className="h-full py-18 px-20 text-16 font-500 text-brown-700 text-center whitespace-pre-line"
        >
          {currentText}
        </p>
        {/* 다음 버튼 */}
        {nextAbled && (
          <Image
            src="/icons/next_button.svg"
            width={15}
            height={9}
            alt="다음 버튼"
            className="absolute right-20 bottom-18 animate-pulse"
          />
        )}
      </div>
    </div>
  );
};

export default SimpleBottomModal;
