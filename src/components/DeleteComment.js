import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import * as FIREBASE from "../lib/firebase";
import { Box, Button, Grid } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    backgroundColor: theme.palette.secondary,
  },
  button: {
    margin: theme.spacing(3, 2, 2),
    backgroundColor: theme.palette.cancel,
  },
}));
const DeleteComment = (props) => {
  const classes = useStyles();
  const { handleSubmit } = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (message, variant) => {
    enqueueSnackbar(message, {
      variant: variant,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
  };

  const onSubmit = async () => {
    console.log(props);
    try {
      const response = await FIREBASE.db
        .ref(
          `medicalCenters/${props.dataCenterID}/comments/${props.comment.key}`
        )
        .remove();
      handleClick("Se ha eliminado el comentario con éxito", "success");
      props.onCancel();
      return response;
    } catch (error) {
      if (error.response) {
        handleClick("No se pudo eliminar el comentario", "error");
        console.log(error.response.data);
        return Promise.reject(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="center" m={1} p={1}>
        <h3>¿Está seguro que desea eliminar este comentario?</h3>
      </Box>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-end"
        >
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Aceptar
          </Button>
          <Button
            onClick={props.onCancel}
            variant="contained"
            className={classes.button}
          >
            Cancelar
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default DeleteComment;
