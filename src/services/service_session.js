import api from '../config/api';

class ServiceUsuario {
  consultaUsuario = async id => {
    try {
      const func = await api
        .get(`usuario/busca/${id}`)
        .then(retorno => {
          return retorno;
        })
        .catch(err => {
          return err.response;
        });

      return func;
    } catch (err) {
      return null;
    }
  };

  listaUsuarios = async (busca, pagina = 1) => {
    try {
      const filtro = busca && busca !== '' ? `&busca=${busca}` : '';

      const totalRegistros = 5;

      const func = await api
        .get(
          `usuario/busca-filtro?pagina=${pagina}&tamanho=${totalRegistros}${filtro}`
        )
        .then(retorno => {
          return retorno;
        })
        .catch(err => {
          return err.response;
        });

      return func;
    } catch (err) {
      return null;
    }
  };

  excluirUsuario = async funcId => {
    try {
      const func = await api
        .delete(`usuario/deletar/${funcId}`)
        .then(retorno => {
          return retorno;
        })
        .catch(err => {
          return err.response;
        });

      return func;
    } catch (err) {
      return null;
    }
  };

  salvarEditarUsuario = async (cargo, edit) => {
    try {
      const data = {
        nome: cargo.nome,
      };

      if (edit) {
        const func = await api
          .put(`cargo/editar/${cargo.id}`, data)
          .then(retorno => {
            return retorno;
          })
          .catch(err => {
            return err.response;
          });
        return func;
      }
      const func = await api
        .post(`cargo/novo`, data)
        .then(retorno => {
          return retorno;
        })
        .catch(err => {
          return err.response;
        });
      return func;
    } catch (err) {
      return null;
    }
  };
}

export default new ServiceUsuario();
