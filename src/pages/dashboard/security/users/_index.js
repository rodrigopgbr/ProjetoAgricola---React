import React, { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import InputSearch from '../../../../components/inputs/inputSearch';
import InputSelect from '../../../../components/inputs/inputSelect';
import Input from '../../../../components/inputs/input';
import ContentPage from '../../../../components/ContentPage';
import {} from './styles';
import Helper from '../../../../helpers/_index';
import SearchEmployeeModal from '../../../../components/searchEmployeeModal';
import ProfileList from '../../../../components/profileList/_index';

export default function Users() {
  const formik = useRef(null);
  const fields = useRef({});

  const [modalOpen, setModalOpen] = useState(false);
  const [modalDataParams, setModalDataParams] = useState({});
  const [profiles, setProfiles] = useState([]);

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

  const yesNo = [
    {
      key: 0,
      label: 'Inativo',
    },
    {
      key: 1,
      label: 'Ativo',
    },
  ];

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

      <ContentPage title="Usuários">
        <Formik
          style={{ flex: 1 }}
          innerRef={formik}
          initialValues={{
            codUsuario: '',
            nome: '',
            cpf: '',
            email: '',
            status: null,
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
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      innerRef={ref => {
                        fields.current.codUsuario = ref;
                      }}
                      label="Cod.Usuário"
                      name="codUsuario"
                      value={values.codUsuario}
                      onChange={setFieldValue}
                      errors={touched.codUsuario && errors}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <InputSearch
                      innerRef={ref => {
                        fields.current.nome = ref;
                      }}
                      label="Nome"
                      name="nome"
                      value={values.nome}
                      onChange={setFieldValue}
                      errors={touched.nome && errors}
                      handleSearch={handleSearch}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Grid container className="form-spacing">
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
                  <Grid item xs={12} sm={12} md={6}>
                    <Input
                      innerRef={ref => {
                        fields.current.email = ref;
                      }}
                      label="Email"
                      name="email"
                      value={values.email}
                      onChange={setFieldValue}
                      errors={touched.email && errors}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={3}>
                    <Button
                      onClick={() => handleSubmit()}
                      className="btn-outline"
                    >
                      Resetar Senha
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Grid container className="form-spacing">
                  <Grid item xs={12} sm={12} md={3}>
                    <InputSelect
                      innerRef={ref => {
                        fields.current.status = ref;
                      }}
                      label="Status"
                      name="status"
                      value={values.status}
                      onChange={setFieldValue}
                      options={yesNo}
                      defaultKey={0}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <ProfileList profiles={profiles} setProfiles={setProfiles} />

              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-end"
                className="form-spacing"
              >
                <Grid item>
                  <Button onClick={() => handleSubmit()} className="btn-link">
                    Copiar permissão
                  </Button>
                </Grid>
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
