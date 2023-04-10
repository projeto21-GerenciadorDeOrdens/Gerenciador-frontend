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
import { searchOrders } from '../../services/orders';

export function Edit() {
  const { eventInfo } = useContext(EventInfoContext);

  const navigate = useNavigate();

  const token = useToken();
  if (!token) {
    return navigate('/sign-in');
  }

  const [numeroOrdem, setNumeroOrdem] = useState('0');
  const [boolSearch, setBoolSearch] = useState(false);
  const [boolOrders, setBoolOrders] = useState(true);
  const [orders, setOrders] = useState([{ name: 'Não há ordens', id: 1 }]);
  const [orderInfo, setOrderInfo] = useState({ none: 'none' });

  useEffect(() => {
    async function getOrders() {
      const response = await searchOrders(token);
      if (response.length !== 0) {
        setBoolOrders(false);
      }
      setOrders(response);
    }
    getOrders();
  }, [orders]);

  function setInfo(value) {
    if (orders.length === 0) {
      setBoolSearch(false);
      return;
    }
    setNumeroOrdem(value);
    const newArr = orders.filter((e) => e.id == value);
    if (newArr.length === 0) {
      setBoolSearch(false);
      return;
    }
    setOrderInfo(newArr);
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
              onChange={(e) => setInfo(e.target.value)}
            >
              <MenuItem disabled={boolOrders}>
                <em>Não há ordens!</em>
              </MenuItem>
              {orders.map((o) => (
                <MenuItem value={o.id} key={o.id}>
                  <em>{o.id}</em>
                </MenuItem>
              ))}
            </Select>
          </InputWrapper>
        </LineContainerEdit>
        {boolSearch === true ? (
          <>
            <Summary>
              <Word>De: {orderInfo[0].Sender.city}</Word>
              <SummaryWord>Para: {orderInfo[0].Recipient.city}</SummaryWord>

              <Word>Motorista: {orderInfo[0].Driver.name}</Word>
              <SummaryWord>Placa: {orderInfo[0].Driver.plate}</SummaryWord>

              <Word>Data: {dayjs(orderInfo[0].createdAt).format('DD-MM-YYYY')}</Word>

              <Word>
                Saldo: $
                {Number(orderInfo[0].freight) * (Number(orderInfo[0].weight) / 1000) -
                  (Number(orderInfo[0].taxes) + Number(orderInfo[0].advance) + Number(orderInfo[0].gas))}
              </Word>
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
