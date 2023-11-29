import React, { useRef } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import { loginRequest } from '../../store/modules/auth/actions';
import { Content } from './styles';
import Input from '../../components/inputs/input';

export default function Login() {
  const fields = useRef({});
  const formik = useRef(null);

  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit(e) {
    dispatch(loginRequest(e.email, e.password));
  }

  return (
    <Content>
      <div className="login">
        <div className="top-login">
          <h3>Bem Vindo(a)!</h3>
        </div>

        <form noValidate autoComplete="off">
          <Formik
            style={{ flex: 1 }}
            innerRef={formik}
            initialValues={{
              email: 'master@erp.com',
              password: '123456',
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Informe um E-mail válido')
                .required('E-mail é obrigatório'),
              password: Yup.string().required('Senha é obrigatório'),
            })}
          >
            {({ values, handleSubmit, setFieldValue, errors, touched }) => (
              <Grid container className="form-spacing">
                <Grid item xs={12} sm={12} md={12}>
                  <Input
                    innerRef={ref => {
                      fields.current.email = ref;
                    }}
                    type="e-mail"
                    label="E-mai"
                    name="email"
                    value={values.email}
                    onChange={setFieldValue}
                    typeInput="text"
                    errors={touched.email && errors}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Input
                    innerRef={ref => {
                      fields.current.password = ref;
                    }}
                    label="Senha"
                    name="password"
                    typeInput="password"
                    value={values.password}
                    onChange={setFieldValue}
                    errors={touched.password && errors}
                  />
                </Grid>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-end"
                  className="form-spacing"
                >
                  <div className="container-buttons">
                    <Button>Esqueceu sua senha?</Button>
                    <Button
                      variant="contained"
                      onClick={() => handleSubmit()}
                      className="btn-primary btn-login"
                    >
                      {loading ? (
                        <CircularProgress className="submit-circular" />
                      ) : (
                        'Confirmar'
                      )}
                    </Button>
                  </div>
                </Grid>
              </Grid>
            )}
          </Formik>
        </form>
      </div>
    </Content>
  );
}
