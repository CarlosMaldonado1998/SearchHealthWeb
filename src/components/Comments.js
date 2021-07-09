import Loading from "./Loading";
import { Avatar, Grid, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DeleteComment from "./DeleteComment";

const Comments = ({ comment, dataCenterID }) => {
  const [isDialogsVisibleDeleteCenter, setIsDialogsVisibleDeleteCenter] =
    useState(false);

  const handleClose = () => {
    setIsDialogsVisibleDeleteCenter(!isDialogsVisibleDeleteCenter);
  };

  return (
    <>
      {comment ? (
        <>
          <Grid container spacing={3} key={"comment - " + comment.id}>
            <Grid item xs={1}>
              <Avatar alt={comment.name} src={comment.photo} />
            </Grid>
            <Grid item xs={9}>
              <Typography>{comment.name}</Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Puntuación: {comment.score}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {comment.comment}
              </Typography>
            </Grid>
            <Grid item xs>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  handleClose();
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </>
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
