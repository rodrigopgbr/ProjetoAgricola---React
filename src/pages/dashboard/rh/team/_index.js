import React, { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';
import InputSearch from '../../../../components/inputs/inputSearch';
import InputSelect from '../../../../components/inputs/inputSelect';
import Input from '../../../../components/inputs/input';
import ContentPage from '../../../../components/ContentPage';
import { TableContainer } from './styles';
import Helper from '../../../../helpers/_index';
import SearchEmployeeModal from '../../../../components/searchEmployeeModal';

export default function Team() {
  const formik = useRef(null);
  const fields = useRef({});

  const [modalOpen, setModalOpen] = useState(false);
  const [modalDataParams, setModalDataParams] = useState({});

  // ----- contatos -------
  const [typesContact, setTypesContact] = useState([
    {
      key: '0',
      label: 'Celular',
    },
    {
      key: '1',
      label: 'Telefone',
    },
  ]);
  const [contatos, setContatos] = useState([
    {
      id: '1',
      tipo: '0',
      value: '16992526521',
      observacao: 'xpto',
    },
    {
      id: '2',
      tipo: '1',
      value: '16992526521',
      observacao: 'xpto',
    },
  ]);
  const validateContacts = () => {
    let isValid = true;
    const allContactsAux = [...contatos];
    const contactsAux = allContactsAux.map(c => {
      const contact = c;
      const errors = [];
      if (contact.tipo === '') {
        errors.tipo = 'Informe o tipo';
        isValid = false;
      }
      if (contact.value === '') {
        errors.value = 'Campo não pode ser vazio';
        isValid = false;
      }
      contact.errors = errors;
      return contact;
    });
    setContatos(contactsAux);
    return isValid;
  };

  const addContacts = () => {
    if (validateContacts()) {
      const contactsAux = [...contatos];
      contactsAux.push({
        virtualId: Helper.generateKey(),
        newField: true,
        tipo: '',
        value: '',
        observacao: '',
      });
      setContatos(contactsAux);
    }
  };

  const setFieldContacts = (id, name, value) => {
    const allContactsAux = [...contatos];
    const contactsAux = allContactsAux.map(c => {
      const contact = c;
      if (contact.id === id || contact.virtualId === id) {
        contact[name] = value;
      }
      return contact;
    });
    setContatos(contactsAux);
    validateContacts();
  };

  //-------------------

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

  const getInputTypeContact = type => {
    const item = typesContact.find(i => i.key === type);

    switch (item && item.label) {
      case 'Celular':
        return { label: 'Celular', mask: '(99) 99999-9999', type: 'mask' };
      case 'Telefone':
        return { label: 'Telefone', mask: '(99) 9999-9999', type: 'mask' };
      default:
        return { label: 'Informação', mask: '', type: 'text' };
    }
  };

  const removeContact = id => {
    const allContactsAux = [...contatos];
    const updatedItens = [];
    allContactsAux.map(c => {
      if (c.id !== id && c.virtualId !== id) {
        updatedItens.push(c);
      }
    });
    setContatos(updatedItens);
  };

  return (
    <>
      <SearchEmployeeModal
        modalControl={[modalOpen, setModalOpen]}
        onClose={onCloseSearchEmployee}
        title="Pesquisar Funcionário"
        dataParamsSearch={modalDataParams}
      />

      <ContentPage title="Times">
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
          }}
          onSubmit={handleSave}
        >
          {({ values, handleSubmit, setFieldValue, errors, touched }) => (
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <Grid container className="form-spacing">
                  <Grid item xs={12} sm={12} md={12}>
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
                  <Grid item xs={12} sm={12} md={12}>
                    <InputSelect
                      id="x"
                      label="Tipo de Contato"
                      name="tipo"
                      value=""
                      onChangeId={setFieldContacts}
                      selectNoneLabel="Selecione"
                      options={typesContact}
                      // errors={c.errors}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid container className="form-spacing">
                <Grid item xs={12} sm={12} md={12}>
                  <Typography variant="h5" className="typography-title-content">
                    Informe os colaboradores
                  </Typography>
                </Grid>

                {contatos &&
                  contatos.map(c => (
                    <Grid
                      key={c.id || c.virtualId}
                      item
                      xs={12}
                      sm={12}
                      md={12}
                    >
                      <Grid container className="form-spacing">
                        <Grid item xs={12} sm={12} md={3}>
                          <InputSelect
                            id={c.id || c.virtualId}
                            label="CPF"
                            name="tipo"
                            value={c.tipo || ''}
                            onChangeId={setFieldContacts}
                            selectNoneLabel="Selecione"
                            options={typesContact}
                            errors={c.errors}
                          />
                        </Grid>

                        <Grid item xs={12} sm={12} md={5}>
                          <Input
                            id={c.id || c.virtualId}
                            label="Nome"
                            name="observacao"
                            value={c.observacao || ''}
                            onChangeId={setFieldContacts}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={1}>
                          <IconButton
                            onClick={() => removeContact(c.id || c.virtualId)}
                            color="inherit"
                            aria-label="Excluir Perfil"
                            edge="start"
                            size="medium"
                          >
                            <Close />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}

                <Grid
                  container
                  direction="row"
                  justify="flex-end"
                  alignItems="flex-end"
                  className="form-spacing"
                >
                  <Grid item>
                    <IconButton
                      onClick={() => addContacts()}
                      color="inherit"
                      aria-label="Excluir Perfil"
                      edge="start"
                      size="medium"
                    >
                      <Add />
                    </IconButton>
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
            </Grid>
          )}
        </Formik>
      </ContentPage>
    </>
  );
}
