import React, {useState} from 'react';
import ChatBotWindow from '../ChatbotWindow/ChatbotWindow';

const ChatBotButton = ({state}) => {

  const openChatBot = () => {
    state(true);
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer flex justify-center"
        onClick={openChatBot}
      >
        <img
          src="https://firebasestorage.googleapis.com/v0/b/argishop-cab9c.appspot.com/o/images%2Frobot.png?alt=media&token=b4ae8405-4f6d-4735-a81d-84cb69a2fd43"
          alt="ChatBot"
          className="w-16 h-16 rounded-full"
        />
      </div>
    </div>
  );
};

export default ChatBotButton;
