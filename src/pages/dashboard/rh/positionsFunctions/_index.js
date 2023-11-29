import React, { useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import Typography from '@material-ui/core/Typography';
import Input from '../../../../components/inputs/input';
import ContentPage from '../../../../components/ContentPage';
import {} from './styles';
import Helper from '../../../../helpers/_index';

export default function PositionsFunctions() {
  const formik = useRef(null);
  const fields = useRef({});

  async function handleSave(data) {
    console.log(`data: ${JSON.stringify(data)}`);
  }

  return (
    <ContentPage title="Cargos / Funções">
      <Formik
        style={{ flex: 1 }}
        innerRef={formik}
        initialValues={{
          cargo: '',
          salario: '',
          descricaoCargo: '',
          dataCadastro: '',
          usuarioCadastro: '',
          nomeUsuarioCadastro: '',
          DataUltimaAlteracao: '',
          usuarioUltimaAlteracao: '',
          nomeUsuarioAlteracao: '',
        }}
        onSubmit={handleSave}
        validationSchema={Yup.object({
          codUsuario: Yup.string().required('é requerido'),
          nome: Yup.string().required('informe um nome'),
          cpf: Yup.string()
            .required('informe o CPF')
            .test('cpfVerify', 'informe o CPF', v => {
              return v ? Helper.verifyCpf(v) : false;
            }),
          email: Yup.string()
            .email('informe um email válido')
            .required('informe um email'),
        })}
      >
        {({ values, handleSubmit, setFieldValue, errors, touched }) => (
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container className="form-spacing">
                <Grid item xs={12} sm={12} md={8}>
                  <Input
                    innerRef={ref => {
                      fields.current.cargo = ref;
                    }}
                    label="Cargo / Função"
                    name="cargo"
                    value={values.cargo}
                    onChange={setFieldValue}
                    errors={touched.cargo && errors}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                  <Input
                    innerRef={ref => {
                      fields.current.salario = ref;
                    }}
                    label="Salário base"
                    name="salario"
                    value={values.salario}
                    onChange={setFieldValue}
                    typeInput="money"
                    errors={touched.salario && errors}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container className="form-spacing">
                <Grid item xs={12} sm={12} md={12}>
                  <Input
                    innerRef={ref => {
                      fields.current.descricaoCargo = ref;
                    }}
                    label="Descrição do cargo"
                    name="descricaoCargo"
                    value={values.descricaoCargo}
                    onChange={setFieldValue}
                    errors={touched.descricaoCargo && errors}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h5" className="typography-title-content">
                Perfil
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
    </ContentPage>
  );
}
