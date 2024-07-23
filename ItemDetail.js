import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Chat from './Chat'; 

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
`;

const ImageSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ItemImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`;

const InfoSection = styled.div`
  width: 50%;
  padding: 2rem;
  box-sizing: border-box;
`;

const Title = styled.h2`
  margin: 0.5rem 0;
`;

const Description = styled.p`
  margin: 0.5rem 0;
`;

const Price = styled.p`
  margin: 0.5rem 0;
  font-weight: bold;
`;

const ChatSection = styled.div`
  width: 50%;
  padding: 2rem;
  box-sizing: border-box;
`;

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const docRef = doc(db, 'items', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setItem(docSnap.data());
        } else {
          setError('No such item!');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <ImageSection>
        {item.images && item.images.length > 0 ? (
          item.images.map((url, index) => (
            <ItemImage key={index} src={url} alt={`Item image ${index + 1}`} />
          ))
        ) : (
          <ItemImage src="/path/to/default-image.jpg" alt="Default" />
        )}
      </ImageSection>
      <InfoSection>
        <Title>{item.title}</Title>
        <Description>{item.description}</Description>
        <Price>${item.price}</Price>
      </InfoSection>
      <ChatSection>
        <Chat receiverId={item.userId} />
      </ChatSection>
    </Container>
  );
};

export default ItemDetail;
