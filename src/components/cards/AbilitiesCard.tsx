import React from 'react';
import styled from 'styled-components';

interface IProps {
  title: string;
  elements: ILine[];
}

interface ILine {
  title: string;
  description?: string;
}

const Container = styled.div`
  margin: 30px;
  width: 430px;
  position: relative;
`;
const Header = styled.p`
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
`;
const Line = styled.div`
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
  return (
    <Container>
      <Header>{title}</Header>
      {elements.map((i, j) => {
        if (i.description) {
          return (
            <Line key={j}>
              <LineTitle>• {i.title}</LineTitle>
              <LineDesc>{i.description}</LineDesc>
            </Line>
          );
        } else {
          return (
            <Line key={j}>
              <LineTitle>• {i.title}</LineTitle>
            </Line>
          );
        }
      })}
    </Container>
  );
};

export default AbilitiesCard;
