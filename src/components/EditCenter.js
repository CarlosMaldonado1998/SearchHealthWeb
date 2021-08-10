import React from "react";
import withAuth from "../hocs/withAuth";
import { Grid, Icon } from "@material-ui/core";
import FormMedicalCenter from "./FormMedicalCenter";
import medicalCenters from "../services/medicalCenters";
import savePhotos from "../services/savePhotos";
import { useSnackbar } from "notistack";

const EditCenter = (props) => {
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
  const handleAddMedicalCenter = async (id, data, file, choose) => {
    if (choose) {
      await medicalCenters
        .getCenterByID(id)
        .update({ ...data })
        .then(() => {
          handleAddImageMedicalCenter(id, file);
        });
    } else {
      await medicalCenters
        .getCenterByID(id)
        .update({ ...data })
        .then(() => {
          handleClick("Centro médico actualizado con éxito", "success");
        });
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
            await medicalCenters
              .getCenterByID(uid)
              .update({ photo: downloadURL })
              .then(() => {
                handleClick("Centro médico actualizado con éxito", "success");
                props.onCancel();
              });
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
