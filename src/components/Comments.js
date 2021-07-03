import Loading from "./Loading";
import {
  Avatar,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DeleteComment from "./DeleteComment";

const Comments = ({ comment, dataCenterID }) => {
  console.log("comment", comment);
  console.log("key", dataCenterID);
  const [isDialogsVisibleDeleteCenter, setIsDialogsVisibleDeleteCenter] =
    useState(false);

  const handleClose = () => {
    setIsDialogsVisibleDeleteCenter(!isDialogsVisibleDeleteCenter);
  };
  return (
    <>
      {comment ? (
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={comment.name} src={comment.photo} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Grid>
                <Typography>{comment.name}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Puntuación: {comment.score}
                </Typography>
              </Grid>
            }
            secondary={
              <Typography variant="body2" color="textSecondary" component="p">
                {comment.comment}
              </Typography>
            }
          />
          <Divider variant="inset" component="li" />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => {
                handleClose();
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ) : (
        <Loading />
      )}

      <Dialog
        open={isDialogsVisibleDeleteCenter}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick={true}
      >
        <DialogContent>
          <DeleteComment
            dataCenterID={dataCenterID}
            comment={comment}
            onCancel={handleClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Comments;
