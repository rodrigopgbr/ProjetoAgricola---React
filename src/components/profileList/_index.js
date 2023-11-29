/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
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
import { TableContainer } from './profileListStyles';
import Input from '../inputs/input';
import Helper from '../../helpers/_index';

export default function ProfileList(props) {
  const { profiles, setProfiles } = props;
  const [codProfile, setCodProfile] = useState(null);
  const [descProfile, setDescProfile] = useState(null);
  const [idEditing, setIdEditing] = useState(null);

  const removeProfile = id => {
    const updatedItens = [];
    profiles.map(c => {
      if (c.id !== id) {
        updatedItens.push(c);
      }
    });

    setProfiles(updatedItens);
  };

  const addProfile = () => {
    let profileAux = [...profiles];

    if (idEditing) {
      const updatedItens = [];
      profiles.map(c => {
        if (c.id !== idEditing) {
          updatedItens.push(c);
        }
      });
      profileAux = updatedItens;
      setIdEditing(null);
    }

    profileAux.push({
      id: Helper.generateKey(),
      newField: true,
      codProfile,
      descProfile,
    });

    setCodProfile('');
    setDescProfile('');
    setProfiles(profileAux);
  };

  const editProfile = id => {
    const profileAux = [...profiles];

    for (const i of profileAux) {
      if (i.id === id) {
        setCodProfile(i.codProfile);
        setDescProfile(i.descProfile);
        setIdEditing(id);
        break;
      }
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12}>
        <Typography variant="h5" className="typography-title-content">
          Perfil
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container className="form-spacing">
          <Grid item xs={12} sm={12} md={3}>
            <Input
              label="Cod.Perfil"
              name="codProfile"
              value={codProfile}
              onChangeSimple={setCodProfile}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={7}>
            <Input
              label="Descrição Perfil"
              name="descProfile"
              value={descProfile}
              onChangeSimple={setDescProfile}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={1}>
            <IconButton
              color="inherit"
              aria-label="Adicionar"
              edge="start"
              size="medium"
              onClick={() => addProfile()}
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
                <TableCell style={{ width: 150 }}>Código Perfil</TableCell>
                <TableCell>Descrição Perfil</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {profiles.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.codProfile}</TableCell>
                  <TableCell>{row.descProfile}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="inherit"
                      aria-label="Excluir Perfil"
                      edge="start"
                      onClick={() => removeProfile(row.id)}
                    >
                      <Close />
                    </IconButton>
                    <IconButton
                      color="inherit"
                      aria-label="Editar Perfil"
                      edge="start"
                      onClick={() => editProfile(row.id)}
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

ProfileList.propTypes = {
  profiles: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  setProfiles: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

ProfileList.defaultProps = {};
