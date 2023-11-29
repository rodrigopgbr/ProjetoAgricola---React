import React, { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';

// import { TableContainer } from './styles';

import DocumentstsList from '../../../../../../components/documentsList/_index';

export default function Documents() {
  const formik = useRef(null);
  const fields = useRef({});
  const [documents, setDocument] = useState([
    {
      id: 1,
      dateScan: '16/05/2021',
      type: 1,
      description: 'xxx',
      url: 'www.google.com',
    },
    {
      id: 2,
      dateScan: '18/05/2021',
      type: 0,
      description: 'mmmm',
      url: 'www.google.com',
    },
  ]);

  async function handleSave() {
    console.log(documents);
  }

  return (
    <Grid container>
      <DocumentstsList documents={documents} setDocument={setDocument} />
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="flex-end"
        className="form-spacing"
      >
        <Grid item>
          <Button onClick={() => handleSave()} className="btn-outline">
            Cancelar
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => handleSave()}
            className="btn-primary"
          >
            Salvar
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
