import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import bearImage from '../bear.png'; 

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #8B4513;
  width: 100%;
  box-sizing: border-box;
`;

const LogoLink = styled(Link)`
  font-size: 2rem;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  font-style: italic;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const BearImage = styled.img`
  width: 50px;
  height: auto;
  margin-left: 0.5rem;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 0.5rem 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  border: 2px solid #8B4513;
  width: 100%;
  box-sizing: border-box;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
`;

const NavLink = styled(Link)`
  color: #8B4513;
  text-decoration: none;
  margin: 0 1rem;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  &:hover {
    color: #D2691E;
    text-decoration: underline;
  }
`;

const Navbar = () => {
  return (
    <>
      <Header>
        <LogoLink to="/">
          Found @ Brown
          <BearImage src={bearImage} alt="Brown Bear" />
        </LogoLink>
      </Header>
      <Nav>
        <NavLinks>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/post-item">Post Item</NavLink>
          <NavLink to="/chat">Chat</NavLink>
        </NavLinks>
      </Nav>
    </>
  );
};

export default Navbar;