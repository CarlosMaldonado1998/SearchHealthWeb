import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import FormatListBulletedRoundedIcon from "@material-ui/icons/FormatListBulletedRounded";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import MessageRoundedIcon from "@material-ui/icons/MessageRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Link as MuiLink,
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItem,
  CssBaseline,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import Link from "next/link";
import Routes from "../constants/routes";
import { useAuth } from "../lib/auth";
import { useRouter } from "next/router";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    display: "none",
    padding: 8,
    maxHeight: 50,
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    "& a img": {
      maxHeight: 40,
    },
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(6) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function DrawerMenu() {
  const classes = useStyles();
  const theme = useTheme();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openList, setOpenList] = useState(true);

  const handleLogout = async () => {
    logout();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpenList(!openList);
  };

  return (
    <>
      <AppBar
        position="sticky"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {user ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <div />
          )}

          <Box className={classes.logo}>
            <Link href={Routes.HOME} passHref>
              <MuiLink>
                <img src="/logo.png" alt="Search health" width={110} />
              </MuiLink>
            </Link>
          </Box>

          <div className={classes.grow} />

          <div className={classes.grow} />
          {user ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleLogout()}
            >
              Cerrar sesión
            </Button>
          ) : (
            <Link href={Routes.LOGIN} passHref>
              <Button>Iniciar Sesión</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>

      {user ? (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <List>
            {user.role === "Administrador" ? (
              <>
                <ListItem
                  button
                  key={"Bienvenido"}
                  onClick={() => router.push(Routes.ADMIN)}
                >
                  <ListItemIcon>
                    <HomeRoundedIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={"Bienvenido"} />
                </ListItem>
                <ListItem button onClick={handleClick}>
                  <ListItemIcon>
                    {openList ? (
                      <ExpandLess color="primary" />
                    ) : (
                      <ExpandMore color="primary" />
                    )}
                  </ListItemIcon>
                  <ListItemText primary="Centros Médicos" />
                </ListItem>
                <Collapse in={openList} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem
                      button
                      key={"Agregar"}
                      onClick={() =>
                        router.push(Routes.REGISTER_MEDICAL_CENTER)
                      }
                    >
                      <ListItemIcon>
                        <AddCircleOutlineRoundedIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={"Agregar"} />
                    </ListItem>
                    <ListItem
                      button
                      key={"Lista"}
                      onClick={() => router.push(Routes.VIEW_MEDICAL_CENTER)}
                    >
                      <ListItemIcon>
                        <FormatListBulletedRoundedIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={"Visualizar"} />
                    </ListItem>
                    <ListItem
                      button
                      key={"Comentarios"}
                      onClick={() =>
                        router.push(Routes.VIEW_COMMENTS_MEDICAL_CENTER)
                      }
                    >
                      <ListItemIcon>
                        <MessageRoundedIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={"Comentarios"} />
                    </ListItem>
                  </List>
                </Collapse>
                <ListItem
                  button
                  key={"Usuarios"}
                  onClick={() => router.push(Routes.VIEW_USERS)}
                >
                  <ListItemIcon>
                    <GroupRoundedIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={"Usuarios"} />
                </ListItem>
              </>
            ) : (
              <ListItem
                button
                key={"Bienvenido"}
                onClick={() => router.push(Routes.HOME)}
              >
                <ListItemIcon>
                  <HomeRoundedIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={"Bienvenido"} />
              </ListItem>
            )}
          </List>
        </Drawer>
      ) : (
        <div />
      )}
    </>
  );
}

export default DrawerMenu;
