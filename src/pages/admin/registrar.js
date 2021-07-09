import Head from "next/head";
import { Grid } from "@material-ui/core";
import withAuth from "../../hocs/withAuth";
import FormMedicalCenter from "../../components/FormMedicalCenter";
import medicalCenters from "../../services/medicalCenters";
import { useSnackbar } from "notistack";
import Routes from "../../constants/routes";
import { useRouter } from "next/router";
import savePhotos from "../../services/savePhotos";
function Register() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const handleAddMedicalCenter = async (data, file) => {
    const saveCenter = medicalCenters.saveCenter().add({
      ...data,
    });
    await saveCenter.then((snapshot) => {
      handleAddImageMedicalCenter(snapshot.id, file);
    });
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
              .updatePhotoCenter(uid, { photo: downloadURL })
              .then(
                enqueueSnackbar("Centro médico registrado con éxito", {
                  variant: "success",
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "center",
                  },
                }),
                router.push(Routes.VIEW_MEDICAL_CENTER)
              );
          });
      }
    );
  };

  return (
    <>
      <Head>
        <title>Registrar</title>
      </Head>

      <Grid container>
        <Grid container direction="row" justify="center" alignItems="center">
          <h2>Agregar Centro Médico</h2>
        </Grid>
        <FormMedicalCenter
          data={null}
          onHandleSubmitAction={handleAddMedicalCenter}
        />
      </Grid>
    </>
  );
}
export default withAuth(Register);
