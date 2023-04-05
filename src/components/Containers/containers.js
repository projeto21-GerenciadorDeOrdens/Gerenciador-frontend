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

export const InputContainerEdit = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InputContainer = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 15px 20px 15px 20px;
  display: flex;
  flex-direction: column;
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

export const LineContainerEdit = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 0 5px 5px 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
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

export const Summary = styled.div`
  border: 2px solid lightgrey;
  padding: 10px;
  border-radius: 5px;
  margin-top: 3%;
`;

export const Function = styled.p`
  font-size: 12px;
  margin: 15px 40px 0px 40px;
  border: 2px solid lightgrey;
  border-radius: 5px;
  padding: 10px;
  background-color: #E8E8E8;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
