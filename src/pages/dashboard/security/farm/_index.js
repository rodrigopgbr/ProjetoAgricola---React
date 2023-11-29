/* eslint-disable no-restricted-syntax */
import React, { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import Typography from '@material-ui/core/Typography';
import InputSearch from '../../../../components/inputs/inputSearch';
import InputSelect from '../../../../components/inputs/inputSelect';
import Input from '../../../../components/inputs/input';
import ContentPage from '../../../../components/ContentPage';
import SearchEmployeeModal from '../../../../components/searchEmployeeModal';
import ContactsList from '../../../../components/contactsList/_index';

export default function Farm() {
  const formik = useRef(null);
  const fields = useRef({});
  const [contacts, setContacts] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalDataParams, setModalDataParams] = useState({});

  const uf = [
    {
      key: '0',
      label: 'SP',
    },
    {
      key: '1',
      label: 'MG',
    },
  ];

  async function handleSave(data) {
    console.log(`data: ${JSON.stringify(data)}`);
  }

  function handleSearch() {
    setModalDataParams({
      id: formik.current.values.codUsuario,
      name: formik.current.values.nome,
    });
    setModalOpen(true);
  }

  function onCloseSearchEmployee(value) {
    console.log(`modalFechado->data: ${value}`);
  }

  return (
    <>
      <SearchEmployeeModal
        modalControl={[modalOpen, setModalOpen]}
        onClose={onCloseSearchEmployee}
        title="Pesquisar Funcionário"
        dataParamsSearch={modalDataParams}
      />

      <ContentPage title="Fazenda">
        <Formik
          style={{ flex: 1 }}
          innerRef={formik}
          initialValues={{
            cnpj: '',
            fazenda: '',
            cep: '',
            endereco: '',
            complemento: null,
            cidade: '',
            estado: null,
            idFuncionario: '',
            tipo: '',
            contato: '',
            observacao: '',
            idContactEdit: null,
            contatos: [],
          }}
          onSubmit={handleSave}
        >
          {({ values, handleSubmit, setFieldValue, errors, touched }) => (
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <Grid container className="form-spacing">
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      innerRef={ref => {
                        fields.current.cnpj = ref;
                      }}
                      label="CNPJ"
                      name="cnpj"
                      value={values.cnpj}
                      onChange={setFieldValue}
                      errors={touched.cnpj && errors}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={9}>
                    <InputSearch
                      innerRef={ref => {
                        fields.current.fazenda = ref;
                      }}
                      label="Fazenda"
                      name="fazenda"
                      value={values.fazenda}
                      onChange={setFieldValue}
                      errors={touched.fazenda && errors}
                      handleSearch={handleSearch}
                    />
                  </Grid>
                </Grid>
              </Grid>
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
                        fields.current.cep = ref;
                      }}
                      label="CEP"
                      name="cep"
                      value={values.cep}
                      onChange={setFieldValue}
                      errors={touched.cep && errors}
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={10}>
                    <Input
                      innerRef={ref => {
                        fields.current.endereco = ref;
                      }}
                      label="Endereço"
                      name="endereco"
                      value={values.endereco}
                      onChange={setFieldValue}
                      errors={touched.endereco && errors}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Grid container className="form-spacing">
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      innerRef={ref => {
                        fields.current.complemento = ref;
                      }}
                      label="Complemento"
                      name="complemento"
                      value={values.complemento}
                      onChange={setFieldValue}
                      errors={touched.complemento && errors}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <Input
                      innerRef={ref => {
                        fields.current.cidade = ref;
                      }}
                      label="Cidade"
                      name="cidade"
                      value={values.cidade}
                      onChange={setFieldValue}
                      errors={touched.cidade && errors}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <InputSelect
                      innerRef={ref => {
                        fields.current.estado = ref;
                      }}
                      label="Estado"
                      name="estado"
                      value={values.estado}
                      onChange={setFieldValue}
                      errors={touched.estado && errors}
                      selectNoneLabel="Selecione"
                      options={uf}
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
                  <Button
                    onClick={() => handleSubmit()}
                    className="btn-outline"
                  >
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
      </ContentPage>
    </>
  );
}
