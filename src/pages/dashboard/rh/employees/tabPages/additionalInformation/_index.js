import React, { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import Typography from '@material-ui/core/Typography';

// import { TableContainer } from './styles';

import ChildrensList from '../../../../../../components/childrensList/_index';
import InputSelect from '../../../../../../components/inputs/inputSelect';
import Input from '../../../../../../components/inputs/input';

export default function AdditionalInformation() {
  const formik = useRef(null);
  const fields = useRef({});
  const [childrensList, setChildrensList] = useState([
    {
      id: 1,
      birthday: '2021/05/15',
      name: 1,
    },
  ]);

  async function handleSave(data) {
    console.log(childrensList);
    console.log(`data: ${JSON.stringify(data)}`);
  }

  const tiposRemuneracao = [];
  const tiposHorarioTrabalhado = [];

  return (
    <Formik
      style={{ flex: 1 }}
      innerRef={formik}
      initialValues={{
        escolaridade: '',
        vinculoUnidade: '',
        estadoCivil: '',
        regimeCasamento: '',
        dataCasamento: '',
        dataNascimento: '',
        nomeConjuge: '',
        dataCadastro: '',
        usuarioCadastro: '',
        nomeUsuarioCadastro: '',
        DataUltimaAlteracao: '',
        usuarioUltimaAlteracao: '',
        nomeUsuarioAlteracao: '',
      }}
      onSubmit={handleSave}
    >
      {({ values, handleSubmit, setFieldValue, errors, touched }) => (
        <Grid container>
          <ChildrensList
            childrensList={childrensList}
            setChildrensList={setChildrensList}
          />

          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h5" className="typography-title-content">
              Estado Civil
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Grid container className="form-spacing">
              <Grid item xs={12} sm={12} md={4}>
                <InputSelect
                  innerRef={ref => {
                    fields.current.estadoCivil = ref;
                  }}
                  label="Estado Civil"
                  name="estadoCivil"
                  value={values.estadoCivil}
                  onChange={setFieldValue}
                  options={tiposRemuneracao}
                  errors={touched.estadoCivil && errors}
                  selectNoneLabel="Selecione"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <InputSelect
                  innerRef={ref => {
                    fields.current.regimeCasamento = ref;
                  }}
                  label="Regime do Casamento"
                  name="regimeCasamento"
                  value={values.regimeCasamento}
                  onChange={setFieldValue}
                  options={tiposHorarioTrabalhado}
                  errors={touched.regimeCasamento && errors}
                  selectNoneLabel="Selecione"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  innerRef={ref => {
                    fields.current.dataCasamento = ref;
                  }}
                  label="Data Do Casamento"
                  name="dataCasamento"
                  value={values.dataCasamento}
                  onChange={setFieldValue}
                  options={tiposHorarioTrabalhado}
                  errors={touched.dataCasamento && errors}
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
                    fields.current.dataNascimento = ref;
                  }}
                  label="Data De Nascimento"
                  name="dataNascimento"
                  value={values.dataNascimento}
                  onChange={setFieldValue}
                  options={tiposHorarioTrabalhado}
                  errors={touched.dataNascimento && errors}
                  typeInput="date"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Input
                  innerRef={ref => {
                    fields.current.nomeConjuge = ref;
                  }}
                  label="Nome Conjuge"
                  name="nomeConjuge"
                  value={values.nomeConjuge}
                  onChange={setFieldValue}
                  options={tiposHorarioTrabalhado}
                  errors={touched.nomeConjuge && errors}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h5" className="typography-title-content">
              Informações Adicionais
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Grid container className="form-spacing">
              <Grid item xs={12} sm={12} md={4}>
                <InputSelect
                  innerRef={ref => {
                    fields.current.escolaridade = ref;
                  }}
                  label="Escolaridade"
                  name="escolaridade"
                  value={values.escolaridade}
                  onChange={setFieldValue}
                  options={tiposRemuneracao}
                  errors={touched.escolaridade && errors}
                  selectNoneLabel="Selecione"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <InputSelect
                  innerRef={ref => {
                    fields.current.vinculoUnidade = ref;
                  }}
                  label="Vinculo Unidade"
                  name="vinculoUnidade"
                  value={values.vinculoUnidade}
                  onChange={setFieldValue}
                  options={tiposHorarioTrabalhado}
                  errors={touched.vinculoUnidade && errors}
                  selectNoneLabel="Selecione"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Typography variant="h5" className="typography-title-content">
              Cadastro / Atualização
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <Grid container className="form-spacing">
              <Grid item xs={12} sm={12} md={3}>
                <Input
                  innerRef={ref => {
                    fields.current.dataCadastro = ref;
                  }}
                  label="Data de Cadastro"
                  name="dataCadastro"
                  value={values.dataCadastro}
                  onChange={setFieldValue}
                  errors={touched.dataCadastro && errors}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <Input
                  innerRef={ref => {
                    fields.current.usuarioCadastro = ref;
                  }}
                  label="Usuário de Cadastro"
                  name="usuarioCadastro"
                  value={values.usuarioCadastro}
                  onChange={setFieldValue}
                  errors={touched.usuarioCadastro && errors}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Input
                  innerRef={ref => {
                    fields.current.nomeUsuarioCadastro = ref;
                  }}
                  label="Nome do Usuário"
                  name="nomeUsuarioCadastro"
                  value={values.nomeUsuarioCadastro}
                  onChange={setFieldValue}
                  errors={touched.nomeUsuarioCadastro && errors}
                  disabled
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container className="form-spacing">
              <Grid item xs={12} sm={12} md={3}>
                <Input
                  innerRef={ref => {
                    fields.current.DataUltimaAlteracao = ref;
                  }}
                  label="Data ult. Alteração"
                  name="DataUltimaAlteracao"
                  value={values.DataUltimaAlteracao}
                  onChange={setFieldValue}
                  errors={touched.DataUltimaAlteracao && errors}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={3}>
                <Input
                  innerRef={ref => {
                    fields.current.usuarioUltimaAlteracao = ref;
                  }}
                  label="Usuário ult. Alteração"
                  name="usuarioUltimaAlteracao"
                  value={values.usuarioUltimaAlteracao}
                  onChange={setFieldValue}
                  errors={touched.usuarioUltimaAlteracao && errors}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Input
                  innerRef={ref => {
                    fields.current.nomeUsuarioAlteracao = ref;
                  }}
                  label="Nome do Usuário"
                  name="nomeUsuarioAlteracao"
                  value={values.nomeUsuarioAlteracao}
                  onChange={setFieldValue}
                  errors={touched.nomeUsuarioAlteracao && errors}
                  disabled
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
