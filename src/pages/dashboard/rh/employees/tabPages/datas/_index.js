import React, { useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import InputSelect from '../../../../../../components/inputs/inputSelect';
import Input from '../../../../../../components/inputs/input';

export default function Datas() {
  const formik = useRef(null);
  const fields = useRef({});

  async function handleSave(data) {
    console.log(`data: ${JSON.stringify(data)}`);
  }

  const sexos = [
    {
      id: '0',
      title: 'Masculino',
    },
    {
      id: '1',
      title: 'Feminino',
    },
    {
      id: '1',
      title: 'Prefiro não identificar',
    },
  ];

  const categoriasCnh = [
    {
      id: '0',
      title: 'A',
    },
    {
      id: '1',
      title: 'B',
    },
    {
      id: '2',
      title: 'AB',
    },
  ];

  return (
    <Formik
      style={{ flex: 1 }}
      innerRef={formik}
      initialValues={{
        nomeCompleto: '',
        cpf: '',
        sexo: '',
        nomeAlternativo: '',
        dataNascimento: '',
        rg: '',
        carteiraTrabalho: '',
        dataAdmissao: '',
        dataDemissao: '',
        dataExameAdmissional: '',
        primeiroContrato: '',
        segundoContrato: '',
        categoriaCnh: '0',
      }}
      onSubmit={handleSave}
    >
      {({ values, handleSubmit, setFieldValue, errors, touched }) => (
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container className="form-spacing">
              <Grid item xs={12} sm={12} md={9}>
                <Input
                  innerRef={ref => {
                    fields.current.nomeCompleto = ref;
                  }}
                  label="Nome Completo"
                  name="nomeCompleto"
                  value={values.nomeCompleto}
                  onChange={setFieldValue}
                  errors={touched.nomeCompleto && errors}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <Input
                  innerRef={ref => {
                    fields.current.cpf = ref;
                  }}
                  label="Cpf"
                  name="cpf"
                  value={values.cpf}
                  onChange={setFieldValue}
                  errors={touched.cpf && errors}
                  typeInput="mask"
                  mask="999.999.999-99"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Grid container className="form-spacing">
              <Grid item xs={12} sm={12} md={3}>
                <InputSelect
                  innerRef={ref => {
                    fields.current.sexo = ref;
                  }}
                  label="Sexo"
                  name="sexo"
                  value={values.sexo}
                  onChange={setFieldValue}
                  options={sexos}
                  defaultKey={0}
                  returnString
                />
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <Input
                  innerRef={ref => {
                    fields.current.nomeAlternativo = ref;
                  }}
                  label="Como prefere ser chamado"
                  name="nomeAlternativo"
                  value={values.nomeAlternativo}
                  onChange={setFieldValue}
                  errors={touched.nomeAlternativo && errors}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Grid container className="form-spacing">
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  innerRef={ref => {
                    fields.current.dataNascimento = ref;
                  }}
                  label="Data Nascimento"
                  name="dataNascimento"
                  value={values.dataNascimento}
                  onChange={setFieldValue}
                  typeInput="date"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  innerRef={ref => {
                    fields.current.rg = ref;
                  }}
                  label="RG"
                  name="rg"
                  value={values.rg}
                  onChange={setFieldValue}
                  errors={touched.rg && errors}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  innerRef={ref => {
                    fields.current.carteiraTrabalho = ref;
                  }}
                  label="Carteira de trabalho"
                  name="carteiraTrabalho"
                  value={values.carteiraTrabalho}
                  onChange={setFieldValue}
                  errors={touched.carteiraTrabalho && errors}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Grid container className="form-spacing">
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  innerRef={ref => {
                    fields.current.dataAdmissao = ref;
                  }}
                  label="Data de admissão"
                  name="dataAdmissao"
                  value={values.dataAdmissao}
                  onChange={setFieldValue}
                  typeInput="date"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  innerRef={ref => {
                    fields.current.dataDemissao = ref;
                  }}
                  label="Data de demissão"
                  name="dataDemissao"
                  value={values.dataDemissao}
                  onChange={setFieldValue}
                  typeInput="date"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  innerRef={ref => {
                    fields.current.dataExameAdmissional = ref;
                  }}
                  label="Data do exame adimissional"
                  name="dataExameAdmissional"
                  value={values.dataExameAdmissional}
                  onChange={setFieldValue}
                  typeInput="date"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Grid container className="form-spacing">
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  innerRef={ref => {
                    fields.current.primeiroContrato = ref;
                  }}
                  label="1º contrato de Experiência"
                  name="primeiroContrato"
                  value={values.primeiroContrato}
                  onChange={setFieldValue}
                  typeInput="date"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  innerRef={ref => {
                    fields.current.segundoContrato = ref;
                  }}
                  label="2º contrato de Experiência"
                  name="segundoContrato"
                  value={values.segundoContrato}
                  onChange={setFieldValue}
                  errors={touched.segundoContrato && errors}
                  typeInput="date"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <InputSelect
                  innerRef={ref => {
                    fields.current.categoriaCnh = ref;
                  }}
                  label="Categoria CNH"
                  name="categoriaCnh"
                  value={values.categoriaCnh}
                  onChange={setFieldValue}
                  options={categoriasCnh}
                  defaultKey={0}
                />
              </Grid>
            </Grid>
          </Grid>

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
