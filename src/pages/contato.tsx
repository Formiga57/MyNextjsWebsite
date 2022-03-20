import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import TitleChanger from '../components/TitleChanger';
import { SendMessage } from '../services/contactApi';
const Background = styled.div`
  position: absolute;
  min-height: 100%;
  width: 100%;
  background-image: url('/images/mathBackground.png');
  background-repeat: repeat;
  background-size: 1000px;
`;
const TitleDiv = styled.div`
  width: 70%;
  margin: auto;
  margin-top: 25px;
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 5rem;
  margin-bottom: -20px;
`;
const Description = styled.p`
  font-size: 1.3rem;
  text-align: center;
`;
const ContactContainer = styled.div`
  margin: auto;
  width: 60%;
  background-color: #fbfbfb;
  border: solid 0.3px black;
  border-radius: 10px;
  padding: 30px;
  margin-bottom: 250px;
  form {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
`;
const Input = styled.input`
  border: inherit;
  border-radius: inherit;
  outline: inherit;
  background: transparent;
  border-bottom: 2px solid black;
  box-sizing: border-box;
  padding: 5px;
  width: 80%;
  font-size: 15pt;
  margin: auto;
`;
const InputMessage = styled.textarea`
  border: inherit;
  border-radius: inherit;
  outline: inherit;
  background: transparent;
  border-bottom: 2px solid black;
  box-sizing: border-box;
  padding: 5px;
  height: 120px;
  width: 90%;
  font-size: 15pt;
  resize: none;
  font-family: 'Poppins', sans-serif;
  margin: auto;
`;
const Button = styled.button`
  box-sizing: content-box;
  border-radius: 5px;
  width: 80px;
  padding: 10px;
  text-align: center;
  font-size: 15pt;
  border: none;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  margin: auto;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: black;
    color: white;
  }
`;
const Contato = () => {
  const [Submitted, setSubmitted] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  const handleData = (data) => {
    setSubmitted(true);
    SendMessage(data);
    window.location.replace('/');
  };
  return (
    <TitleChanger>
      <Header />
      <Background>
        <br />
        <TitleDiv>
          <Title>Contato</Title>
          <Description>
            Solicite informações, orçamentos ou curiosidades, eu irei responder
            o quanto antes!
          </Description>
        </TitleDiv>
        <ContactContainer>
          <form onSubmit={handleSubmit((data) => handleData(data))}>
            <Input
              type='text'
              placeholder='Nome'
              required
              {...register('name', { required: true })}
            />
            <Input
              type='email'
              placeholder='Email'
              required
              {...register('email', { required: true })}
            />
            <Input
              type='text'
              placeholder='Assunto'
              required
              {...register('subject', { required: true })}
            />
            <InputMessage
              placeholder='Mensagem'
              required
              {...register('message', { required: true })}
            />
            <br />
            <Button disabled={Submitted} type='submit'>
              Enviar
            </Button>
          </form>
        </ContactContainer>
        <br />
        <Footer />
      </Background>
    </TitleChanger>
  );
};
export default Contato;
