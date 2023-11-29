import styled from 'styled-components';
import trator from '../../assets/img/trator.png';

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #198d5e;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const ContentImage = styled.div`
  background: url(${trator}) no-repeat center top;
  background-size: cover;
  width: 200px;
  height: 200px;
`;

export const ContentText = styled.div`
  color: #fff;
  font-size: 30px;
  span {
    color: #fff;
  }
`;
