import React, { useState } from 'react';
import styled from 'styled-components';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  text-align: center;
  padding: 50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin: 10px 0 5px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  width: 200px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Assume identifier is email
      await signInWithEmailAndPassword(auth, identifier, password);
      navigate('/profile');
    } catch (emailError) {
      try {
        // If email login fails, try username
        const userQuery = query(
          collection(db, 'users'),
          where('username', '==', identifier)
        );
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          const user = userSnapshot.docs[0].data();
          await signInWithEmailAndPassword(auth, user.email, password);
          navigate('/profile');
        } else {
          throw new Error('No such user found');
        }
      } catch (err) {
        console.error('Login failed:', err);
        alert('Login failed: ' + err.message);
      }
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <Label>Email or Username:</Label>
        <Input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <Label>Password:</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;