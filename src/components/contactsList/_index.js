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
import { TableContainer } from './contactsListStyles';
import InputSelect from '../inputs/inputSelect';
import Input from '../inputs/input';
import Helper from '../../helpers/_index';
import typesContact from '../../config/types/typesContact';

export default function ContactsList(props) {
  const { contacts, setContacts } = props;

  const [type, setType] = useState(null);
  const [valueType, setValueType] = useState(null);
  const [note, setNote] = useState(null);
  const [idEditing, setIdEditing] = useState(null);

  const getInputTypeContact = t => {
    const item = typesContact.find(i => i.id == t);
    if (item && item.title) {
      return item;
    }
    return { title: 'Informação', mask: '', type: 'text' };
  };

  const removeContact = id => {
    const updatedItens = [];
    contacts.map(c => {
      if (c.id !== id) {
        updatedItens.push(c);
      }
    });

    setContacts(updatedItens);
  };

  const addContacts = () => {
    let contactsAux = [...contacts];

    if (idEditing) {
      const updatedItens = [];
      contacts.map(c => {
        if (c.id !== idEditing) {
          updatedItens.push(c);
        }
      });
      contactsAux = updatedItens;
      setIdEditing(null);
    }

    contactsAux.push({
      id: Helper.generateKey(),
      newField: true,
      type,
      valueType,
      note,
    });

    setType('');
    setValueType('');
    setNote('');
    setContacts(contactsAux);
  };

  const editContact = id => {
    const contactsAux = [...contacts];

    for (const i of contactsAux) {
      if (i.id === id) {
        setType(i.type);
        setValueType(i.valueType);
        setNote(i.note);
        setIdEditing(id);
        break;
      }
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <Typography variant="h5" className="typography-title-content">
          Contato
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container className="form-spacing">
          <Grid item xs={12} sm={12} md={3}>
            <InputSelect
              label="Tipo de Contato"
              name="tipo"
              value={type}
              onChangeSimple={setType}
              selectNoneLabel="Selecione"
              options={typesContact}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Input
              label={getInputTypeContact(type).title}
              name="contato"
              value={valueType}
              onChangeSimple={setValueType}
              typeInput={getInputTypeContact(type).type}
              mask={getInputTypeContact(type).mask}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Input
              label="Observação"
              name="observacao"
              value={note}
              onChangeSimple={setNote}
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
                <TableCell style={{ width: 150 }}>Tipo de contato</TableCell>
                <TableCell>Contato</TableCell>
                <TableCell>Observação</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{getInputTypeContact(row.type).title}</TableCell>
                  <TableCell>{row.valueType}</TableCell>
                  <TableCell>{row.note}</TableCell>
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

ContactsList.propTypes = {
  contacts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  setContacts: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

ContactsList.defaultProps = {};
