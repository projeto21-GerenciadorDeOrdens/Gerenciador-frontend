import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import EventInfoContext from '../../contexts/EventInfoContext';
import { useForm } from '../../hooks/useForm';

import Input from '../../components/Form/Input';
import Button from '../Form/Button';
import Select from '../../components/Form/Select';
import { MenuItem } from '@material-ui/core';
import { InputWrapper } from '../Order/InputWrapper';

import {
  ButtonContainer,
  MainContainer,
  InputContainerEdit,
  LineContainer,
  LineContainerEdit,
  SubLineContainer,
  Summary,
  Function,
} from '../Containers/containers';
import useToken from '../../hooks/useToken';
import get from './orders';

export function Edit() {
  const { eventInfo } = useContext(EventInfoContext);

  const navigate = useNavigate();

  const token = useToken();
  if (!token) {
    return navigate('/sign-in');
  }

  const ordens = get();

  const [numeroOrdem, setNumeroOrdem] = useState('0');
  const [boolSearch, setBoolSearch] = useState(false);

  function search() {
    if (numeroOrdem == 0) {
      return toast('Selecione uma ordem!');
    }
    setBoolSearch(false);
    setBoolSearch(true);
  }

  function backScreen() {
    setNumeroOrdem(0);
    navigate('/create');
  }

  return (
    <MainContainer background={eventInfo.backgroundImageUrl}>
      <InputContainerEdit>
        <LineContainerEdit>
          <Word>Selecione o N° da ordem:</Word>
          <InputWrapper width={'300px'}>
            <Select
              name="numeroordem"
              label=""
              id="numeroordem"
              value={numeroOrdem}
              onChange={(e) => setNumeroOrdem(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {ordens.map((o) => (
                <MenuItem value={o.name} key={o.id}>
                  <em>{o.name}</em>
                </MenuItem>
              ))}
            </Select>
          </InputWrapper>
        </LineContainerEdit>
        <LineContainerEdit>
          <Button onClick={search}>Procurar ordem</Button>
        </LineContainerEdit>
        {boolSearch === true ? (
          <>
            <Summary>
              <LineContainerEdit>
                <Word>De: Remetente</Word>
                <SummaryWord>Para: Destinatário</SummaryWord>
              </LineContainerEdit>
              <LineContainerEdit>
                <Word>Motorista: motorista</Word>
                <SummaryWord>Placa: placa</SummaryWord>
              </LineContainerEdit>
              <LineContainerEdit>
                <Word>Data: 00-00-0000</Word>
              </LineContainerEdit>
              <LineContainerEdit>
                <Word>Saldo: $1000</Word>
              </LineContainerEdit>
            </Summary>
            <LineContainerEdit>
              <Function>Deletar ordem</Function>
              <Function>Finalizar ordem</Function>
            </LineContainerEdit>
          </>
        ) : (
          ''
        )}
      </InputContainerEdit>
      <Function onClick={backScreen}>Voltar para a criação de ordem</Function>
    </MainContainer>
  );
}

const Word = styled.p`
  font-size: 17px;
  margin-right: 17px;
  line-height: 25px;
`;

const SummaryWord = styled.p`
  font-size: 17px;
  line-height: 25px;
`;
