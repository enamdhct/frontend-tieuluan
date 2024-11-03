import React from 'react';


const ChatBotButton = () => {
  return (
    <a href='tel:0123456789'>
        <div
        className="cursor-pointer flex justify-center"
        >
        <img
            src="https://firebasestorage.googleapis.com/v0/b/argishop-cab9c.appspot.com/o/images%2Fphone-call.png?alt=media&token=13d82233-e080-427b-857d-e08b24b1fad4"
            alt="CallPhone"
            className="w-14 h-14 rounded-full"
        />
        </div>
    </a>
  );
};

export default ChatBotButton;
