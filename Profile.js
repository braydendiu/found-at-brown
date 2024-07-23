import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const ChatSection = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 1rem 0;
`;

const ChatLink = styled(Link)`
  display: block;
  padding: 1rem;
  margin: 0.5rem 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const Profile = () => {
  const [user] = useAuthState(auth);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchChats = async () => {
        const chatsRef = collection(db, 'chatsStarted');
        const q = query(chatsRef, where('participants', 'array-contains', user.uid));
        const querySnapshot = await getDocs(q);
        const chatsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setChats(chatsList);
      };

      fetchChats();
    }
  }, [user]);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <Container>
      <h2>Your Chats</h2>
      <ChatSection>
        {chats.length > 0 ? (
          chats.map(chat => (
            <ChatLink key={chat.id} to={`/chat/${chat.itemId}/${chat.participants.find(p => p !== user.uid)}`}>
              Chat about Item ID: {chat.itemId}
            </ChatLink>
          ))
        ) : (
          <p>No chats yet.</p>
        )}
      </ChatSection>
    </Container>
  );
};

export default Profile;
