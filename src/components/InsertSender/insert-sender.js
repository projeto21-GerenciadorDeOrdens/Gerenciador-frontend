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
import { ufList } from '../Order/ufList';

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
import { postSender, searchSenders, searchSendersByName } from '../../services/orderRelated';

export default function Senders() {
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

  const [sender, setSender] = useState([]);
  const [boolSearchSender, setBoolSeachSender] = useState(false);
  const [filteredSender, setFilteredSender] = useState([]);

  const { handleSubmit, handleChange, data, errors, setData, customHandleChange } = useForm({
    validations: FormValidations,

    onSubmit: async(data) => {
      const body = {
        remetente: data.remetente,
        cidaderemetente: data.cidaderemetente,
        ufremetente: data.ufremetente,
      };

      try {
        data.remetente = '';
        data.cidaderemetente = '';
        data.ufremetente = '';
        await postSender(token, body);

        toast('Dados inseridos com sucesso');
      } catch (err) {
        console.log(err);
        toast('Não foi possível salvar suas informações!');
      }
    },

    initialValues: {
      remetente: '',
      cidaderemetente: '',
      ufremetente: '',
    },
  });

  async function searchSender(event) {
    event.preventDefault();

    try {
      const response = await searchSendersByName(token, sender);

      setFilteredSender(response);
      setBoolSeachSender(true);
      return;
    } catch (error) {
      toast('Não encontrado no banco de dados');
    }
  }

  return (
    <>
      <InputContainerEdit>
        <Word> Remetentes </Word>

        <form onSubmit={searchSender}>
          <LineContainer>
            <InputWrapper width={'400px'}>
              <Input
                label="Nome do remetente"
                value={sender.toUpperCase()}
                onChange={(e) => setSender(e.target.value)}
                type="text"
              ></Input>
            </InputWrapper>
            <FunctionEnroll type="submit">Buscar remetente</FunctionEnroll>
          </LineContainer>
        </form>
        {boolSearchSender === true ? (
          <>
            <SummaryEnroll>
              <Word>{filteredSender.name}</Word>
              <Word>
                {filteredSender.city} - {filteredSender.state}
              </Word>
            </SummaryEnroll>
            <WordSmall onClick={() => setBoolSeachSender(false)}>mostrar menos</WordSmall>
          </>
        ) : (
          ''
        )}
        <form onSubmit={handleSubmit}>
          <LineContainerEdit>
            <Title> Inserir novo remetente </Title>
          </LineContainerEdit>
          <LineContainer>
            <InputWrapper width={'250px'}>
              <Input
                name="remetente"
                label="Remetente"
                type="text"
                value={data?.remetente || ''}
                onChange={handleChange('remetente')}
              ></Input>
              {errors.remetente && <ErrorMsg>{errors.remetente}</ErrorMsg>}
            </InputWrapper>
            <InputWrapper width={'250px'}>
              <Input
                name="cidaderemetente"
                label="Cidade"
                type="text"
                value={data?.cidaderemetente || ''}
                onChange={handleChange('cidaderemetente')}
              ></Input>
              {errors.cidaderemetente && <ErrorMsg>{errors.cidaderemetente}</ErrorMsg>}
            </InputWrapper>
            <Select
              name="ufremetente"
              label="UF"
              id="state"
              value={data?.ufremetente || ''}
              onChange={handleChange('ufremetente')}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {ufList.map((uf) => (
                <MenuItem value={uf.name} key={uf.id}>
                  <em>{uf.name}</em>
                </MenuItem>
              ))}
            </Select>
            {errors.ufremetente && <ErrorMsg>{errors.ufremetente}</ErrorMsg>}
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
