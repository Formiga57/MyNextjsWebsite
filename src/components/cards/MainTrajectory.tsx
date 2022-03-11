import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import OnScreen from '../OnScreen';

interface IProps {
  img: string;
  date: string;
  title: string;
  description: string;
}

interface IBoxInfos {
  visible: boolean;
}

interface IImage {
  visible: boolean;
}

const Container = styled.div`
  margin-bottom: 20px;
  display: flex;
  position: relative;
`;
const BoxInfos = styled.div<IBoxInfos>`
  margin-left: 30px;
  position: relative;
  &:after {
    content: '';
    background: #313131;
    position: absolute;
    top: 0px;
    height: 120%;
    left: -15px;
    width: 2px;
  }
  ${(p) => {
    if (p.visible) {
      return 'animation: slide-in-right 0.5s ease-out both;';
    } else {
      return 'opacity:0;';
    }
  }}
  @keyframes slide-in-right {
    0% {
      -webkit-transform: translateX(1000px);
      transform: translateX(1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const Title = styled.h2`
  margin-top: -10px;
  font-size: 2rem;
`;

const Date = styled.span``;
const Description = styled.p`
  max-width: 60rem;
`;
const ChildFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 50px;
  position: relative;
`;

const Image = styled.img<IImage>`
  position: absolute;
  left: -70px;
  width: 80px;
  ${(p) => {
    if (p.visible) {
      return 'animation: scale-in-center 0.8s ease-out 0.2s both;';
    } else {
      return 'opacity:0;';
    }
  }}
  @keyframes scale-in-center {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const MainTrajectory: React.FC<IProps> = ({
  img,
  date,
  description,
  title,
  children,
}) => {
  const ref = useRef();
  const isVisible = OnScreen(ref);
  return (
    <Container ref={ref}>
      <Image visible={isVisible} src={img} alt='' />
      <BoxInfos visible={isVisible}>
        <Date>{date}</Date>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <br />
        <ChildFlex>{children}</ChildFlex>
      </BoxInfos>
    </Container>
  );
};

export default MainTrajectory;
