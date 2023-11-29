import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rating } from '@material-ui/lab';
import PropTypes from 'prop-types';
// import { Container } from './styles';
import DrawerHelper from '../templates/dashboard/drawer/drawerHelper';
import { updateDrawerItens } from '../store/modules/system/actions';

export default function FavoriteMenu(props) {
  const { idMenu, isFavorited } = props;
  const dispatch = useDispatch();
  const [favorited, setFavorited] = useState(isFavorited);
  const { drawerItens } = useSelector(state => state.system.drawer);

  const fovorite = value => {
    /* ação de  enviar para o banco o id do menu para ser favoritado */

    const data = JSON.parse(JSON.stringify(drawerItens));
    const updatedItens = DrawerHelper.updateFavorite(data, idMenu, value || 0);
    dispatch(updateDrawerItens(updatedItens));
    setFavorited(value);
  };

  return (
    <Rating
      className="rating"
      name={`rating-${idMenu}`}
      max={1}
      value={favorited}
      onChange={(event, newValue) => {
        fovorite(newValue);
      }}
    />
  );
}

FavoriteMenu.propTypes = {
  isFavorited: PropTypes.number,
  idMenu: PropTypes.number.isRequired,
};

FavoriteMenu.defaultProps = {
  isFavorited: 0,
};
