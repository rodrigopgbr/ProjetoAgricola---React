import React, { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import Typography from '@material-ui/core/Typography';
import Input from '../../../../../../components/inputs/input';

// import { TableContainer } from './styles';

import ContactsList from '../../../../../../components/contactsList/_index';

export default function Contacts() {
  const formik = useRef(null);
  const fields = useRef({});
  const [contacts, setContacts] = useState([
    {
      id: 1,
      type: 0,
      valueType: '111',
      note: 'xxx',
    },
  ]);

  async function handleSave(data) {
    console.log(contacts);
    console.log(`data: ${JSON.stringify(data)}`);
  }

  return (
    <Formik
      style={{ flex: 1 }}
      innerRef={formik}
      initialValues={{
        cep: '',
        endereco: '',
        complemento: '',
        cidade: '',
        estado: '',
      }}
      onSubmit={handleSave}
    >
      {({ values, handleSubmit, setFieldValue, errors, touched }) => (
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h5" className="typography-title-content">
              Endereço
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container className="form-spacing">
              <Grid item xs={12} sm={12} md={2}>
                <Input
                  innerRef={ref => {
                    fields.current.nome = ref;
                  }}
                  label="Cep"
                  name="nome"
                  value={values.nome}
                  onChange={setFieldValue}
                  errors={touched.nome && errors}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={10}>
                <Input
                  innerRef={ref => {
                    fields.current.cpf = ref;
                  }}
                  label="Endereço"
                  name="cpf"
                  value={values.cpf}
                  onChange={setFieldValue}
                  errors={touched.cpf && errors}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container className="form-spacing">
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  innerRef={ref => {
                    fields.current.nome = ref;
                  }}
                  label="Complemento"
                  name="nome"
                  value={values.nome}
                  onChange={setFieldValue}
                  errors={touched.nome && errors}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  innerRef={ref => {
                    fields.current.cpf = ref;
                  }}
                  label="Cidade"
                  name="cpf"
                  value={values.cpf}
                  onChange={setFieldValue}
                  errors={touched.cpf && errors}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  innerRef={ref => {
                    fields.current.cpf = ref;
                  }}
                  label="Estado"
                  name="cpf"
                  value={values.cpf}
                  onChange={setFieldValue}
                  errors={touched.cpf && errors}
                />
              </Grid>
            </Grid>
          </Grid>
          <ContactsList contacts={contacts} setContacts={setContacts} />
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
            className="form-spacing"
          >
            <Grid item>
              <Button onClick={() => handleSubmit()} className="btn-outline">
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => handleSubmit()}
                className="btn-primary"
              >
                Salvar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
}
