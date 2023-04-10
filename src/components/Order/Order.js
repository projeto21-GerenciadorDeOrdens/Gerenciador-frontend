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
import { ufList } from './ufList';
import { CustomDatePicker } from './CustomDatePicker';
import { InputWrapper } from './InputWrapper';
import { ErrorMsg } from './ErrorMsg';
import FormValidations from './FormValidations';

import {
  ButtonContainer,
  MainContainer,
  InputContainer,
  LineContainer,
  SubLineContainer,
  Function,
} from '../Containers/containers';
import useToken from '../../hooks/useToken';
import { postOrder, searchOrders } from '../../services/orders';

dayjs.extend(CustomParseFormat);

export default function Order() {
  //elaborar a opção de zerar os inputs para a criação de outra ordem;
  //elaborar telas de inserção de novos motoristas, remetentes e destinatários.
  //elaborar uma forma de deixar os inputs com masks desabilitados
  const navigate = useNavigate();
  const token = useToken();
  if (!token) {
    return navigate('/sign-in');
  }

  const [functionBoolean, setFunctionBoolean] = useState(false);
  const [saveOrderLoading, setSaveOrderLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const { eventInfo } = useContext(EventInfoContext);

  const formatChars = {
    P: '[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz]',
    0: '[0123456789]',
  };

  function refresh() {
    window.location.reload(false);
    setFunctionBoolean(true);
  }

  useEffect(() => {
    async function getOrders() {
      const retrieveOrders = await searchOrders(token);
      setOrderNumber(retrieveOrders.length + 1);
    }
    getOrders();
  }, []);

  const { handleSubmit, handleChange, data, errors, setData, customHandleChange } = useForm({
    validations: FormValidations,

    onSubmit: async(data) => {
      const body = {
        remetente: {
          nome: data.remetente
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase(),
          cidade: data.cidaderemetente
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase(),
          estado: data.ufremetente,
        },
        destinatario: {
          nome: data.destinatario
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase(),
          cidade: data.cidadedestinatario
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase(),
          estado: data.ufdestinatario,
        },
        motorista: {
          nome: data.motorista
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase(),
          placa: data.placa,
        },
        frete: data.frete,
        peso: data.peso,
        pedagio: data.pedagio,
        imposto: data.imposto,
        adiantamento: data.adiantamento,
        abastecimento: data.abastecimento,
        valorTotal: Number(data.frete) * (Number(data.peso) / 1000),
        saldo:
          Number(data.frete) * (Number(data.peso) / 1000) -
          (Number(data.imposto) + Number(data.adiantamento) + Number(data.abastecimento)),
        cte: data.cte,
        valorcte: data.valorcte,
        data: dayjs(data.data).format('YYYY-MM-DD'),
        usuario: data.usuario,
        observacao: data.observacao,
      };

      try {
        await postOrder(token, body);
        toast('Ordem salva com sucesso!');
        setFunctionBoolean(true);
      } catch (err) {
        console.log(err);
        toast('Não foi possível salvar suas informações!');
      }
    },

    initialValues: {
      remetente: '',
      cidaderemetente: '',
      ufremetente: '',
      destinatário: '',
      cidadedestinatario: '',
      ufdestinatario: '',
      motorista: '',
      placa: '',
      frete: '',
      peso: '',
      pedagio: '',
      imposto: '',
      adiantamento: '',
      abastecimento: '',
      cte: '',
      valorcte: '',
      data: '',
      usuario: '',
      observacao: '',
    },
  });

  function nextScreen() {
    navigate('/edit');
  }

  return (
    <MainContainer background={eventInfo.backgroundImageUrl}>
      <InputContainer>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <form onSubmit={handleSubmit}>
            <LineContainer>
              <InputWrapper width={'750px'}>
                <Input
                  name="remetente"
                  label="Remetente"
                  type="text"
                  value={data?.remetente || ''}
                  onChange={handleChange('remetente')}
                  disabled={functionBoolean}
                ></Input>
                {errors.remetente && <ErrorMsg>{errors.remetente}</ErrorMsg>}
              </InputWrapper>
              <SubLineContainer>
                <InputWrapper>
                  <Input
                    name="cidaderemetente"
                    label="Cidade"
                    type="text"
                    value={data?.cidaderemetente || ''}
                    onChange={handleChange('cidaderemetente')}
                    disabled={functionBoolean}
                  ></Input>
                  {errors.cidaderemetente && <ErrorMsg>{errors.cidaderemetente}</ErrorMsg>}
                </InputWrapper>
                <InputWrapper>
                  <Select
                    name="ufremetente"
                    label="UF"
                    id="state"
                    value={data?.ufremetente || ''}
                    onChange={handleChange('ufremetente')}
                    disabled={functionBoolean}
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
                </InputWrapper>
              </SubLineContainer>
            </LineContainer>
            <LineContainer>
              <InputWrapper width={'750px'}>
                <Input
                  name="destinatario"
                  label="Destinatário"
                  type="text"
                  value={data?.destinatario || ''}
                  onChange={handleChange('destinatario')}
                  disabled={functionBoolean}
                ></Input>
                {errors.destinatario && <ErrorMsg>{errors.destinatario}</ErrorMsg>}
              </InputWrapper>
              <SubLineContainer>
                <InputWrapper>
                  <Input
                    name="cidadedestinatario"
                    label="Cidade"
                    type="text"
                    value={data?.cidadedestinatario || ''}
                    onChange={handleChange('cidadedestinatario')}
                    disabled={functionBoolean}
                  ></Input>
                  {errors.cidadedestinatario && <ErrorMsg>{errors.cidadedestinatario}</ErrorMsg>}
                </InputWrapper>

                <InputWrapper>
                  <Select
                    name="ufdestinatario"
                    label="UF"
                    id="state"
                    value={data?.ufdestinatario || ''}
                    onChange={handleChange('ufdestinatario')}
                    disabled={functionBoolean}
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
                </InputWrapper>
              </SubLineContainer>
            </LineContainer>
            <LineContainer>
              <InputWrapper width={'750px'}>
                <Input
                  name="motorista"
                  label="Motorista"
                  type="text"
                  value={data?.motorista || ''}
                  onChange={handleChange('motorista')}
                  disabled={functionBoolean}
                ></Input>
                {errors.motorista && <ErrorMsg>{errors.motorista}</ErrorMsg>}
              </InputWrapper>
              <SubLineContainer>
                <InputWrapper width={'290px'}>
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
              </SubLineContainer>
            </LineContainer>
            <LineContainer>
              <SubLineContainer>
                <InputWrapper width={'390px'}>
                  <Input
                    name="frete"
                    label="Frete por tonelada"
                    type="text"
                    value={data?.frete.replace(',', '.') || ''}
                    onChange={handleChange('frete')}
                    disabled={functionBoolean}
                  ></Input>
                  {errors.frete && <ErrorMsg>{errors.frete}</ErrorMsg>}
                </InputWrapper>
                <Separate>X</Separate>
                <InputWrapper width={'390px'}>
                  <Input
                    name="peso"
                    label="Peso em quilos"
                    type="text"
                    value={data?.peso.replace(',', '.') || ''}
                    onChange={handleChange('peso')}
                    disabled={functionBoolean}
                  ></Input>
                  {errors.peso && <ErrorMsg>{errors.peso}</ErrorMsg>}
                </InputWrapper>
              </SubLineContainer>
            </LineContainer>
            <LineContainer>
              <InputWrapper width={'220px'}>
                <Input
                  name="pedagio"
                  label="Pedágio"
                  type="text"
                  value={data?.pedagio.replace(',', '.') || ''}
                  onChange={handleChange('pedagio')}
                  disabled={functionBoolean}
                ></Input>
                {errors.pedagio && <ErrorMsg>{errors.pedagio}</ErrorMsg>}
              </InputWrapper>
              <Separate>:</Separate>
              <InputWrapper width={'220px'}>
                <Input
                  name="imposto"
                  label="INSS/SEST/SENAT"
                  type="text"
                  value={data?.imposto.replace(',', '.') || ''}
                  onChange={handleChange('imposto')}
                  disabled={functionBoolean}
                ></Input>
                {errors.pedagio && <ErrorMsg>{errors.pedagio}</ErrorMsg>}
              </InputWrapper>
              <Separate>:</Separate>
              <InputWrapper width={'220px'}>
                <Input
                  name="adiantamento"
                  label="Adiantamento"
                  type="text"
                  value={data?.adiantamento.replace(',', '.') || ''}
                  onChange={handleChange('adiantamento')}
                  disabled={functionBoolean}
                ></Input>
                {errors.adiantamento && <ErrorMsg>{errors.adiantamento}</ErrorMsg>}
              </InputWrapper>
              <Separate>:</Separate>
              <InputWrapper width={'220px'}>
                <Input
                  name="abastecimento"
                  label="Abastecimento"
                  type="text"
                  value={data?.abastecimento.replace(',', '.') || ''}
                  onChange={handleChange('abastecimento')}
                  disabled={functionBoolean}
                ></Input>
                {errors.abastecimento && <ErrorMsg>{errors.abastecimento}</ErrorMsg>}
              </InputWrapper>
            </LineContainer>
            <LineContainer>
              <InputWrapper width={'220px'}>
                <Input
                  name="cte"
                  label="Número do CTE"
                  type="text"
                  value={data?.cte || ''}
                  onChange={handleChange('cte')}
                  disabled={functionBoolean}
                ></Input>
                {errors.cte && <ErrorMsg>{errors.cte}</ErrorMsg>}
              </InputWrapper>
              <Separate>:</Separate>
              <InputWrapper width={'220px'}>
                <Input
                  name="valorcte"
                  label="Valor do CTE"
                  type="text"
                  value={data?.valorcte.replace(',', '.') || ''}
                  onChange={handleChange('valorcte')}
                  disabled={functionBoolean}
                ></Input>
                {errors.valorcte && <ErrorMsg>{errors.valorcte}</ErrorMsg>}
              </InputWrapper>
              <Separate>:</Separate>
              <InputWrapper>
                <Input
                  name="data"
                  label="Data"
                  type="text"
                  value={data?.data || ''}
                  formatChars={formatChars}
                  mask="00-00-0000"
                  onChange={handleChange('data')}
                ></Input>
                {errors.data && <ErrorMsg>{errors.data}</ErrorMsg>}
              </InputWrapper>
              <Separate>:</Separate>
              <InputWrapper width={'220px'}>
                <Input
                  name="usuario"
                  label="Nome de usuário"
                  type="text"
                  value={data?.usuario || ''}
                  onChange={handleChange('usuario')}
                  disabled={functionBoolean}
                ></Input>
                {errors.usuario && <ErrorMsg>{errors.usuario}</ErrorMsg>}
              </InputWrapper>
            </LineContainer>
            <LineContainer>
              <InputWrapper width={'775px'}>
                <Input
                  name="observacao"
                  label="Observação"
                  type="text"
                  value={data?.observacao || ''}
                  onChange={handleChange('observacao')}
                  disabled={functionBoolean}
                ></Input>
                {errors.observacao && <ErrorMsg>{errors.observacao}</ErrorMsg>}
              </InputWrapper>
              <Separate>:</Separate>
              <InputWrapper width={'220px'}>
                <Input name="numeroordem" label="Ordem N°" type="text" disabled={true} value={orderNumber}></Input>
              </InputWrapper>
            </LineContainer>
            <LineContainer>
              <ButtonContainer>
                {functionBoolean === true ? (
                  <Button onClick={refresh} disabled={saveOrderLoading}>
                    Elaborar outra ordem
                  </Button>
                ) : (
                  <Button type="submit" disabled={saveOrderLoading}>
                    Salvar Ordem
                  </Button>
                )}
              </ButtonContainer>
            </LineContainer>
          </form>
        </MuiPickersUtilsProvider>
      </InputContainer>
      <Function onClick={nextScreen}>Ir para a seleção de ordens</Function>
    </MainContainer>
  );
}

const Separate = styled.p`
  font-size: 20px;
`;
