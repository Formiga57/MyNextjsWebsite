import React, { useRef } from 'react';
import styled from 'styled-components';
import OnScreen from '../OnScreen';

interface IProps {
  title: string;
  elements: ILine[];
}

interface ILine {
  title: string;
  description?: string;
}
interface IStyleLine {
  offset: number;
  visible: boolean;
}
interface IHeader {
  visible: boolean;
}

const Container = styled.div`
  margin: 30px;
  width: 430px;
  position: relative;
`;
const Header = styled.p<IHeader>`
  text-align: center;
  width: 100%;
  font-size: 1.5rem;
  position: relative;
  padding: 0 40px;
  font-weight: bold;
  &:after {
    content: '';
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 3px;
    position: absolute;
    background: #313131;
  }
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
const Line = styled.div<IStyleLine>`
  position: relative;
  width: 100%;
  &:after {
    content: '';
    bottom: -5px;
    width: 90%;
    height: 1px;
    position: absolute;
    background: #8a8a8a;
  }
  ${(p) => {
    if (p.visible) {
      return `animation: slide-in-right 0.5s ease-out both;animation-delay:${
        p.offset / 4
      }s;`;
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
const LineTitle = styled.h3`
  width: 90%;
  font-weight: normal;
  font-size: 1.5rem;
  margin: 10px 0;
`;
const LineDesc = styled.p`
  color: #505050;
  width: 90%;
  text-indent: 20px;
  font-weight: normal;
  font-size: 1rem;
  margin-top: -15px;
`;
const AbilitiesCard: React.FC<IProps> = ({ title, elements }) => {
  const ref = useRef();
  const isVisible = OnScreen(ref);
  return (
    <Container ref={ref}>
      <Header visible={isVisible}>{title}</Header>
      {elements.map((i, j) => {
        if (i.description) {
          return (
            <Line visible={isVisible} offset={j} key={j}>
              <LineTitle>• {i.title}</LineTitle>
              <LineDesc>{i.description}</LineDesc>
            </Line>
          );
        } else {
          return (
            <Line visible={isVisible} offset={j} key={j}>
              <LineTitle>• {i.title}</LineTitle>
            </Line>
          );
        }
      })}
    </Container>
  );
};

export default AbilitiesCard;
