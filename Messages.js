import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { io } from 'socket.io-client';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  width: 100%;
  max-width: 600px;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: scroll;
`;

const Message = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  background-color: ${({ isOwnMessage }) => (isOwnMessage ? '#DCF8C6' : '#FFF')};
  align-self: ${({ isOwnMessage }) => (isOwnMessage ? 'flex-end' : 'flex-start')};
`;

const InputContainer = styled.div`
  display: flex;
  border-top: 1px solid #ccc;
  padding: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #A52A2A;
  color: #FFF;
  cursor: pointer;
`;

const Messages = ({ currentUser, chatWith }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = io('http://localhost:5000');

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, [socket]);

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(`/messages/${currentUser}/${chatWith}`);
      setMessages(res.data);
    };

    fetchMessages();
  }, [currentUser, chatWith]);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      const message = {
        sender: currentUser,
        receiver: chatWith,
        message: newMessage
      };

      await axios.post('/messages', message);
      setNewMessage('');
    }
  };

  return (
    <Container>
      <MessagesContainer>
        {messages.map((msg) => (
          <Message key={msg._id} isOwnMessage={msg.sender === currentUser}>
            {msg.message}
          </Message>
        ))}
      </MessagesContainer>
      <InputContainer>
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <Button onClick={sendMessage}>Send</Button>
      </InputContainer>
    </Container>
  );
};

export default Messages;
