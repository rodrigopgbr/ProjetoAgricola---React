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
import { TableContainer } from './childrensListStyles';
import InputSelect from '../inputs/inputSelect';
import Input from '../inputs/input';
import Helper from '../../helpers/_index';
import typesYesNo from '../../config/types/typesYesNo';

export default function ChildrensList(props) {
  const { childrensList, setChildrensList } = props;

  const [childrens, setChildrens] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [name, setName] = useState(null);

  const [idEditing, setIdEditing] = useState(null);

  const removeChildren = id => {
    const updatedItens = [];
    childrensList.map(c => {
      if (c.id !== id) {
        updatedItens.push(c);
      }
    });

    setChildrensList(updatedItens);
  };

  const addChildren = () => {
    let childrenAux = [...childrensList];

    if (idEditing) {
      const updatedItens = [];
      childrensList.map(c => {
        if (c.id !== idEditing) {
          updatedItens.push(c);
        }
      });
      childrenAux = updatedItens;
      setIdEditing(null);
    }

    childrenAux.push({
      id: Helper.generateKey(),
      newField: true,
      childrens,
      birthday,
      name,
    });

    setChildrens('');
    setBirthday('');
    setName('');
    setChildrensList(childrenAux);
  };

  const editChildren = id => {
    const childrenAux = [...childrensList];

    for (const i of childrenAux) {
      if (i.id === id) {
        setChildrens(i.childrens);
        setBirthday(i.birthday);
        setName(i.name);
        setIdEditing(id);
        break;
      }
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <Typography variant="h5" className="typography-title-content">
          Filhos
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container className="form-spacing">
          <Grid item xs={12} sm={12} md={3}>
            <InputSelect
              label="Possui Filhos"
              name="childrens"
              value={childrens}
              onChangeSimple={setChildrens}
              options={typesYesNo}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Input
              label="Data Nascimento"
              name="birthday"
              value={birthday}
              onChangeSimple={setBirthday}
              typeInput="date"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={5}>
            <Input
              label="Nome Completo"
              name="name"
              value={name}
              onChangeSimple={setName}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={1}>
            <IconButton
              color="inherit"
              aria-label="Adicionar"
              edge="start"
              size="medium"
              onClick={() => addChildren()}
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
                <TableCell style={{ width: 150 }}>Data Nascimento</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {childrensList.map(row => (
                <TableRow key={row.id}>
                  <TableCell>
                    {format(new Date(row.birthday), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>

                  <TableCell align="right">
                    <IconButton
                      color="inherit"
                      aria-label="Excluir Perfil"
                      edge="start"
                      onClick={() => removeChildren(row.id)}
                    >
                      <Close />
                    </IconButton>
                    <IconButton
                      color="inherit"
                      aria-label="Editar Perfil"
                      edge="start"
                      onClick={() => editChildren(row.id)}
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

ChildrensList.propTypes = {
  childrensList: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
  setChildrensList: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

ChildrensList.defaultProps = {};
