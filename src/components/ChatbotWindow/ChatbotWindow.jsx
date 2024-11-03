'use client'
import React, {useEffect, useState, useRef} from 'react';
import { question } from '@/services/chatbot'
import Icon from '../Icon/Icon';
import { getUser } from '@/services/userService';
import { Badge } from '@nextui-org/react';

const ChatBotWindow = ({ onClose }) => {
    const [messages, setMessages] = useState([
        { text: 'Xin chào! Tôi có thể giúp gì cho bạn?', sender: 'bot' },
      ]);
      const [newMessage, setNewMessage] = useState('');
      const [user, setUser] = useState('');
    
      const chatContainerRef = useRef(null);
    
      useEffect(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }, [messages]);
    
      useEffect(()=>{
        getUserInfo()
      }, [])

      async function getUserInfo(){
        let userID = localStorage.getItem('userID')
        let user = await getUser(userID)
        setUser(user)
        console.log(user);
      }
      async function handleSendMessage (){
        if (newMessage.trim() === '') return;
        let inputValue = newMessage
        setNewMessage('')
        const newMessages = [...messages, { text: inputValue, sender: 'user' }];
        setMessages(newMessages);
        
        let anwser = await question(JSON.stringify({"text": inputValue}))
        if (anwser.status == 200){
          let formattedText = anwser.rs.replace(/\n/g, '<br>');
          console.log(anwser);
          const updatedMessages = [
            ...newMessages,
            { text: formattedText, sender: 'bot' },
          ];
        //   setAWS(formattedText)
            setMessages(updatedMessages)

        } else {
          const updatedMessages = [
            ...newMessages,
            { text: "Xin lỗi hiện tại tôi chưa thể hỗ trợ vấn đề này", sender: 'bot' },
          ];
          setMessages(updatedMessages)
        }
      } 
      function convertUlToClass(text) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const ulElements = doc.querySelectorAll('ul');
    
        ulElements.forEach((ulElement) => {
            ulElement.setAttribute('class', 'list-disc');
        });
        const convertedHTML = doc.body.innerHTML;
        return convertedHTML;
      }
      return (
        <div className="fixed flex flex-col justify-between bottom-5 right-5 bg-white border border-gray-300 rounded" style={{width: "600px", height: "700px"}}>
            <div className='flex flex-row justify-between items-center text-white px-2 font-bold bg-green-400 rounded-t'>
                <div className='flex flex-col py-2'>
                    <span className='text-xl px-2'>Chatbot tư vấn</span>
                    <span className='text-md px-2'>AgriShop</span>
                </div>
                <div className=" cursor-pointer text-gray-500 hover:text-gray-700"  >
                    <div onClick={onClose}>
                        <Icon name={'cancel'} className='w-8 h-8 font-bold text-white'></Icon>
                    </div>
                </div>
            </div>
            <div className='p-4 text-center'>
            Bắt đầu trò chuyện với trợ lý ảo của TQNShop.
            Những thông tin được cung cấp chỉ mang tính chất tham khảo, bạn vẫn nên đọc kỹ hướng dẫn sử dụng trước khi sử dụng.
            </div>
          <div
            ref={chatContainerRef}
            className="overflow-y-auto h-4/6 px-4"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 mt-1 flex flex-row gap-2 ${
                  msg.sender === 'user' ? 'text-left justify-end' : 'text-left'
                }`}
              >
                {msg.sender === 'bot' && <div className='w-1/12'>
                    <img src='https://firebasestorage.googleapis.com/v0/b/argishop-cab9c.appspot.com/o/images%2Frobot.png?alt=media&token=b4ae8405-4f6d-4735-a81d-84cb69a2fd43' width={50} height={50}></img>
                </div>}
                <span dangerouslySetInnerHTML={{ __html: convertUlToClass(msg.text) }}
                  className={`flex items-center flex-col p-2 rounded-lg w-fit ${
                    msg.sender === 'user'
                      ? 'bg-blue-500 text-white justify-center'
                      : 'bg-gray-200'
                  }`}
                >
                </span>
                {msg.sender === 'user' &&<div className='w-1/12'>
                    <Badge content="" color="success" shape="circle" placement="bottom-right">
                      <img src={user.avatarURL} width={50} height={50} className='rounded-full' style={{maxHeight: "50px"}}></img> 
                    </Badge>
                </div>}
              </div>
            ))}
          </div>
          
          <div className="my-4 flex justify-center items-center px-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              // onKeyDown={(e) => {
              //   if (e.key === 'Enter') {
              //     handleSendMessage();
              //   }
              // }}
              className="flex-grow border-2 border-green-400 rounded p-2"
            />
            <button
              onClick={handleSendMessage}
              className=" text-green-400 rounded-r p-2"
            >
              <Icon name={'send'} className='w-8 h-8 font-bold text-green-400'></Icon>
            </button>
          </div>
        </div>
      );
};

export default ChatBotWindow;
