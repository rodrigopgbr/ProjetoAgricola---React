import styled from 'styled-components';
import fundo from '../../assets/img/backgroundLogin.jpg';

export const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: url(${fundo}) no-repeat center top fixed;
  background-size: cover;

  .login {
    width: 400px;
    height: 450px;
    box-shadow: 0px 0px 10px 7px rgb(0 0 0 / 23%), 0 3px 4px 0 rgb(0 0 0 / 26%),
      0 1px 5px 0 rgb(0 0 0 / 20%);
    border-radius: 20px;
    background-color: #fff;
    input {
      background: transparent;
    }

    .top-login {
      display: flex;
      margin-left: 30px;
      margin-top: 25px;
      h3 {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  form {
    padding: 30px;

    .inputs {
      width: 100%;
      margin-bottom: 30px;
    }
    .container-buttons {
      display: flex;
      flex-direction: column;

      & .btn-login {
        margin-top: 15px;
      }

      & .submit-circular {
        color: #fff;
        width: 25px !important;
        height: 25px !important;
      }
    }
  }
`;
