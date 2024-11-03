import React from 'react';

const ChatBotButton = () => {
  return (
    <a target="_blank" href='https://www.google.com/maps/place/Tx.+B%C3%ACnh+Minh,+V%C4%A9nh+Long,+Vi%E1%BB%87t+Nam/@10.0442125,105.8045703,13z/data=!3m1!4b1!4m6!3m5!1s0x31a06333f6a24253:0xde624fef40f8c64a!8m2!3d10.0705169!4d105.8229464!16s%2Fm%2F03md7sn?hl=vi-VN&entry=ttu'>
        <div
        className="cursor-pointer flex justify-center bg-white rounded-full shadow-lg"
        >
        <img
            src="https://firebasestorage.googleapis.com/v0/b/argishop-cab9c.appspot.com/o/images%2Fmap.png?alt=media&token=da6ae064-de95-491f-8369-c92637ecc33a"
            alt="Map"
            className="w-14 h-14 rounded-full"
        />
        </div>
    </a>
  );
};

export default ChatBotButton;
