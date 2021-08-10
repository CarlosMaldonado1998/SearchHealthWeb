import Loading from "./Loading";
import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import BusinessIcon from "@material-ui/icons/Business";
import React, { useState } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import ViewCenter from "./ViewCenter";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ListCenters = ({ dataCenters }) => {
  const classes = useStyles();

  const [isDialogsVisibleEditCenter, setIsDialogsVisibleEditCenter] =
    useState(false);
  const [center, setCenter] = useState(null);

  const handleClickOpenCenter = (id) => {
    setCenter(id);
    setIsDialogsVisibleEditCenter(true);
  };
  const handleClickCloseCenter = () => {
    setIsDialogsVisibleEditCenter(false);
  };

  return (
    <>
      {dataCenters ? (
        <Grid>
          {dataCenters.map((center) => {
            return (
              <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem
                    button
                    onClick={() => {
                      handleClickOpenCenter(center);
                    }}
                  >
                    <ListItemIcon>
                      <BusinessIcon />
                    </ListItemIcon>
                    <ListItemText primary={center.name} />
                  </ListItem>
                </List>
                <Divider />
              </div>
            );
          })}
        </Grid>
      ) : (
        <Loading />
      )}
      <Dialog
        open={isDialogsVisibleEditCenter}
        onClose={handleClickCloseCenter}
        aria-labelledby="form-dialog-title"
        disableBackdropClick={true}
      >
        <DialogContent>
          <ViewCenter dataCenter={center} onCancel={handleClickCloseCenter} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ListCenters;
