import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Check from '@material-ui/icons/Check';
import Pagination from '@material-ui/lab/Pagination';
import Input from './inputs/input';

import { TableContainer } from './searchEmployeeModal-styles';

export default function SearchEmployeeModal(props) {
  const { modalControl, title, onClose, dataParamsSearch } = props;
  const refModal = useRef();
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');

  function close(data) {
    modalControl[1](false);
    if (onClose) {
      setSearchId('');

      setSearchName('');

      onClose(data);
    }
  }

  const search = async () => {
    console.log('fazendo busca na api');
  };

  React.useEffect(() => {
    if (modalControl[0]) {
      if ((dataParamsSearch && dataParamsSearch.id) || dataParamsSearch.name) {
        if (dataParamsSearch.id) {
          setSearchId(dataParamsSearch.id);
        }
        if (dataParamsSearch.name) {
          setSearchName(dataParamsSearch.name);
        }
        search();
      }
    }
  }, [modalControl[0]]);

  function createData(id, perfil) {
    return { id, perfil };
  }
  const rows = [
    createData('000001', 'Gerente'),
    createData('000002', 'Funcionario'),
    createData('000003', 'Gerente'),
    createData('000004', 'Funcionario'),
    createData('000005', 'Gerente'),
    createData('000006', 'Funcionario'),
    createData('000007', 'Gerente'),
    createData('000008', 'Funcionario'),
    createData('000009', 'Gerente'),
    createData('000010', 'Funcionario'),
    createData('000011', 'Gerente'),
    createData('000012', 'Funcionario'),
    createData('000013', 'Gerente'),
    createData('000014', 'Funcionario'),
  ];

  return (
    <div>
      <Dialog
        ref={refModal}
        open={modalControl[0]}
        onClose={() => modalControl[1](false)}
        scroll="paper"
        style={{ position: 'absolute', zIndex: 20000 }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>
          <Grid container className="form-spacing">
            <Grid item xs={12} sm={12} md={4}>
              <Input
                label="Cod.Usuário"
                name="codUsuario"
                value={searchId}
                type="number"
                onChangeSimple={setSearchId}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Input
                label="Nome"
                name="nome"
                value={searchName}
                onChangeSimple={setSearchName}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <TableContainer className="container-table" component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: 130 }}>Código</TableCell>
                      <TableCell>Perfil</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.perfil}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            className="icon-select"
                            aria-label="Excluir Perfil"
                            edge="start"
                            onClick={() => close(row)}
                          >
                            <Check aria-label="deletar" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={12} sm={12} md={12}>
                <Pagination count={10} variant="outlined" shape="rounded" />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => close()} color="primary">
            Voltar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

SearchEmployeeModal.propTypes = {};

SearchEmployeeModal.defaultProps = {};
