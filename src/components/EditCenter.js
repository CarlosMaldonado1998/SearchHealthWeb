import React from "react";
import withAuth from "../hocs/withAuth";
import { Grid, Icon } from "@material-ui/core";
import FormMedicalCenter from "./FormMedicalCenter";
import medicalCenters from "../services/medicalCenters";
import savePhotos from "../services/savePhotos";
import { useSnackbar } from "notistack";

const EditCenter = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const handleAddMedicalCenter = async (key, data, file, choose) => {
    if (choose) {
      console.log("deberia cambiar", file);
      await medicalCenters
        .addInfoCenter(key)
        .update({ ...data })
        .then(handleAddImageMedicalCenter(key, file));
    } else {
      await medicalCenters
        .addInfoCenter(key)
        .update({ ...data })
        .then(
          enqueueSnackbar("Centro médico actualizado con éxito. 2", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          })
        );
      props.onCancel();
    }
  };

  const handleAddImageMedicalCenter = async (uid, file) => {
    const uploadTask = savePhotos.savePhotoCenter(uid, file).put(file);
    await uploadTask.on(
      "state_changed",
      function (snapshot) {},
      function (error) {
        console.log(error);
      },
      function () {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(async function (downloadURL) {
            console.log("File available at", downloadURL);
            await medicalCenters
              .addInfoCenter(uid)
              .update({ photo: downloadURL })
              .then(
                enqueueSnackbar("Centro médico actualizado con éxito", {
                  variant: "success",
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                }),
                props.onCancel()
              );
          });
      }
    );
  };
  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <div />
        <h2>Detalle y edición del centro</h2>
        <Icon color="secondary" onClick={props.onCancel}>
          cancel
        </Icon>
      </Grid>
      <FormMedicalCenter
        data={props.data}
        onHandleSubmitAction={handleAddMedicalCenter}
        onCancel={props.onCancel}
      />
    </>
  );
};

export default withAuth(EditCenter);
