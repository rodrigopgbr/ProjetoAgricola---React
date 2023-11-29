import React, { useRef, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import TreeMenu from 'react-simple-tree-menu';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Zoom from '@material-ui/core/Zoom';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import IconSearch from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import Logo from '../../../assets/img/AgrosystemLogo.jpeg';
import {
  ContainerItens,
  Item,
  ItensText,
  Search,
  Overflow,
} from './stylesDrawer';
import Favorite from '../../../components/favorite';
import Helper from '../../../helpers/_index';
import { stateDrawer } from '../../../store/modules/system/actions';
import { getItecon } from '../../../config/icons';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 280,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    zIndex: 10000,
  },
  drawerOpen: {
    width: 280,
    overflow: 'initial',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

    overflowX: 'hidden',
    width: 0,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  iconMenu: {
    color: '#198D5E',
  },
  logoNone: {
    display: 'none',
  },
}));

export default function DrawerComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const treeMenuRef = useRef();
  const { drawerOpenned, drawerItens } = useSelector(
    state => state.system.drawer
  );

  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  function handleResize() {
    if (getWindowDimensions().width <= 600) {
      dispatch(stateDrawer(false));
    }
  }

  useEffect(() => {
    if (hasWindow) {
      handleResize();
    }
  }, []);

  useEffect(() => {
    if (!drawerOpenned) {
      treeMenuRef.current.search('..onlyFavorites..');
    } else {
      treeMenuRef.current.search('');
    }
  }, [drawerOpenned]);

  const handleClick = (toggleNode, hasNodes, e, path) => {
    if (hasNodes && toggleNode) {
      toggleNode();
    }
    e.stopPropagation();
    if (!hasNodes) {
      Helper.openPage(path);
    }
  };

  const iconMenu = (hasNodes, p) => {
    return hasNodes && (p.isOpen ? <ExpandLess /> : <ExpandMore />);
  };

  const mountIconFavorite = (hasNodes, path, id, isFavorite) => {
    return (
      drawerOpenned &&
      !hasNodes &&
      path && <Favorite idMenu={id} isFavorited={isFavorite} />
    );
  };

  const returnIcon = (eIcon, eIconFavorite, hasNodes) => {
    if (drawerOpenned) {
      if (eIcon) {
        return getItecon(eIcon);
      }
      if (hasNodes) {
        return getItecon();
      }
    }
    if (!drawerOpenned) {
      if (eIconFavorite) {
        return getItecon(eIconFavorite);
      }
      return getItecon();
    }
  };

  const classlevelIsOpen = p => {
    return p.isOpen ? 'ItemOpen' : 'ItemClosed';
  };

  const levelMenu = level => {
    switch (level) {
      case 1:
        return 'subItensL1';

      case 2:
        return 'subItensL2';

      case 3:
        return 'subItensL3';

      case 4:
        return 'subItensL4';

      default:
        return '';
    }
  };

  const searchHoverride = p => {
    // caso drawer estiver aberto( faz a pesquisa pelo input)
    if (drawerOpenned) {
      return (
        !!p.label.toLowerCase().includes(p.searchTerm.toLowerCase()) && p.path
      );
    }
    // caso drawer estiver fechado retorna apenas os favoritos
    return p.isFavorite;
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: drawerOpenned,
        [classes.drawerClose]: !drawerOpenned,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: drawerOpenned,
          [classes.drawerClose]: !drawerOpenned,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <img
          src={Logo}
          width={60}
          className={!drawerOpenned ? classes.logoNone : ''}
          alt="AgroSystem"
        />
        <IconButton onClick={() => dispatch(stateDrawer(!drawerOpenned))}>
          <MenuIcon className={classes.iconMenu} />
        </IconButton>
      </div>
      <Divider />

      <Overflow>
        <TreeMenu
          ref={treeMenuRef}
          data={drawerItens}
          initialActiveKey="Dashboard"
          debounceTime={250}
          matchSearch={p => searchHoverride(p)}
        >
          {({ search, items }) => (
            <>
              {drawerOpenned && (
                <Search
                  name="search-drawer"
                  id="search-drawer"
                  label="Outlined"
                  variant="outlined"
                  type="text"
                  onChange={e => search(e.target.value)}
                  autoComplete="off"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconSearch />
                    </InputAdornment>
                  }
                />
              )}
              <List>
                {items.map(
                  ({
                    id,
                    key,
                    label,
                    hasNodes,
                    level,
                    path,
                    toggleNode,
                    showDrawer,
                    icon,
                    iconFavorite,
                    isFavorite,
                    breadcrumb,
                    ...props
                  }) =>
                    showDrawer !== false && (
                      <ContainerItens key={key}>
                        <Item
                          button
                          className={`${levelMenu(level)}  ${classlevelIsOpen(
                            props
                          )} ${drawerOpenned ? 'drawerOpen' : 'drawerClosed'}`}
                          key={key}
                          onClick={e => {
                            handleClick(
                              toggleNode,
                              hasNodes,
                              e,
                              path,
                              showDrawer
                            );
                          }}
                        >
                          <Tooltip
                            title={(!drawerOpenned && breadcrumb) || ''}
                            TransitionComponent={Zoom}
                          >
                            <ListItemIcon>
                              {returnIcon(icon, iconFavorite, hasNodes)}
                            </ListItemIcon>
                          </Tooltip>
                          <ItensText primary={label} />
                          {iconMenu(hasNodes, props)}
                        </Item>

                        {mountIconFavorite(hasNodes, path, id, isFavorite)}
                      </ContainerItens>
                    )
                )}
              </List>
            </>
          )}
        </TreeMenu>
      </Overflow>
    </Drawer>
  );
}

DrawerComponent.propTypes = {};

DrawerComponent.defaultProps = {};
