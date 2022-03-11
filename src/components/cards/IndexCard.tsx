import React from 'react';
import styled from 'styled-components';

interface IProps {
  title?: string;
  description?: string;
  href: string;
}

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Container = styled.div`
  border-radius: 10px;
  border: solid 0.5px #fefefe;
  width: 30vw;
  height: 10vw;
  margin-bottom: 20px;
  user-select: none;
  transition: ease 0.2s;
  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
  @media (max-width: 700px) {
    width: 80vw;
    display: flex;
    align-items: center;
  }
`;

const Title = styled.h1`
  margin-left: 8px;
  font-size: 3vw;
  @media (max-width: 700px) {
    font-size: 6vw;
  }
`;
const Description = styled.p`
  margin-top: -5px;
  margin-left: 8px;
  font-size: 1.2vw;
  @media (max-width: 700px) {
    font-size: 2vw;
    margin-top: 0;
  }
`;

const IndexCard: React.FC<IProps> = ({ title, description, href }) => {
  return (
    <Link href={href}>
      <Container>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Container>
    </Link>
  );
};

export default IndexCard;
