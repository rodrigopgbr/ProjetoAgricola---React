import api from '../config/api';

class ServiceSession {
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
}

export default new ServiceSession();
