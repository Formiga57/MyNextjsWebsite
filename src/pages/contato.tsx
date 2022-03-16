import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
const Background = styled.div`
  position: absolute;
  height: 100%;
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
  background-color: #f5f5f5;
  border: solid 0.3px black;
  border-radius: 10px;
  padding: 30px;

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
  width: 30%;
  font-size: 15pt;
  margin: auto;
`;
const Contato = () => {
  const [Submitted, setSubmitted] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  const handleData = (data) => {
    setSubmitted(true);
    axios.post('http://localhost:3000/api/contact', data);
    window.location.replace('/');
  };
  return (
    <Background>
      <TitleDiv>
        <Title>Contato</Title>
        <Description>
          Solicite informações, orçamentos ou curiosidades, eu irei responder o
          quanto antes!
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
          <Input
            type='textbox'
            placeholder='Mensagem'
            required
            {...register('message', { required: true })}
          />
          <br />
          <button disabled={Submitted} type='submit'>
            Enviar
          </button>
        </form>
      </ContactContainer>
    </Background>
  );
};
export default Contato;
