import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const InputCustom = styled.input`
  border: none;
  border-radius: 5px;
  height: 45px;
  font-size: 16pt;
  background-color: #f3f3f3;
  &:focus {
    box-shadow: 0 0 2pt 0.7pt cornflowerblue;
    outline: none;
  }
`;
const SeletorCustom = styled.select`
  margin: 0 50px;
  height: 45px;
  font-size: 15pt;
  border-radius: 5px;
`;
const TituloFiltros = styled.div`
  width: 100%;
  background-color: #011638;
  font-family: 'Nunito';
  font-size: 20pt;
  height: 83px;
  color: white;
  text-align: center;
  line-height: 83px;
`;
const BtnCancelar = styled.button`
  background-color: white;
  margin: 15px;
  border-radius: 6px;
  border: none;
  color: white;
  font-size: 17pt;
  cursor: pointer;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.2);
    background-color: #ffa7a7;
  }
`;

function KeysLista(props) {
  const listakeys = (l) => {
    return l.keys.map((key, j) => {
      return (
        <>
          <b key={`b${j}`}>{l.keys[j]?.key}</b>
          <BtnCancelar
            onClick={() => {
              var data = { id: l.id, key: j };
              axios({
                method: 'post',
                url: `https://api.formiga57.xyz:3022/vp5gf4n673q759/${props.chave}statskeys`,
                data: { cancelar: data },
              }).then(() => {
                axios
                  .get(
                    `https://api.formiga57.xyz:3022/vp5gf4n673q759/${props.chave}`
                  )
                  .then((res) => setInfos(res.data));
              });
            }}
          >
            ❌
          </BtnCancelar>
          <br key={`br2${j}`} />
          <span
            key={`span${j}`}
            style={{
              color: '#13B30A',
              margin: '0px 015px 0px 15px',
              fontFamily: 'nunito',
            }}
          >
            🛒 {converterUNIX(l.keys[j]?.compra)}
          </span>
          <br key={`br${j}`} />
          <span
            key={`span2${j}`}
            style={{
              color: '#E74A3C',
              margin: '0px 015px 0px 15px',
              fontFamily: 'nunito',
            }}
          >
            ❌ {converterUNIX(l.keys[j]?.expira)}
          </span>
          <br key={`br3${j}`} />
        </>
      );
    });
  };
  const [infos, setInfos] = useState();
  const [pesquisa, setPesquisa] = useState('');
  const [filtroBtn, setfiltroBtn] = useState('nenhum');
  const [ordem, setOrdem] = useState('nenhum');
  useEffect(() => {
    axios
      .get(`https://api.formiga57.xyz:3022/vp5gf4n673q759/${props.chave}`)
      .then((res) => {
        setInfos(res.data);
      });
  }, [props.chave]);
  function converterUNIX(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var months = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = date + '/' + month + '/' + year + ' | ' + hour + ':' + min;
    return time;
  }
  if (infos !== undefined) {
    return (
      <>
        <TituloFiltros>
          <InputCustom
            type='text'
            placeholder='Filtrar pelo nick'
            onChange={(e) => {
              setPesquisa(e.target.value);
            }}
          />
          <SeletorCustom
            name='categorias'
            id='catselect'
            onChange={(e) => {
              setfiltroBtn(e.target.value);
            }}
          >
            <option value='nenhum'>Filtrar por produto</option>
            <option value='key64comp'>Key 64 Comp</option>
            <option value='key64'>Key 64</option>
            <option value='key128comp'>Key 128 Comp</option>
            <option value='key128'>Key 128</option>
            <option value='key1024comp'>Key 1024 Comp</option>
            <option value='key1024'>Key 1024</option>
            <option value='ts'>Teamspeak</option>
            <option value='ip'>IP</option>
            <option value='boost'>Boost&quot;s</option>
          </SeletorCustom>
          <SeletorCustom
            name='ordem'
            id='ordemselect'
            onChange={(e) => {
              setOrdem(e.target.value);
            }}
          >
            <option value='nenhum'>Ordem alfabética</option>
            <option value='compracresc'>🔽 Data de compra</option>
            <option value='compradecresc'>🔼 Data de compra</option>
            <option value='produtoscresc'>🔽 Qtde. produtos</option>
            <option value='produtosdecresc'>🔼 Qtde. produtos</option>
          </SeletorCustom>
        </TituloFiltros>
        <div
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}
        >
          {infos
            ?.filter((v) => {
              if (pesquisa === '') {
                return v;
              } else if (
                v.nome.toLowerCase().includes(pesquisa.toLowerCase())
              ) {
                return v;
              }
            })
            .filter((v) => {
              if (filtroBtn === 'nenhum') {
                return v;
              } else {
                for (var i = 0; i < v.keys.length; i++) {
                  if (
                    v.keys[i].key?.toLowerCase() === filtroBtn.toLowerCase()
                  ) {
                    return v;
                  }
                }
              }
            })
            .sort((a, b) => {
              if (ordem === 'nenhum') {
                return a.nome.localeCompare(b.nome);
              } else if (ordem === 'compracresc') {
                return a.keys[0].compra - b.keys[0].compra;
              } else if (ordem === 'compradecresc') {
                return b.keys[0].compra - a.keys[0].compra;
              } else if (ordem === 'produtosdecresc') {
                return a.keys.length - b.keys.length;
              } else if (ordem === 'produtoscresc') {
                return b.keys.length - a.keys.length;
              }
            })
            .map((l, i) => {
              return (
                <>
                  <div
                    key={`nome${i}`}
                    style={{
                      fontfamily: 'Noto Sans JP',
                      backgroundColor: '#E8E1E1',
                      borderRadius: '15px',
                      margin: '20px',
                      minwidth: '300px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      key={`back${i}`}
                      style={{
                        display: 'flex',
                        backgroundColor: '#011638',
                      }}
                    >
                      <img
                        key={`avatar${i}`}
                        src={l.avatar}
                        alt=''
                        style={{
                          width: '75px',
                          borderRadius: '50%',
                          margin: '10px',
                        }}
                      />
                      <h1
                        key={`h1${i}`}
                        style={{ color: 'white', margin: '20px' }}
                      >
                        {l.nome}
                      </h1>
                    </div>
                    <span
                      key={`spankeys${i}`}
                      style={{
                        margin: '5px',
                        marginBottom: '20px',
                        fontfamily: 'Noto Sans JP',
                        fontSize: '20pt',
                      }}
                    >
                      {listakeys(l)}
                    </span>
                  </div>
                </>
              );
            })}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>Carregando...</div>
      </>
    );
  }
}

export default KeysLista;
