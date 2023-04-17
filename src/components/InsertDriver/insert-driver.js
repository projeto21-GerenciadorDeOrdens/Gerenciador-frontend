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
import FormValidations from './FormValidations';
import { ErrorMsg } from './ErrorMsg';

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
  Function,
  InputContainer,
  FunctionEnroll,
  SummaryEnroll,
} from '../Containers/containers';
import useToken from '../../hooks/useToken';
import { postOrder, searchOrders } from '../../services/orders';
import { postDriver, searchDriversByName, searchDriversByPlate, searchSenders } from '../../services/orderRelated';

export default function Drivers() {
  const navigate = useNavigate();
  const token = useToken();
  if (!token) {
    return navigate('/sign-in');
  }

  const { eventInfo } = useContext(EventInfoContext);

  const formatChars = {
    P: '[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz]',
    0: '[0123456789]',
  };

  const [driver, setDriver] = useState([]);
  const [boolSearchDriver, setBoolSeachDriver] = useState(false);
  const [filteredDriver, setFilteredDriver] = useState([]);
  const { handleSubmit, handleChange, data, errors, setData, customHandleChange } = useForm({
    validations: FormValidations,

    onSubmit: async(data) => {
      const body = {
        motorista: data.motorista.toUpperCase(),
        placa: data.placa.toUpperCase(),
      };

      try {
        data.placa = '';
        data.motorista = '';
        await postDriver(token, body);
        toast('Dados inseridos com sucesso');
      } catch (err) {
        console.log(err);
        toast('Não foi possível salvar suas informações!');
      }
    },

    initialValues: {
      motorista: '',
      placa: '',
    },
  });

  async function searchDriver(event) {
    event.preventDefault();

    try {
      if (driver.length > 8) {
        const response = await searchDriversByName(token, driver);
        setFilteredDriver(response);
        setBoolSeachDriver(true);
        return;
      }
      const response = await searchDriversByPlate(token, driver);
      setFilteredDriver(response);
      setBoolSeachDriver(true);
    } catch (error) {
      toast('Não encontrado no banco de dados');
    }
  }

  return (
    <>
      <InputContainerEdit>
        <Word> Motoristas </Word>

        <form onSubmit={searchDriver}>
          <LineContainer>
            <InputWrapper width={'400px'}>
              <Input
                name="motorista"
                label="Nome completo ou placa vínculada"
                value={driver.toUpperCase()}
                onChange={(e) => setDriver(e.target.value)}
                type="text"
              ></Input>
            </InputWrapper>
            <FunctionEnroll type="submit"> Buscar Motorista</FunctionEnroll>
          </LineContainer>
        </form>
        {boolSearchDriver === true ? (
          <>
            <SummaryEnroll>
              <Word>Nome: {filteredDriver.name}</Word>
              <Word>placa: {filteredDriver.plate}</Word>
            </SummaryEnroll>
            <WordSmall onClick={() => setBoolSeachDriver(false)}>mostrar menos</WordSmall>
          </>
        ) : (
          ''
        )}
        <form onSubmit={handleSubmit}>
          <LineContainerEdit>
            <Title> Inserir novo motorista </Title>
          </LineContainerEdit>
          <LineContainer>
            <InputWrapper width={'250px'}>
              <Input
                name="motorista"
                label="Nome"
                type="text"
                value={data?.motorista || ''}
                onChange={handleChange('motorista')}
              ></Input>
              {errors.motorista && <ErrorMsg>{errors.motorista}</ErrorMsg>}
            </InputWrapper>
            <InputWrapper width={'250px'}>
              <Input
                name="placa"
                label="Placa"
                type="text"
                mask="PPP-0P00"
                formatChars={formatChars}
                value={data?.placa.toUpperCase() || ''}
                onChange={handleChange('placa')}
                maxLength="7"
              ></Input>
              {errors.placa && <ErrorMsg>{errors.placa}</ErrorMsg>}
            </InputWrapper>
          </LineContainer>
          <LineContainerEdit>
            <FunctionEnroll type="submit"> Inserir no banco de dados </FunctionEnroll>
          </LineContainerEdit>
        </form>
      </InputContainerEdit>
    </>
  );
}

const Word = styled.p`
  font-size: 20px;
  margin-right: 17px;
  line-height: 25px;
`;

const Title = styled.p`
  font-size: 15px;
  margin-right: 17px;
  line-height: 20px;
  margin-top: 10%;
`;

const WordSmall = styled.p`
  font-size: 12px;
  margin: 2.5% 0 0 0;
  line-height: 10px;
  color: gray;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
