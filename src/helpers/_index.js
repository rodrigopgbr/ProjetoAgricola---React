import CryptoJS from 'crypto-js';
import History from '../config/history';

class Helpers {
  openPage = path => {
    if (path) {
      History.push(path);
    }
  };

  getPaths = () => {
    const path = window.location.pathname;
    const subpaths = path.replace('/dashboard', '');
    return { path, subpaths };
  };

  generateKey = (id, qt) => {
    const result = [];
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < (qt || charactersLength); i += 1) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return id ? `${id}-${result.join('')}` : `x-${result.join('')}`;
  };

  formateReal = value => {
    if (!Number(value)) return '';

    const amount = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100);

    return `${amount}`;
  };

  encrypt = text => {
    const novaCifra = CryptoJS.AES.encrypt(
      text,
      process.env.REACT_APP_SECRET
    ).toString();
    return novaCifra;
  };

  decrypt = text => {
    const bytes = CryptoJS.AES.decrypt(text, process.env.REACT_APP_SECRET);
    const decriptado = bytes.toString(CryptoJS.enc.Utf8);
    return decriptado;
  };

  verifyCpf = value => {
    const cpf = value.replace(/[^\d]+/g, '');
    if (cpf === '') return false;

    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length !== 11 ||
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    )
      return false;

    // Valida 1o digito
    let add = 0;

    for (let i = 0; i < 9; i += 1) {
      add += parseInt(cpf.charAt(i), 10) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
      rev = 0;
    }

    if (rev !== parseInt(cpf.charAt(9), 10)) {
      return false;
    }

    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i += 1) {
      add += parseInt(cpf.charAt(i), 10) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) {
      rev = 0;
    }
    if (rev !== parseInt(cpf.charAt(10), 10)) {
      return false;
    }
    return true;
  };

  verifyAuth = store => {};

  hasPermission = (auth, path) => {
    // chama endpoint e verifica se tem permissão
    console.log(auth);
    console.log(path);

    return true;
  };
}

export default new Helpers();
