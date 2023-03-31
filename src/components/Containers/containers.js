import styled from 'styled-components';

export const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-size: cover;
  min-height: 100vh;
  background: ${(props) => props.background};
`;

export const InputContainer = styled.div`
  width: 61%;
  height: 650px;
  background: #ffffff;
  border-radius: 10px;
  padding: 15px 20px 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LineContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 0 5px 5px 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SubLineContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 0 5px 5px 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 0 5px 5px 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
