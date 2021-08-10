import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import theme from "../styles/theme";
import { useAuth } from "../lib/auth";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {
  Collapse,
  CssBaseline,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import Routes from "../constants/routes";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import FormatListBulletedRoundedIcon from "@material-ui/icons/FormatListBulletedRounded";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useSnackbar } from "notistack";

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
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
}));

function LateralMenu({ open, handleDrawerClose, handleClick, openList }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const HandleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (user.role !== "Administrador") {
      logout().then(
        router.push(Routes.HOME),
        enqueueSnackbar(
          "El Ingreso ha sido negado al no ser personal Administrativo.",
          {
            variant: "warning",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          }
        )
      );
    }
  }, [user]);

  return (
    <>
      <CssBaseline />
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
                selected={selectedIndex === 0}
                onClick={(event) => {
                  router.push(Routes.ADMIN).then((r) => console.log(r));
                  HandleListItemClick(event, 0);
                }}
              >
                <ListItemIcon>
                  <HomeRoundedIcon style={{ color: "#7bc2ca" }} />
                </ListItemIcon>
                <ListItemText primary={"Bienvenido"} />
              </ListItem>
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  {openList ? (
                    <ExpandLess style={{ color: "#7bc2ca" }} />
                  ) : (
                    <ExpandMore style={{ color: "#7bc2ca" }} />
                  )}
                </ListItemIcon>
                <ListItemText primary="Centros Médicos" />
              </ListItem>
              <Collapse in={openList} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    key={"Agregar"}
                    selected={selectedIndex === 1}
                    onClick={(event) => {
                      router.push(Routes.REGISTER_MEDICAL_CENTER);
                      HandleListItemClick(event, 1);
                    }}
                  >
                    <ListItemIcon>
                      <AddCircleOutlineRoundedIcon
                        style={{ color: "#7bc2ca" }}
                      />
                    </ListItemIcon>
                    <Grid>
                      <ListItemText primary={"Agregar"} />
                      <ListItemText primary={"Centro"} />
                    </Grid>
                  </ListItem>
                  <ListItem
                    button
                    key={"Lista"}
                    selected={selectedIndex === 2}
                    onClick={(event) => {
                      HandleListItemClick(event, 2);
                      router.push(Routes.VIEW_MEDICAL_CENTER);
                    }}
                  >
                    <ListItemIcon>
                      <FormatListBulletedRoundedIcon
                        style={{ color: "#7bc2ca" }}
                      />
                    </ListItemIcon>
                    <Grid>
                      <ListItemText primary={"Lista de"} />
                      <ListItemText primary={"Centros"} />
                    </Grid>
                  </ListItem>
                </List>
              </Collapse>
              <ListItem
                button
                key={"Usuarios"}
                selected={selectedIndex === 4}
                onClick={(event) => {
                  router.push(Routes.VIEW_USERS);
                  HandleListItemClick(event, 4);
                }}
              >
                <ListItemIcon>
                  <GroupRoundedIcon style={{ color: "#7bc2ca" }} />
                </ListItemIcon>
                <Grid>
                  <ListItemText primary={"Lista de"} />
                  <ListItemText primary={"Usuarios"} />
                </Grid>
              </ListItem>
            </>
          ) : (
            <></>
          )}
        </List>
      </Drawer>
    </>
  );
}

export default LateralMenu;
