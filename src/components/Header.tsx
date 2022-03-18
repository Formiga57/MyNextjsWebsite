import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 60px;
  width: 100%;
  background-color: #f6f6f6;
  border-bottom: solid 0.2px #6868686a;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  z-index: 999;
`;

const HeaderItem = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: ease 0.2s;
  &:hover {
    transform: scale(1.2);
  }
  margin: 0 15px;
  @media (max-width: 700px) {
    font-size: 1rem;
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: black;
`;

const Header = () => {
  return (
    <Container>
      <HeaderItem>
        <Link href='/'>Início</Link>
      </HeaderItem>
      <HeaderItem>
        <Link href='/portfolio'>Portfólio</Link>
      </HeaderItem>
      <HeaderItem>
        <Link href='/contato'>Contato</Link>
      </HeaderItem>
      <HeaderItem>
        <Link href='/curriculo'>Currículo</Link>
      </HeaderItem>
    </Container>
  );
};

export default Header;
