import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import NotificationsSharpIcon from '@material-ui/icons/NotificationsSharp';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';

import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Content, ProfileButton, NotificationButton } from './stylesToolbar';
import { stateDrawer } from '../../../store/modules/system/actions';
import { logout } from '../../../store/modules/auth/actions';

const useStyles = makeStyles(theme => ({
  toolbar: { backgroundColor: '#198D5E' },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#198D5E',
  },
  appBarShift: {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
}));

export default function ToolbarComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const anchorPerfilRef = React.useRef(null);
  const anchorNotificationRef = React.useRef(null);
  const [openPerfil, setOpenPerfil] = React.useState(false);
  const [openNotification, setOpenNotification] = React.useState(false);
  const { drawerOpenned } = useSelector(state => state.system.drawer);
  const { user } = useSelector(state => state.user);

  const handleTogglePerfil = () => {
    setOpenPerfil(prevOpen => !prevOpen);
  };

  const handleToggleNotification = () => {
    setOpenNotification(prevOpen => !prevOpen);
  };

  const handleClosePerfil = event => {
    if (
      anchorPerfilRef.current &&
      anchorPerfilRef.current.contains(event.target)
    ) {
      return;
    }

    setOpenPerfil(false);
  };

  const handleCloseNotification = event => {
    if (
      anchorNotificationRef.current &&
      anchorNotificationRef.current.contains(event.target)
    ) {
      return;
    }

    setOpenNotification(false);
  };

  function handleListKeyDownPerfil(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenPerfil(false);
    }
  }

  function handleListKeyDownNotification(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenNotification(false);
    }
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: drawerOpenned,
      })}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          aria-label="Abrir menu de opções"
          onClick={() => dispatch(stateDrawer(!drawerOpenned))}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: drawerOpenned,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Content>
          <Typography variant="h6" noWrap />
          <NotificationButton>
            <Button
              ref={anchorNotificationRef}
              aria-controls={openNotification ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggleNotification}
            >
              <Badge badgeContent={1} color="error">
                <NotificationsSharpIcon />
              </Badge>
            </Button>
            <Popper
              open={openNotification}
              anchorEl={anchorNotificationRef.current}
              role={undefined}
              transition
              disablePortal
              style={{ minWidth: 220 }}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleCloseNotification}>
                      <MenuList
                        autoFocusItem={openNotification}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDownNotification}
                      >
                        <Typography variant="subtitle1" align="center">
                          Não há notificações
                        </Typography>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </NotificationButton>
          <Divider orientation="vertical" flexItem />
          <ProfileButton>
            <Button
              ref={anchorPerfilRef}
              aria-controls={openPerfil ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleTogglePerfil}
            >
              <AccountCircleSharpIcon />
              {user && user.nome}
            </Button>
            <Popper
              open={openPerfil}
              anchorEl={anchorPerfilRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClosePerfil}>
                      <MenuList
                        autoFocusItem={openPerfil}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDownPerfil}
                      >
                        <MenuItem onClick={handleClosePerfil}>Perfil</MenuItem>
                        <MenuItem onClick={handleClosePerfil}>
                          Configurações
                        </MenuItem>
                        <MenuItem onClick={() => handleLogout()}>Sair</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </ProfileButton>
        </Content>
      </Toolbar>
    </AppBar>
  );
}
