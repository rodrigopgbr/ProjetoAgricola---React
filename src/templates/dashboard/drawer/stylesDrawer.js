import styled from 'styled-components';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import ListItemIcon from '@material-ui/core/ListItemIcon';

export const ContainerItens = styled.div`
  display: flex;
  align-items: center;

  .rating {
    position: absolute;
    right: 10px;
  }
  @media (min-width: 600px) {
    width: 280px;
    flexshrink: 0;
  }
`;

export const Overflow = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`;

export const Item = styled(ListItem)`
  width: 100%;

  &.ItemOpen {
    color: #198d5e;
    border-left: 3px solid #198d5e;
    -webkit-text-decoration: none;
    text-decoration: none;
    border-radius: 5px;
    padding-left: 13px;
    box-shadow: 0 0 4px 0px #9e9e9e;
  }
  &.drawerClosed {
    padding-left: 21px;
  }

  &.drawerOpen.subItensL1,
  &.drawerOpen.subItensL2,
  &.drawerOpen.subItensL3,
  &.drawerOpen.subItensL4 {
    height: 40px;
    background-color: #28a74529;
  }

  &.drawerOpen.subItensL1 {
    padding-left: 15px;
    margin-left: 10px;
    &.ItemOpen {
      padding-left: 12px;
    }
  }
  &.drawerOpen.subItensL2 {
    padding-left: 9px;
    margin-left: 25px;
    &.ItemOpen {
      padding-left: 6px;
    }
  }
  &.drawerOpen.subItensL3 {
    padding-left: 3px;
    margin-left: 38px;
    &.ItemOpen {
      padding-left: 0px;
    }
  }
  &.drawerOpen.subItensL4 {
    padding-left: 0px;
    margin-left: 50px;
  }
`;

export const ListIcon = styled(ListItemIcon)`
  width: 100%;
`;

export const ItensText = styled(ListItemText)`
  width: 100%;
`;

export const Search = styled(Input)`
  width: 90%;
  padding-left: 5px;
  margin: 10px 12px 0px 12px;
  border: transparent;
  border: none !important;
  border-radius: 5px !important;
  background: #198d5e1f;
  color: #000;

  svg {
    color: #198d5e;
  }

  &::before,
  &::after {
    border-bottom: 0px !important;
  }
`;
