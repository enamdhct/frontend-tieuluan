import React from 'react';

const ChatMess = () => {
  const openMess = () => {

  };

  return (
    <div
      className="cursor-pointer flex justify-center"
      onClick={openMess}
    >
      <img
        src="https://play-lh.googleusercontent.com/ldcQMpP7OaVmglCF6kGas9cY_K0PsJzSSosx2saw9KF1m3RHaEXpH_9mwBWaYnkmctk"
        alt="ChatBot"
        className="w-16 h-16 rounded-full"
      />
    </div>
  );
};

export default ChatMess;
