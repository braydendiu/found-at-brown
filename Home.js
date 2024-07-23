import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { db, auth } from '../firebase';  
import { collection, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import '../fonts.css'; 

// Styled components for the Home page
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; 
  box-sizing: border-box; 
  padding: 2rem;
  background-color: #f4ede3; 
`;

const SearchSection = styled.section`
  width: 100%;
  max-width: 1200px;
  background-color: #f4ede3; 
  border: 2px solid #481F01; 
  border-radius: 15px;
  padding: 2rem;
  margin-top: 1rem; 
  margin-bottom: 4rem; 
  text-align: center;
  box-sizing: border-box;
`;

const SearchInput = styled.input`
  width: 80%;
  padding: 1rem;
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: 'MADEINFINITY PERSONALUSE-Medium', sans-serif;
`;

const ItemsSection = styled.section`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: 4rem;
`;

const Item = styled.div`
  background-color: white;
  border: 2px solid #481F01; 
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
  width: 300px; 
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  position: relative;
`;

const ItemImage = styled.img`
  width: 100%;
  height: 300px; 
  object-fit: cover;
  border-radius: 8px;
`;

const ItemTitle = styled.h3`
  margin: 0.5rem 0;
  font-family: 'MADEINFINITY PERSONALUSE-Medium', sans-serif; 
`;

const ItemPrice = styled.p`
  margin: 0.5rem 0;
  font-weight: bold;
  font-family: 'MADEINFINITY PERSONALUSE-Medium', sans-serif; 
`;

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const itemsRef = collection(db, 'items');
        const querySnapshot = await getDocs(itemsRef);
        const itemsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(itemsList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleItemClick = (id) => {
    if (user) {
      navigate(`/items/${id}`);
    } else {
      alert('Please login to view item details.');
    }
  };

  return (
    <Container>
      <SearchSection>
        <h2 style={{ fontFamily: 'MADEINFINITY PERSONALUSE-Medium', color: '#481F01' }}>
          find, sell, and connect at brown.
        </h2>
        <SearchInput 
          type="text" 
          placeholder="What are you looking for?" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchSection>
      <ItemsSection>
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <Item key={item.id} onClick={() => handleItemClick(item.id)}>
              {item.images && item.images[0] ? (
                <ItemImage src={item.images[0]} alt={item.title} />
              ) : (
                <ItemImage src="/path/to/default-image.jpg" alt="Default" />
              )}
              <ItemTitle>{item.title}</ItemTitle>
              <ItemPrice>${item.price}</ItemPrice>
            </Item>
          ))
        ) : (
          <p>No items posted.</p>
        )}
      </ItemsSection>
    </Container>
  );
};

export default Home;
