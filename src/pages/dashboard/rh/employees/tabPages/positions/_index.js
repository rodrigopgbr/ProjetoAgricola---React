import React, { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';

// import { TableContainer } from './styles';

import UpdatesList from '../../../../../../components/updatesList/_index';
import InputSelect from '../../../../../../components/inputs/inputSelect';

export default function Positions() {
  const formik = useRef(null);
  const fields = useRef({});
  const [updateList, setUpdateList] = useState([
    {
      id: 1,
      monthInit: '2021/05/15',
      positionProduction: 1,
      salary: 1000,
    },
  ]);

  async function handleSave(data) {
    console.log(updateList);
    console.log(`data: ${JSON.stringify(data)}`);
  }

  const tiposRemuneracao = [];
  const tiposHorarioTrabalhado = [];

  return (
    <Formik
      style={{ flex: 1 }}
      innerRef={formik}
      initialValues={{
        tipoRemuneracao: '',
        horarioTrabalhado: '',
      }}
      onSubmit={handleSave}
    >
      {({ values, handleSubmit, setFieldValue, errors, touched }) => (
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container className="form-spacing">
              <Grid item xs={12} sm={12} md={4}>
                <InputSelect
                  innerRef={ref => {
                    fields.current.tipoRemuneracao = ref;
                  }}
                  label="Tipo de Remuneração"
                  name="tipoRemuneracao"
                  value={values.tipoRemuneracao}
                  onChange={setFieldValue}
                  options={tiposRemuneracao}
                  errors={touched.tipoRemuneracao && errors}
                  selectNoneLabel="Selecione"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <InputSelect
                  innerRef={ref => {
                    fields.current.horarioTrabalhado = ref;
                  }}
                  label="Horário Trabalhado"
                  name="horarioTrabalhado"
                  value={values.horarioTrabalhado}
                  onChange={setFieldValue}
                  options={tiposHorarioTrabalhado}
                  errors={touched.horarioTrabalhado && errors}
                  selectNoneLabel="Selecione"
                />
              </Grid>
            </Grid>
          </Grid>

          <UpdatesList updateList={updateList} setUpdateList={setUpdateList} />

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
