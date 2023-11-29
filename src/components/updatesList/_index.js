/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import Edit from '@material-ui/icons/Edit';
import Check from '@material-ui/icons/Check';
import Typography from '@material-ui/core/Typography';
import { format } from 'date-fns';
import { TableContainer } from './updatesListStyles';
import InputSelect from '../inputs/inputSelect';
import Input from '../inputs/input';
import Helper from '../../helpers/_index';
import typesPosition from '../../config/types/typesPosition';

export default function UpdatesList(props) {
  const { updateList, setUpdateList } = props;
  const [monthInit, setMonthInit] = useState(null);
  const [positionProduction, setPositionProduction] = useState(null);
  const [salary, setSalary] = useState(null);
  const [idEditing, setIdEditing] = useState(null);

  const removeContact = id => {
    const updatedItens = [];
    updateList.map(c => {
      if (c.id !== id) {
        updatedItens.push(c);
      }
    });

    setUpdateList(updatedItens);
  };

  const addContacts = () => {
    let updatesAux = [...updateList];

    if (idEditing) {
      const updatedItens = [];
      updateList.map(c => {
        if (c.id !== idEditing) {
          updatedItens.push(c);
        }
      });
      updatesAux = updatedItens;
      setIdEditing(null);
    }

    updatesAux.push({
      id: Helper.generateKey(),
      newField: true,
      monthInit,
      positionProduction,
      salary,
    });

    setMonthInit('');
    setPositionProduction('');
    setSalary('');
    setUpdateList(updatesAux);
  };

  const editContact = id => {
    const updatesAux = [...updateList];

    for (const i of updatesAux) {
      if (i.id === id) {
        setMonthInit(i.monthInit);
        setPositionProduction(i.positionProduction);
        setSalary(i.salary);
        setIdEditing(id);
        break;
      }
    }
  };

  const getTitle = id => {
    const item = typesPosition.find(i => i.id == id);
    if (item && item.title) {
      return item.title;
    }

    return id;
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <Typography variant="h5" className="typography-title-content">
          Atualizações
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container className="form-spacing">
          <Grid item xs={12} sm={12} md={3}>
            <Input
              label="Mês e Ano de Inicío"
              name="monthInit"
              value={monthInit}
              onChangeSimple={setMonthInit}
              typeInput="date"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <InputSelect
              label="Cargo / Função"
              name="contato"
              value={positionProduction}
              onChangeSimple={setPositionProduction}
              options={typesPosition}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Input
              label="Sálario Base"
              name="salary"
              value={salary}
              onChangeSimple={setSalary}
              typeInput="money"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={1}>
            <IconButton
              color="inherit"
              aria-label="Adicionar"
              edge="start"
              size="medium"
              onClick={() => addContacts()}
            >
              <Check />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        style={{ paddingLeft: 10, paddingRight: 10 }}
      >
        <TableContainer className="container-table" component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: 150 }}>Início em</TableCell>
                <TableCell>Cargo</TableCell>
                <TableCell>Valor Mensal</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {updateList.map(row => (
                <TableRow key={row.id}>
                  <TableCell>
                    {format(new Date(row.monthInit), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>{getTitle(row.positionProduction)}</TableCell>
                  <TableCell>{Helper.formateReal(row.salary)}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="inherit"
                      aria-label="Excluir Perfil"
                      edge="start"
                      onClick={() => removeContact(row.id)}
                    >
                      <Close />
                    </IconButton>
                    <IconButton
                      color="inherit"
                      aria-label="Editar Perfil"
                      edge="start"
                      onClick={() => editContact(row.id)}
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

UpdatesList.propTypes = {
  updateList: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
  setUpdateList: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

UpdatesList.defaultProps = {};
