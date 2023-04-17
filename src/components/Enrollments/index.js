import Drivers from '../InsertDriver/insert-driver';
import Senders from '../InsertSender/insert-sender';
import Recipients from '../insertRecipient/insert-recipient';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import EventInfoContext from '../../contexts/EventInfoContext';
import { useForm } from '../../hooks/useForm';

import Input from '../Form/Input';
import Button from '../Form/Button';
import Select from '../Form/Select';
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
  InputContainer,
  SummaryEnroll,
  Function
} from '../Containers/containers';
import useToken from '../../hooks/useToken';
import { postOrder, searchOrders } from '../../services/orders';
import { searchSenders } from '../../services/orderRelated';

export default function Main() {
  const [state, setState] = useState(undefined);

  const navigate = useNavigate();
  const token = useToken();
  if (!token) {
    return navigate('/sign-in');
  }

  const { eventInfo } = useContext(EventInfoContext);

  return (
    <MainContainer background={eventInfo.backgroundImageUrl}>
      <InputContainer>
        <LineContainerEdit>
          <Selection>Cadastros</Selection>
        </LineContainerEdit>
        <LineContainer>
          <FunctionEnroll onClick={() => setState(<Drivers />)}>
            <Selection>Motoristas</Selection>
          </FunctionEnroll>
          <FunctionEnroll onClick={() => setState(<Senders />)}>
            <Selection>Remetentes</Selection>
          </FunctionEnroll>
          <FunctionEnroll>
            <Selection onClick={() => setState(<Recipients />)}>Destinatários</Selection>
          </FunctionEnroll>
        </LineContainer>
      </InputContainer>
      <>{state}</>
      <LineContainerEdit>
        <Function onClick={() => navigate('/criar')}>Ir para a criação de ordens</Function>
        <Function onClick={() => navigate('/ordens')}>Ir para a seleção de ordens</Function>
      </LineContainerEdit>
    </MainContainer>
  );
}

const Selection = styled.p`
  font-size: 20px;
  line-height: 25px;
`;

const FunctionEnroll = styled.p`
  font-size: 12px;
  width: 100%;
  border: 2px solid lightgrey;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 10px;
  background-color: #e8e8e8;
  margin-right: 10px;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
