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
import { postRecipient, searchRecipients, searchRecipientsByName, searchSenders } from '../../services/orderRelated';

export default function Recipients() {
  const navigate = useNavigate();
  const token = useToken();
  if (!token) {
    return navigate('/sign-in');
  }

  const { eventInfo } = useContext(EventInfoContext);

  const [recipient, setRecipient] = useState('');
  const [boolSearchRecipient, setBoolSeachRecipient] = useState(false);
  const [filteredRecipient, setFilteredRecipient] = useState([]);

  const { handleSubmit, handleChange, data, errors, setData, customHandleChange } = useForm({
    validations: FormValidations,

    onSubmit: async(data) => {
      const body = {
        destinatario: data.destinatario.toUpperCase(),
        cidadedestinatario: data.cidadedestinatario,
        ufdestinatario: data.ufdestinatario,
      };

      try {
        await postRecipient(token, body);
        toast('Dados inseridos com sucesso');
        data.destinatario = '';
        data.cidadedestinatario = '';
        data.ufdestinatario = '';
      } catch (err) {
        console.log(err);
        toast('Não foi possível salvar suas informações!');
      }
    },

    initialValues: {
      destinatario: '',
      cidadedestinatario: '',
      ufdestinatario: '',
    },
  });

  async function searchRecipient(event) {
    event.preventDefault();

    try {
      const response = await searchRecipientsByName(token, recipient);
      setFilteredRecipient(response);
      setBoolSeachRecipient(true);
      return;
    } catch (error) {
      toast('Não encontrado no banco de dados');
    }
  }

  return (
    <>
      <InputContainerEdit>
        <Word> Destinatários </Word>

        <form onSubmit={searchRecipient}>
          <LineContainer>
            <InputWrapper width={'400px'}>
              <Input
                label="Nome do destinatário"
                value={recipient.toUpperCase()}
                onChange={(e) => setRecipient(e.target.value)}
                type="text"
              ></Input>
            </InputWrapper>
            <FunctionEnroll type="submit">Buscar destinatário</FunctionEnroll>
          </LineContainer>
        </form>
        {boolSearchRecipient === true ? (
          <>
            <SummaryEnroll>
              <Word>{filteredRecipient.name}</Word>
              <Word>
                {filteredRecipient.city} - {filteredRecipient.state}
              </Word>
            </SummaryEnroll>
            <WordSmall onClick={() => setBoolSeachRecipient(false)}>mostrar menos</WordSmall>
          </>
        ) : (
          ''
        )}
        <form onSubmit={handleSubmit}>
          <LineContainerEdit>
            <Title> Inserir novo destinatário </Title>
          </LineContainerEdit>
          <LineContainer>
            <InputWrapper width={'250px'}>
              <Input
                name="destinatario"
                label="Destinatário"
                type="text"
                value={data?.destinatario || ''}
                onChange={handleChange('destinatario')}
              ></Input>
              {errors.destinatario && <ErrorMsg>{errors.destinatario}</ErrorMsg>}
            </InputWrapper>
            <InputWrapper width={'250px'}>
              <Input
                name="cidadedestinatario"
                label="Cidade"
                type="text"
                value={data?.cidadedestinatario || ''}
                onChange={handleChange('cidadedestinatario')}
              ></Input>
              {errors.cidadedestinatario && <ErrorMsg>{errors.cidadedestinatario}</ErrorMsg>}
            </InputWrapper>
            <Select
              name="ufdestinatario"
              label="UF"
              id="state"
              value={data?.ufdestinatario || ''}
              onChange={handleChange('ufdestinatario')}
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
            {errors.ufdestinatario && <ErrorMsg>{errors.ufdestinatario}</ErrorMsg>}
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
