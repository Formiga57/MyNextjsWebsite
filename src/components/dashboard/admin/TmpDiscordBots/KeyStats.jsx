import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import { useForm } from 'react-hook-form';

const OnlineDiv = styled.div`
  background-color: #011638;
  color: white;
  text-align: center;
  font-family: 'Nunito';
  font-size: 20pt;
  width: 100%;
  height: 82px;
`;
const PaineisDiv = styled.div`
  display: flex;
  margin: 5px;
  flex-wrap: wrap;
`;
const DivSeletor = styled.div`
  padding: 20px;
  border-radius: 10px;
  margin: 10px;
  box-shadow: 5px 5px 20px -8px rgba(0, 0, 0, 0.192);
  border-color: #0000006e;
  background-color: #f3f3f3;
  max-width: 500px;
  text-align: center;
`;
const Titulos = styled.h1`
  font-family: 'Noto Sans JP';
  font-size: 22pt;
  font-weight: 800;
  margin-top: 0;
`;
const Input = styled.input`
  outline: 0;
  border: 2px solid #8a8a8a47;
  border-radius: 5px;
  height: 35px;
  margin: 15px;
`;
function KeyStats(props) {
  const { register, handleSubmit } = useForm();
  const { register: register2, handleSubmit: handleSubmit2 } = useForm();
  const { register: register3, handleSubmit: handleSubmit3 } = useForm();
  const { register: register4, handleSubmit: handleSubmit4 } = useForm();
  const onSubmit = (data, e) => {
    e.target.reset();
    axios({
      method: 'post',
      url: `https://api.formiga57.xyz:3022/vp5gf4n673q759/${props.chave}statskeys`,
      data: { precos: data },
    }).then(() => {
      axios
        .get(
          `https://api.formiga57.xyz:3022/vp5gf4n673q759/${props.chave}statskeys`
        )
        .then((res) => setInfos(res.data));
    });
  };
  const onSubmit2 = (data, e) => {
    e.target.reset();
    axios({
      method: 'post',
      url: `https://api.formiga57.xyz:3022/vp5gf4n673q759/${props.chave}statskeys`,
      data: { status: data },
    }).then(() => {
      axios
        .get(
          `https://api.formiga57.xyz:3022/vp5gf4n673q759/${props.chave}statskeys`
        )
        .then((res) => setInfos(res.data));
    });
  };
  const onSubmit3 = (data, e) => {
    e.target.reset();
    axios({
      method: 'post',
      url: `https://api.formiga57.xyz:3022/vp5gf4n673q759/${props.chave}statskeys`,
      data: { estoque: data },
    }).then(() => {
      axios
        .get(
          `https://api.formiga57.xyz:3022/vp5gf4n673q759/${props.chave}statskeys`
        )
        .then((res) => setInfos(res.data));
    });
  };
  const onSubmit4 = (data, e) => {
    e.target.reset();
    axios
      .post(
        `https://api.formiga57.xyz:3022/vp5gf4n673q759/${props.chave}botcomm`,
        {
          boostupdate: {
            boosts3: data.boosts3,
            boosts5: data.boosts5,
            boosts10: data.boosts10,
          },
        }
      )
      .then(() => {
        axios
          .get(
            `https://api.formiga57.xyz:3022/vp5gf4n673q759/${props.chave}statskeys`
          )
          .then((res) => setInfos(res.data));
      });
  };
  const [infos, setInfos] = useState();
  const options = {
    responsive: true,
    scales: {
      x: {
        reverse: true,
        ticks: {
          font: {
            size: 15,
            color: 'black',
            family: 'Noto Sans JP',
          },
        },
        grid: {
          display: true,
        },
      },
      y: {
        ticks: {
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 15,
            family: 'Noto Sans JP',
          },
        },
      },
    },
  };
  const options2 = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          font: {
            size: 15,
            color: 'black',
            family: 'Noto Sans JP',
          },
        },
        grid: {
          display: true,
        },
      },
      y: {
        ticks: {
          font: {
            size: 10,
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 15,
            family: 'Noto Sans JP',
          },
        },
      },
    },
  };

  useEffect(() => {
    axios
      .get(
        `https://api.formiga57.xyz:3022/vp5gf4n673q759/${props.chave}statskeys`
      )
      .then((res) => {
        setInfos(res.data);
      });
  }, []);
  if (infos !== undefined) {
    const data = {
      labels: [
        '24hrs',
        '23hrs',
        '22hrs',
        '21hrs',
        '20hrs',
        '19hrs',
        '18hrs',
        '17hrs',
        '16hrs',
        '15hrs',
        '14hrs',
        '13hrs',
        '12hrs',
        '11hrs',
        '10hrs',
        '9hrs',
        '8hrs',
        '7hrs',
        '6hrs',
        '5hrs',
        '4hrs',
        '3hrs',
        '2hrs',
        '1hr',
      ],
      datasets: [
        {
          tension: 0.4,
          pointRadius: 5,
          label: 'Usuários em ocupado',
          data: [
            infos[0].pessoas[0].dnd,
            infos[0].pessoas[1].dnd,
            infos[0].pessoas[2].dnd,
            infos[0].pessoas[3].dnd,
            infos[0].pessoas[4].dnd,
            infos[0].pessoas[5].dnd,
            infos[0].pessoas[6].dnd,
            infos[0].pessoas[7].dnd,
            infos[0].pessoas[8].dnd,
            infos[0].pessoas[9].dnd,
            infos[0].pessoas[10].dnd,
            infos[0].pessoas[11].dnd,
            infos[0].pessoas[12].dnd,
            infos[0].pessoas[13].dnd,
            infos[0].pessoas[14].dnd,
            infos[0].pessoas[15].dnd,
            infos[0].pessoas[16].dnd,
            infos[0].pessoas[17].dnd,
            infos[0].pessoas[18].dnd,
            infos[0].pessoas[19].dnd,
            infos[0].pessoas[20].dnd,
            infos[0].pessoas[21].dnd,
            infos[0].pessoas[22].dnd,
            infos[0].pessoas[23].dnd,
          ],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132,0.3)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
          tension: 0.4,
          pointRadius: 5,
          label: 'Usuários online',
          data: [
            infos[0].pessoas[0].online,
            infos[0].pessoas[1].online,
            infos[0].pessoas[2].online,
            infos[0].pessoas[3].online,
            infos[0].pessoas[4].online,
            infos[0].pessoas[5].online,
            infos[0].pessoas[6].online,
            infos[0].pessoas[7].online,
            infos[0].pessoas[8].online,
            infos[0].pessoas[9].online,
            infos[0].pessoas[10].online,
            infos[0].pessoas[11].online,
            infos[0].pessoas[12].online,
            infos[0].pessoas[13].online,
            infos[0].pessoas[14].online,
            infos[0].pessoas[15].online,
            infos[0].pessoas[16].online,
            infos[0].pessoas[17].online,
            infos[0].pessoas[18].online,
            infos[0].pessoas[19].online,
            infos[0].pessoas[20].online,
            infos[0].pessoas[21].online,
            infos[0].pessoas[22].online,
            infos[0].pessoas[23].online,
          ],
          fill: true,
          backgroundColor: 'rgba(120, 200, 0,0.3)',
          borderColor: 'rgba(120, 200, 0, 0.2)',
        },
        {
          tension: 0.4,
          pointRadius: 5,
          label: 'Usuários em afk',
          data: [
            infos[0].pessoas[0].afk,
            infos[0].pessoas[1].afk,
            infos[0].pessoas[2].afk,
            infos[0].pessoas[3].afk,
            infos[0].pessoas[4].afk,
            infos[0].pessoas[5].afk,
            infos[0].pessoas[6].afk,
            infos[0].pessoas[7].afk,
            infos[0].pessoas[8].afk,
            infos[0].pessoas[9].afk,
            infos[0].pessoas[10].afk,
            infos[0].pessoas[11].afk,
            infos[0].pessoas[12].afk,
            infos[0].pessoas[13].afk,
            infos[0].pessoas[14].afk,
            infos[0].pessoas[15].afk,
            infos[0].pessoas[16].afk,
            infos[0].pessoas[17].afk,
            infos[0].pessoas[18].afk,
            infos[0].pessoas[19].afk,
            infos[0].pessoas[20].afk,
            infos[0].pessoas[21].afk,
            infos[0].pessoas[22].afk,
            infos[0].pessoas[23].afk,
          ],
          fill: true,
          backgroundColor: 'rgba(240, 240, 48,0.3)',
          borderColor: 'rgba(255, 200, 0)',
        },
      ],
    };
    const data2 = {
      labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      datasets: [
        {
          tension: 0.4,
          pointRadius: 5,
          label: 'Key64',
          data: [infos[0].pessoas[0].dnd],
          fill: true,
          backgroundColor: 'rgba(120, 200, 0,0.3)',
          borderColor: 'rgb(120, 200, 0)',
          data: [
            infos[0].interesse[0].key64,
            infos[0].interesse[1].key64,
            infos[0].interesse[2].key64,
            infos[0].interesse[3].key64,
            infos[0].interesse[4].key64,
            infos[0].interesse[5].key64,
            infos[0].interesse[6].key64,
          ],
        },
        {
          tension: 0.4,
          pointRadius: 5,
          label: 'Key64comp',
          data: [
            infos[0].interesse[0].key64comp,
            infos[0].interesse[1].key64comp,
            infos[0].interesse[2].key64comp,
            infos[0].interesse[3].key64comp,
            infos[0].interesse[4].key64comp,
            infos[0].interesse[5].key64comp,
            infos[0].interesse[6].key64comp,
          ],
          fill: true,
          backgroundColor: '#4675004c',
          borderColor: 'rgb(87, 128, 26)',
        },
        {
          tension: 0.4,
          pointRadius: 5,
          label: 'Key128',
          data: [
            infos[0].interesse[0].key128,
            infos[0].interesse[1].key128,
            infos[0].interesse[2].key128,
            infos[0].interesse[3].key128,
            infos[0].interesse[4].key128,
            infos[0].interesse[5].key128,
            infos[0].interesse[6].key128,
          ],
          fill: true,
          backgroundColor: 'rgba(240, 240, 48,0.3)',
          borderColor: 'rgba(255, 200, 0)',
        },
        {
          tension: 0.4,
          pointRadius: 5,
          label: 'Key128Comp',
          data: [
            infos[0].interesse[0].key128comp,
            infos[0].interesse[1].key128comp,
            infos[0].interesse[2].key128comp,
            infos[0].interesse[3].key128comp,
            infos[0].interesse[4].key128comp,
            infos[0].interesse[5].key128comp,
            infos[0].interesse[6].key128comp,
          ],
          fill: true,
          backgroundColor: '#b8b8084b',
          borderColor: 'rgb(177, 142, 27)',
        },
        {
          tension: 0.4,
          pointRadius: 5,
          label: 'Key1024',
          data: [
            infos[0].interesse[0].key1024,
            infos[0].interesse[1].key1024,
            infos[0].interesse[2].key1024,
            infos[0].interesse[3].key1024,
            infos[0].interesse[4].key1024,
            infos[0].interesse[5].key1024,
            infos[0].interesse[6].key1024,
          ],
          fill: true,
          backgroundColor: '#f53a3a4c',
          borderColor: 'rgb(255, 83, 83)',
        },
        {
          tension: 0.4,
          pointRadius: 5,
          label: 'VPS',
          data: [
            infos[0].interesse[0].vps,
            infos[0].interesse[1].vps,
            infos[0].interesse[2].vps,
            infos[0].interesse[3].vps,
            infos[0].interesse[4].vps,
            infos[0].interesse[5].vps,
            infos[0].interesse[6].vps,
          ],
          fill: true,
          backgroundColor: '#34bfff4c',
          borderColor: 'rgb(71, 172, 255)',
        },
        {
          tension: 0.4,
          pointRadius: 5,
          label: 'TS',
          data: [
            infos[0].interesse[0].ts,
            infos[0].interesse[1].ts,
            infos[0].interesse[2].ts,
            infos[0].interesse[3].ts,
            infos[0].interesse[4].ts,
            infos[0].interesse[5].ts,
            infos[0].interesse[6].ts,
          ],
          fill: true,
          backgroundColor: '#d030f04b',
          borderColor: 'rgb(162, 0, 255)',
        },
        {
          tension: 0.4,
          pointRadius: 5,
          label: "Boost's",
          data: [
            infos[0].interesse[0].boost,
            infos[0].interesse[1].boost,
            infos[0].interesse[2].boost,
            infos[0].interesse[3].boost,
            infos[0].interesse[4].boost,
            infos[0].interesse[5].boost,
            infos[0].interesse[6].boost,
          ],
          fill: true,
          backgroundColor: '#f086304c',
          borderColor: 'rgb(255, 115, 0)',
        },
      ],
    };
    const data3 = {
      labels: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      datasets: [
        {
          tension: 0.4,
          pointRadius: 5,
          label: 'Entrada',
          data: [infos[0].pessoas[0].dnd],
          fill: true,
          backgroundColor: 'rgba(120, 200, 0,0.3)',
          borderColor: 'rgb(120, 200, 0)',
          data: [
            infos[0].entrasai[0].entrou,
            infos[0].entrasai[1].entrou,
            infos[0].entrasai[2].entrou,
            infos[0].entrasai[3].entrou,
            infos[0].entrasai[4].entrou,
            infos[0].entrasai[5].entrou,
            infos[0].entrasai[6].entrou,
          ],
        },
        {
          tension: 0.4,
          pointRadius: 5,
          label: 'Diferença',
          data: [
            infos[0].entrasai[0].entrou - infos[0].entrasai[0].saiu,
            infos[0].entrasai[1].entrou - infos[0].entrasai[1].saiu,
            infos[0].entrasai[2].entrou - infos[0].entrasai[2].saiu,
            infos[0].entrasai[3].entrou - infos[0].entrasai[3].saiu,
            infos[0].entrasai[4].entrou - infos[0].entrasai[4].saiu,
            infos[0].entrasai[5].entrou - infos[0].entrasai[5].saiu,
            infos[0].entrasai[6].entrou - infos[0].entrasai[6].saiu,
          ],
          fill: true,
          backgroundColor: 'rgba(240, 240, 48,0.3)',
          borderColor: 'rgba(255, 200, 0)',
        },
        {
          tension: 0.4,
          pointRadius: 5,
          label: 'Saída',
          data: [
            infos[0].entrasai[0].saiu,
            infos[0].entrasai[1].saiu,
            infos[0].entrasai[2].saiu,
            infos[0].entrasai[3].saiu,
            infos[0].entrasai[4].saiu,
            infos[0].entrasai[5].saiu,
            infos[0].entrasai[6].saiu,
          ],
          fill: true,
          backgroundColor: '#f53a3a4c',
          borderColor: 'rgb(255, 83, 83)',
        },
      ],
    };
    return (
      <>
        <OnlineDiv>
          Usuários no seu servidor:
          <br />
          <span style={{ color: '#8ADC59' }}>{infos[0].online} Online </span>
          <span
            style={{
              color: '#e66767',
              marginLeft: '20px',
              marginRight: '20px',
            }}
          >
            {infos[0].dnd} Ocupados{' '}
          </span>
          <span style={{ color: '#ffe864' }}>{infos[0].afk} Afk&quot;s </span>
        </OnlineDiv>
        <PaineisDiv>
          <DivSeletor>
            <Titulos>Preço das Keys</Titulos>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                placeholder={`Key64: ${infos[0].precos.key64}`}
                {...register('key64')}
              />
              <Input
                placeholder={`Key64 Compartilhada: ${infos[0].precos.key64comp}`}
                {...register('key64comp')}
              />
              <Input
                placeholder={`Key128: ${infos[0].precos.key128}`}
                {...register('key128')}
              />
              <Input
                placeholder={`Key128 Compartilhada: ${infos[0].precos.key128comp}`}
                {...register('key128comp')}
              />
              <Input
                placeholder={`Key1024: ${infos[0].precos.key1024}`}
                {...register('key1024')}
              />
              <Input
                placeholder={`Key1024 Compartilhada: ${infos[0].precos.key1024comp}`}
                {...register('key1024comp')}
              />
              <br />
              <input type='submit' value='Enviar' />
            </form>
          </DivSeletor>
          <DivSeletor>
            <Titulos>Preço dos boost&quot;s</Titulos>
            <form onSubmit={handleSubmit4(onSubmit4)}>
              <Input
                placeholder={`6 Boost's: ${infos[0].precos.boosts3}`}
                {...register4('boosts3')}
              />
              <Input
                placeholder={`10 Boost's Compartilhada: ${infos[0].precos.boosts5}`}
                {...register4('boosts5')}
              />
              <Input
                placeholder={`20 Boost's: ${infos[0].precos.boosts10}`}
                {...register4('boosts10')}
              />
              <br />
              <input type='submit' value='Enviar' />
            </form>
          </DivSeletor>
          <DivSeletor style={{ width: '600px' }}>
            <Titulos>Gráfico de usuários</Titulos>
            {/* <Line data={data} options={options} /> */}
          </DivSeletor>
          <DivSeletor>
            <Titulos>Status do Bot</Titulos>
            <form onSubmit={handleSubmit2(onSubmit2)}>
              <Input placeholder={infos[0].status[0]} {...register2('0')} />
              <Input placeholder={infos[0].status[1]} {...register2('1')} />
              <Input placeholder={infos[0].status[2]} {...register2('2')} />
              <Input placeholder={infos[0].status[3]} {...register2('3')} />
              <br />
              <input type='submit' value='Enviar' />
            </form>
          </DivSeletor>
          <DivSeletor>
            <Titulos>Estoque de keys</Titulos>
            <form onSubmit={handleSubmit3(onSubmit3)}>
              <Input
                placeholder={`Key64: ${infos[0].estoque['key64']}`}
                {...register3('key64')}
              />
              <Input
                placeholder={`Key64 Compartilhada: ${infos[0].estoque['key64comp']}`}
                {...register3('key64comp')}
              />
              <Input
                placeholder={`Key128: ${infos[0].estoque['key128']}`}
                {...register3('key128')}
              />
              <Input
                placeholder={`Key128 Compartilhada: ${infos[0].estoque['key128comp']}`}
                {...register3('key128comp')}
              />
              <Input
                placeholder={`Key1024: ${infos[0].estoque['key1024']}`}
                {...register3('key1024')}
              />
              <br />
              <input type='submit' value='Enviar' />
            </form>
          </DivSeletor>
          {/* <DivSeletor style={{ width: '600px' }}>
            <Titulos>Interesse de compra na semana</Titulos>
            <Line data={data2} options={options2} />
          </DivSeletor>
          <DivSeletor style={{ width: '600px' }}>
            <Titulos>Entrada e Saída de Membros</Titulos>
            <Line data={data3} options={options2} />
          </DivSeletor> */}
        </PaineisDiv>
      </>
    );
  } else {
    return <div>Carregando...</div>;
  }
}

export default KeyStats;
