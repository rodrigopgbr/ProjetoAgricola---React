import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { Content, ContentImage, ContentText } from './styles';

export default function NotFound() {
  const history = useHistory();
  return (
    <Content>
      <ContentImage />
      <ContentText>
        <p>Página não encontrada</p>
        <Button onClick={() => history.goBack()}>Voltar</Button>
      </ContentText>
    </Content>
  );
}
