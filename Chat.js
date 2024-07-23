import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../firebase';
import { addDoc, collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import styled from 'styled-components';

// Styled components for the chat interface
const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  border: 2px solid #481F01;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
`;

const Messages = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

const Message = styled.div`
  background-color: #e4dace;
  padding: 0.5rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
`;

const SendMessageForm = styled.form`
  display: flex;
  width: 100%;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #481F01;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #D2691E;
  }
`;

const Chat = ({ receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { id: itemId } = useParams();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser || !itemId) return;

    // Query to fetch chat messages for the specific item and participants
    const q = query(
      collection(db, 'messages'),
      where('itemId', '==', itemId),
      where('participants', 'array-contains', currentUser.uid),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [itemId, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage.trim() && receiverId && currentUser) {
      await addDoc(collection(db, 'messages'), {
        itemId,
        text: newMessage,
        senderId: currentUser.uid,
        receiverId,
        participants: [currentUser.uid, receiverId],
        timestamp: new Date(),
      });
      setNewMessage('');
    }
  };

  if (!currentUser) {
    return <p>Please log in to chat.</p>;
  }

  return (
    <ChatContainer>
      <Messages>
        {messages.map((message) => (
          <Message key={message.id}>
            <strong>{message.senderId === currentUser.uid ? 'You' : 'Seller'}: </strong>{message.text}
          </Message>
        ))}
      </Messages>
      <SendMessageForm onSubmit={handleSubmit}>
        <Input 
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <Button type="submit">Send</Button>
      </SendMessageForm>
    </ChatContainer>
  );
};

export default Chat;
