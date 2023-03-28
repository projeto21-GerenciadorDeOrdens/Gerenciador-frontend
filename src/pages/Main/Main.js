import styled from 'styled-components';
import EventInfoContext from '../../contexts/EventInfoContext';
import { useContext, useState } from 'react';
import Input from '../../components/Form/Input';

export default function Main() {
  const [remetente, setRemetente] = useState('');
  const [destinatario, setDestinatario] = useState('');

  const { eventInfo } = useContext(EventInfoContext);

  function send() {
    console.log('send');
  }

  return (
    <MainContainer background={eventInfo.backgroundImageUrl}>
      <InputContainer>
        <form onSubmit={send}>
          <LineContainer>
            <Input
              label="Remetente"
              type="text"
              width={'500px'}
              value={remetente}
              onChange={(e) => setRemetente(e.target.value)}
            ></Input>
            <Input
              label="Destinatário"
              type="text"
              width={'100px'}
              value={destinatario}
              onChange={(e) => setDestinatario(e.target.value)}
            ></Input>
          </LineContainer>
        </form>
      </InputContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  min-height: 100vh;
  background: ${(props) => props.background};
`;

const InputContainer = styled.div`
  width: 80%;
  height: 750px;
  background: #ffffff;
  border-radius: 10px;
`;

const LineContainer = styled.div`
  width: 100%;
  background-color: lightgrey;
  border-radius: 10px;
  padding: 0 5px 5px 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
