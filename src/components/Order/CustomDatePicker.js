import styled from 'styled-components';
import { DatePicker } from '@material-ui/pickers';

export const CustomDatePicker = styled(DatePicker)`
width: ${(props) => props.width};
margin-top: 8px !important;
> div {
  margin-top: auto !important;
}
> label {
  margin-top: auto !important;
}
`;
