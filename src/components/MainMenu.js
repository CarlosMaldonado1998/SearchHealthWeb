import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Box,
  Button,
  Link as MuiLink,
  Toolbar,
} from "@material-ui/core";
import Link from "next/link";
import Routes from "../constants/routes";
import { useAuth } from "../lib/auth";
import { useRouter } from "next/router";
import LateralMenu from "./LateralMenu";

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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function MainMenu() {
  const classes = useStyles();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [openList, setOpenList] = useState(true);

  const handleLogout = async () => {
    await logout().then(router.push(Routes.LOGIN), setOpen(false));
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

          <Box>
            <Link href={Routes.HOME} passHref>
              <MuiLink>
                <img src="/captura.png" alt="Search health" width={260} />
              </MuiLink>
            </Link>
          </Box>

          

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
        <LateralMenu
          handleClick={handleClick}
          handleDrawerClose={handleDrawerClose}
          open={open}
          openList={openList}
        />
      ) : (
        <div />
      )}
    </>
  );
}

export default MainMenu;
