import React from 'react';
import styled from 'styled-components';

interface IProps {
  img: string;
  date: string;
  title: string;
  description: JSX.Element;
}

const Container = styled.div`
  display: flex;
  position: relative;
  margin-bottom: 20px;
`;
const BoxInfos = styled.div`
  margin-left: 30px;
  position: relative;
  &:after {
    content: '';
    background: #8a8a8a;
    position: absolute;
    top: 0px;
    height: 130%;
    left: -15px;
    width: 1px;
  }
`;

const Title = styled.h2`
  margin-top: -10px;
`;

const Date = styled.span``;
const Description = styled.p`
  max-width: 60rem;
`;

const Image = styled.img`
  position: absolute;
  left: -40px;
  width: 50px;
`;

const SubTrajectory: React.FC<IProps> = ({
  img,
  date,
  title,
  description,
  children,
}) => {
  return (
    <Container>
      <Image src={img} alt='' />
      <BoxInfos>
        <Date>{date}</Date>
        <Title>{title}</Title>
        <Description>{description}</Description>
        {children}
      </BoxInfos>
    </Container>
  );
};

export default SubTrajectory;
