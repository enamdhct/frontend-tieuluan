import React, { useState, useEffect } from 'react';
import Icon from '../Icon/Icon';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollFunction = () => {
    if (window.scrollY > 20) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollFunction);
    return () => {
      window.removeEventListener('scroll', scrollFunction);
    };
  }, []);

  return (
    <button
      id="back-to-top"
      className={` text-white p-2 rounded-full cursor-pointer ${isVisible ? '' : 'hidden'}`}
      onClick={scrollToTop}
    >
      <Icon name={'arrowTop'} className='w-12 h-12 text-green-500'></Icon>
      {/* <img src="https://i0.wp.com/mark-anthony.ca/wp-content/uploads/2013/12/back-to-top.jpg" alt="" className="w-16 h-16 rounded-full"/> */}
    </button>
  );
};

export default BackToTopButton;
