import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { HandleLogin, HandleRegister } from '../services/securityApi';
const Input = styled.input`
  border: inherit;
  border-radius: inherit;
  outline: inherit;
  background: transparent;
  border-bottom: 2px solid black;
  box-sizing: border-box;
  padding: 5px;
  width: 90%;
  font-size: 15pt;
  margin: auto;
`;
const Background = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-image: url('/images/mathBackground.png');
  background-color: #424242;
  z-index: 1;
  background-repeat: repeat;
  background-size: 1000px;
`;
const BackgroundFilter = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #222222e8;
  z-index: 2;
  padding: 30px 0;
`;
const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
  }
`;
const TitleDiv = styled.h1`
  width: 70%;
  margin: auto;
  margin-top: 25px;
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 5rem;
  margin-bottom: -20px;
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
const Registro = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    HandleRegister(data)
      .then((res) => window.location.replace('/login'))
      .catch((err) => {});
  };
  return (
    <Background>
      <BackgroundFilter>
        <TitleDiv>Registro</TitleDiv>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder='Usuário / Email'
              type='text'
              required
              {...register('user', { required: true })}
            />
            <br />
            <Input
              placeholder='Email'
              type='text'
              required
              {...register('email', { required: true })}
            />
            <br />
            <Input
              placeholder='Senha'
              type='password'
              required
              {...register('password', { required: true })}
            />
            <br />
            <Input
              placeholder='Token'
              type='text'
              required
              {...register('token', { required: true })}
            />
            <br />
            <Button type='submit'>Enviar</Button>
          </form>
        </Container>
      </BackgroundFilter>
    </Background>
  );
};

export default Registro;
