import { useAuth } from "../lib/auth";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {
  Collapse,
  CssBaseline,
  Drawer,
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
import MessageRoundedIcon from "@material-ui/icons/MessageRounded";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import React, { useState } from "react";
import { useRouter } from "next/router";
import theme from "../styles/theme";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

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
  const { user } = useAuth();
  const router = useRouter();
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const HandleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

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
                  router.push(Routes.ADMIN);
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
                    <ListItemText primary={"Agregar"} />
                  </ListItem>
                  <ListItem
                    button
                    key={"Lista"}
                    selected={selectedIndex === 2}
                    onClick={(event) => {
                      router.push(Routes.VIEW_MEDICAL_CENTER);
                      HandleListItemClick(event, 2);
                    }}
                  >
                    <ListItemIcon>
                      <FormatListBulletedRoundedIcon
                        style={{ color: "#7bc2ca" }}
                      />
                    </ListItemIcon>
                    <ListItemText primary={"Visualizar"} />
                  </ListItem>
                  <ListItem
                    button
                    key={"Comentarios"}
                    selected={selectedIndex === 3}
                    onClick={(event) => {
                      router.push(Routes.VIEW_COMMENTS_MEDICAL_CENTER);
                      HandleListItemClick(event, 3);
                    }}
                  >
                    <ListItemIcon>
                      <MessageRoundedIcon style={{ color: "#7bc2ca" }} />
                    </ListItemIcon>
                    <ListItemText primary={"Comentarios"} />
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
                <ListItemText primary={"Usuarios"} />
              </ListItem>
            </>
          ) : (
            <ListItem
              button
              key={"Bienvenido"}
              selected={selectedIndex === 0}
              onClick={(event) => {
                router.push(Routes.HOME);
                HandleListItemClick(event, 0);
              }}
            >
              <ListItemIcon>
                <HomeRoundedIcon style={{ color: "#7bc2ca" }} />
              </ListItemIcon>
              <ListItemText primary={"Bienvenido"} />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
}

export default LateralMenu;
