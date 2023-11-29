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
import Check from '@material-ui/icons/Check';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { TableContainer } from './documentsListStyles';
import InputSelect from '../inputs/inputSelect';
import Input from '../inputs/input';
import Helper from '../../helpers/_index';

export default function DocumentsList(props) {
  const { documents, setDocument } = props;

  const [type, setType] = useState(null);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(null);
  const [idEditing, setIdEditing] = useState(null);

  const typesFile = [
    {
      id: '0',
      title: 'RG',
    },
    {
      id: '1',
      title: 'CPF',
    },
  ];

  const removeFile = id => {
    const updatedItens = [];
    documents.map(c => {
      if (c.id !== id) {
        updatedItens.push(c);
      }
    });

    setDocument(updatedItens);
  };

  const addFile = () => {
    let documentsAux = [...documents];

    if (idEditing) {
      const updatedItens = [];
      documents.map(c => {
        if (c.id !== idEditing) {
          updatedItens.push(c);
        }
      });
      documentsAux = updatedItens;
      setIdEditing(null);
    }

    documentsAux.push({
      id: Helper.generateKey(),
      newField: true,
      type,
      file,
      description,
    });

    setType('');
    setFile('');

    setDescription('');
    setDocument(documentsAux);
  };

  const downloadFile = () => {
    console.log('download');
  };

  const getTitle = id => {
    const item = typesFile.find(i => i.id == id);
    if (item && item.title) {
      return item.title;
    }

    return id;
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container className="form-spacing">
          <Grid item xs={12} sm={12} md={4}>
            <InputSelect
              label="Tipo de Documento"
              name="tipoDocumento"
              value={type}
              onChangeSimple={setType}
              options={typesFile}
              selectNoneLabel="Selecione"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={8}>
            <Input
              label="Documento"
              name="documento"
              value={file}
              onChangeSimple={setFile}
              typeInput="file"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container className="form-spacing">
          <Grid item xs={12} sm={12} md={8}>
            <Input
              label="Descrição"
              name="descricao"
              value={description}
              onChangeSimple={setDescription}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={1}>
            <IconButton
              color="inherit"
              aria-label="Adicionar"
              edge="start"
              size="medium"
              onClick={() => addFile()}
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
                <TableCell style={{ width: 150 }}>Data Digitalização</TableCell>
                <TableCell>Tipo Documento</TableCell>
                <TableCell>Documento</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {documents.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.dateScan}</TableCell>
                  <TableCell>{getTitle(row.type)}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="inherit"
                      aria-label="Excluir Perfil"
                      edge="start"
                      onClick={() => removeFile(row.id)}
                    >
                      <Close />
                    </IconButton>
                    <IconButton
                      color="inherit"
                      aria-label="Editar Perfil"
                      edge="start"
                      onClick={() => downloadFile(row)}
                    >
                      <CloudDownloadIcon />
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

DocumentsList.propTypes = {
  documents: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
  setDocument: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

DocumentsList.defaultProps = {};
