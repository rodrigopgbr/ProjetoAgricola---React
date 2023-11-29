import styled from 'styled-components';
import TableContainerComp from '@material-ui/core/TableContainer';

export const TableContainer = styled(TableContainerComp)`
  margin-bottom: 100px;
  margin-bottom: 10px !important;
  margin-top: 0 !important;
  max-height: 290px;

  td {
    padding: 0 24px 0px 16px;
  }

  .icon-select {
    color: #bdbdbd;
    &:hover {
      color: #198d5e;
    }
  }
`;
