import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import styled from 'styled-components';
import '../fonts.css'; 

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4ede3; 
  width: 100%;
  padding: 3rem 3rem;
  box-sizing: border-box;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const CenterSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
`;

const NavLink = styled(Link)`
  color: #481f01; 
  text-decoration: none;
  margin: 0 1rem;
  font-size: 1rem;
  font-family: 'MADEINFINITY PERSONALUSE-Medium', sans-serif;
  &:hover {
    background-color: #e4dace; 
  }
`;

const Title = styled(Link)`
  font-family: 'MADEINFINITY PERSONALUSE-Medium', sans-serif; 
  color: #481f01;
  font-weight: bold;
  font-size: 2rem;
  letter-spacing: 0.2rem;
  margin: 0;
  padding: 0;
  text-decoration: none;
`;

const Header = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to home page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <HeaderContainer>
      <LeftSection>
        <NavLink to="/profile">profile</NavLink>
        <NavLink to="/post-item">post item</NavLink>
      </LeftSection>
      <CenterSection>
        <Title to="/">found @ brown</Title>
      </CenterSection>
      <RightSection>
        {user ? (
          <>
            <span style={{ color: '#481F01' }}>{user.displayName || user.email}</span>
            <NavLink as="button" onClick={handleLogout}>logout</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">login</NavLink>
            <NavLink to="/signup">sign up</NavLink>
          </>
        )}
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
