import React, { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import Typography from '@material-ui/core/Typography';
import CheckboxTree from 'react-checkbox-tree';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputSearch from '../../../../components/inputs/inputSearch';
import Input from '../../../../components/inputs/input';
import ContentPage from '../../../../components/ContentPage';
import SearchEmployeeModal from '../../../../components/searchEmployeeModal';
import { ContentOption } from './styles';

export default function Permissions() {
  const formik = useRef(null);
  const fields = useRef({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDataParams, setModalDataParams] = useState({});
  const [permissionChecked, setPermissionCheckedn] = useState([]);
  const [permissionExpanded, setPermissionExpanded] = useState([]);

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

  const nodes = [
    {
      value: '0',
      label: 'Usuários',
    },
    {
      value: '1',
      label: 'Permissões',
    },
    {
      value: '2',
      label: 'Empresa',
    },
    {
      value: '4',
      label: 'Funcionários',
      children: [
        { value: '5', label: 'Dados' },
        { value: '6', label: 'Contatos' },
      ],
    },
  ];

  const icons = {
    check: <CheckBoxIcon />,
    uncheck: <CheckBoxOutlineBlankIcon />,
    halfCheck: <IndeterminateCheckBoxIcon />,
    expandClose: <ExpandLessIcon />,
    expandOpen: <ExpandMoreIcon />,
    expandAll: <ExpandMoreIcon />,
    collapseAll: <ExpandMoreIcon />,
    parentClose: <FolderOpenIcon />,
    parentOpen: <FolderIcon />,
  };

  return (
    <>
      <SearchEmployeeModal
        modalControl={[modalOpen, setModalOpen]}
        onClose={onCloseSearchEmployee}
        title="Pesquisar Funcionário"
        dataParamsSearch={modalDataParams}
      />

      <ContentPage title="Permissões">
        <Formik
          style={{ flex: 1 }}
          innerRef={formik}
          initialValues={{
            codPerfil: '',
            descricaoPerfil: '',
            filtroAtivos: false,
            filtroInativos: false,
          }}
          onSubmit={handleSave}
          // validationSchema={Yup.object({})}
        >
          {({ values, handleSubmit, setFieldValue, errors, touched }) => (
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <Grid container className="form-spacing">
                  <Grid item xs={12} sm={12} md={3}>
                    <Input
                      innerRef={ref => {
                        fields.current.codPerfil = ref;
                      }}
                      label="Cod.Perfil"
                      name="codPerfil"
                      value={values.codPerfil}
                      onChange={setFieldValue}
                      errors={touched.codPerfil && errors}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <InputSearch
                      innerRef={ref => {
                        fields.current.descricaoPerfil = ref;
                      }}
                      label="Descrição Perfil"
                      name="descricaoPerfil"
                      value={values.descricaoPerfil}
                      onChange={setFieldValue}
                      errors={touched.descricaoPerfil && errors}
                      handleSearch={handleSearch}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <Typography
                  variant="h5"
                  className="typography-title-content no-margin-bottom"
                >
                  Filtros
                </Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <Grid container className="form-spacing">
                  <Grid item xs={12} sm={12} md={12}>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="filtroAtivos"
                            checked={values.filtroAtivos}
                            onChange={s =>
                              setFieldValue('filtroAtivos', s.target.checked)
                            }
                            color="default"
                            inputProps={{
                              'aria-label': 'checkbox with default color',
                            }}
                          />
                        }
                        label="Somente Ativos"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={values.filtroInativos}
                            onChange={s =>
                              setFieldValue('filtroInativos', s.target.checked)
                            }
                            name="filtroInativos"
                            color="default"
                            inputProps={{
                              'aria-label': 'checkbox with default color',
                            }}
                          />
                        }
                        label="Somente Inativos"
                      />
                    </FormGroup>
                  </Grid>
                </Grid>
              </Grid>
              <ContentOption elevation={3}>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="h6">Opções de menu</Typography>
                    <Typography variant="subtitle1" className="subtitle">
                      Marque as opções que o usuário terá acesso
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <CheckboxTree
                      nodes={nodes}
                      checked={permissionChecked}
                      expanded={permissionExpanded}
                      onCheck={checked => setPermissionCheckedn(checked)}
                      onExpand={expanded => setPermissionExpanded(expanded)}
                      icons={icons}
                      showNodeIcon={false}
                      className="checkboxTree"
                    />
                  </Grid>
                </Grid>
              </ContentOption>

              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-end"
                className="form-spacing"
              >
                <Grid item>
                  <Button
                    onClick={() => console.log(permissionChecked)}
                    className="btn-outline"
                  >
                    Novo
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => handleSubmit()}
                    className="btn-primary"
                  >
                    Pesquisar
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
