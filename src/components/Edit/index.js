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
import { deleteOrder, finishDriverTrip, payOrder, searchOrders } from '../../services/orders';

export function Edit() {
  const { eventInfo } = useContext(EventInfoContext);

  const navigate = useNavigate();

  const token = useToken();
  if (!token) {
    return navigate('/sign-in');
  }

  const [numeroOrdem, setNumeroOrdem] = useState('0');
  const [boolSearch, setBoolSearch] = useState(false);
  const [MUIvalue, setMUIValue] = useState('Selecione');
  const [orders, setOrders] = useState([{ none: 'none' }]);
  const [orderInfo, setOrderInfo] = useState({ none: 'none' });
  const [boolButtons, setBoolButtons] = useState(false);

  useEffect(() => {
    async function getOrders() {
      const response = await searchOrders(token);
      if (response.length === 0) {
        setMUIValue('0');
        return;
      }
      response.unshift({ id: 'Exibir todas' });
      setOrders(response);
    }
    getOrders();
  }, [orders]);

  function setInfo(value) {
    if (orders.length === 0) {
      setBoolSearch(false);
      return;
    }
    if (value === 'Exibir todas') {
      setNumeroOrdem(value);
      let newArr = orders;
      newArr.shift();
      setOrderInfo(newArr);
      setBoolButtons(false);
      setBoolSearch(true);
      toast('Para editar ou deletar uma ordem, selecione-a individualmente!');
      return;
    }
    setNumeroOrdem(value);
    const newArr = orders.filter((e) => e.id == value);
    if (newArr.length === 0) {
      console.log('chegando aqui');
      setBoolSearch(false);
      setMUIValue('Não há ordens');
      return;
    }
    setOrderInfo(newArr);
    setBoolButtons(true);
    setBoolSearch(true);
    setMUIValue('');
  }

  async function finishTrip() {
    try {
      await finishDriverTrip(token, orderInfo[0].id);
      const response = await searchOrders(token);
      response.unshift({ id: 'Exibir todas' });
      const newArr = response.filter((e) => e.id == numeroOrdem);
      setOrderInfo(newArr);
      toast('Viagem finalizada!');
    } catch (error) {
      toast('Não foi possível finalizar a viagem, verifique se ela já está finalizada');
      console.log(error.statusText);
    }
  }

  async function setPaidOrder() {
    try {
      await payOrder(token, orderInfo[0].id);
      const response = await searchOrders(token);
      response.unshift({ id: 'Exibir todas' });
      const newArr = response.filter((e) => e.id == numeroOrdem);
      setOrderInfo(newArr);
      toast('A ordem foi paga!');
    } catch (error) {
      toast('Não foi possível pagar a ordem, verifique se ela já foi paga');
      console.log(error);
    }
  }

  async function excludeOrder() {
    try {
      await deleteOrder(token, orderInfo[0].id);
      setBoolSearch(false);
      const response = await searchOrders(token);
      console.log(response);
      if (response.length === 0) {
        setMUIValue('0');
        setOrders(response);
        return;
      }
      response.unshift({ id: 'Exibir todas' });
      setOrders(response);
      toast('Ordem deletada');
    } catch (error) {
      console.log(error);
      toast('Não foi possível deletar a ordem');
    }
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
              <MenuItem value={numeroOrdem}>
                <em>{MUIvalue}</em>
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
            {orderInfo.map((info) => (
              <Summary>
                <Word>Ordem N° {info.id}</Word>
                <Word>Viagem finalizada: {info.driverFinishedService === true ? 'SIM' : 'NÃO'}</Word>
                <Word>Ordem paga: {info.isPaid === true ? 'SIM' : 'NÃO'}</Word>
                <Word>
                  De: {info.Sender.city} - {info.Sender.state}
                </Word>
                <SummaryWord>
                  Para: {info.Recipient.city} - {info.Recipient.state}
                </SummaryWord>

                <Word>Motorista: {info.Driver.name}</Word>
                <SummaryWord>Placa: {info.Driver.plate}</SummaryWord>

                <Word>Data: {dayjs(info.createdAt).format('DD-MM-YYYY')}</Word>

                <Word>
                  Saldo: $
                  {Number(info.freight) * (Number(info.weight) / 1000) -
                    (Number(info.taxes) + Number(info.advance) + Number(info.gas))}
                </Word>
              </Summary>
            ))}

            <LineContainerEdit>
              {boolButtons === true ? (
                <>
                  <Function onClick={finishTrip}>Finalizar viagem</Function>
                  <Function onClick={setPaidOrder}>Marcar ordem como paga</Function>
                  <Function onClick={excludeOrder}>Deletar ordem</Function>
                </>
              ) : (
                ''
              )}
            </LineContainerEdit>
          </>
        ) : (
          ''
        )}
      </InputContainerEdit>
      <LineContainerEdit>
        <Function onClick={() => navigate('/criar')}>Ir para a criação de ordem</Function>
        <Function onClick={() => navigate('/cadastros')}>Fazer novos cadastros</Function>
      </LineContainerEdit>
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
