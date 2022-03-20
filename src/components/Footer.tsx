import React from 'react';
import styled from 'styled-components';
import { BsGithub, BsLinkedin, BsDiscord } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 160px;
  z-index: 910;
  border-top: solid 0.2px #6868686a;
  background-color: #efeef0;
  display: flex;
  justify-content: space-between;
`;

const Infos = styled.div`
  height: 100%;
  padding: 25px;
  p {
    margin-left: 20px;
  }
  @media (max-width: 700px) {
    font-size: 0.8rem;
  }
`;
const Contacts = styled.div`
  margin-right: 30px;
  display: flex;
  color: black;
  align-items: center;
  justify-content: center;
  font-size: 26pt;
  @media (max-width: 700px) {
    font-size: 17pt;
    margin-right: 5px;
  }
  svg {
    transition: ease 0.2s;
    cursor: pointer;
    margin: 0 10px;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

const Link = styled.a`
  text-decoration: none;
  color: black;
`;
const LinkMail = styled.a`
  text-decoration: none;
  color: black;
  font-size: 32pt;
  @media (max-width: 700px) {
    font-size: 20pt;
  }
`;

const Footer = () => {
  return (
    <Container>
      <Infos>
        <h2>Vinícius Formigone</h2>
        <p>Feito por mim durante várias madrugadas😋</p>
        <p>© 2022</p>
      </Infos>
      <Contacts>
        <Link href='https://github.com/Formiga57' target='_blank'>
          <BsGithub />
        </Link>
        <Link href='https://linkedin.com' target='_blank'>
          <BsLinkedin />
        </Link>
        <Link
          href='https://discordapp.com/users/403193870659354624'
          target='_blank'
        >
          <BsDiscord />
        </Link>
        <LinkMail href='mailto:viniciusformigone.s@gmail.com'>
          <MdEmail />
        </LinkMail>
      </Contacts>
    </Container>
  );
};

export default Footer;
