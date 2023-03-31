import styled from 'styled-components';
import EventInfoContext from '../../contexts/EventInfoContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ButtonContainer,
  MainContainer,
  InputContainer,
  LineContainer,
  SubLineContainer,
} from '../Containers/containers';
import useToken from '../../hooks/useToken';

export function Edit() {
  const { eventInfo } = useContext(EventInfoContext);

  return (
    <MainContainer background={eventInfo.backgroundImageUrl}>
      <InputContainer>oi</InputContainer>
    </MainContainer>
  );
}
