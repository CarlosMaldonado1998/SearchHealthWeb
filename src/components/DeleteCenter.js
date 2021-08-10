import React from "react";
import withAuth from "../hocs/withAuth";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

import medicalCenters from "../services/medicalCenters";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    backgroundColor: theme.palette.secondary.main,
  },
  button: {
    margin: theme.spacing(3, 2, 2),
    backgroundColor: theme.palette.cancel.main,
  },
}));

const DeleteCenter = (props) => {
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
    try {
      const response = await medicalCenters.deleteCenter(props.data.key);
      handleClick("Se ha eliminado el centro con éxito", "success");
      props.onCancel();
      return response;
    } catch (error) {
      if (error.response) {
        handleClick("No se pudo eliminar el centro", "error");
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
        <h3>¿Está seguro que desea eliminar este centro?</h3>
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
          <Button type="submit" variant="contained" className={classes.submit}>
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

export default withAuth(DeleteCenter);
