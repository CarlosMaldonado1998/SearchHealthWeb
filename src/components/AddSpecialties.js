import React from "react";
import specialties from "../services/specialties";
import { Grid, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useSpecialties from "../hooks/useSpecialties";

const schema = yup.object().shape({
  name: yup.string().required("Ingrese el nombre del Centro Médico"),
});

const AddSpecialties = () => {
  const [dataSpecialties] = useSpecialties();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await specialties.getAll().push(data.name);
  };

  return (
    <>
      <div>lista de especialidades </div>
      <div>Agregar especialidad</div>
      <Grid container>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <Grid item xs={8}>
            <TextField
              id="name"
              name="name"
              label="Nombre del centro médico"
              variant="outlined"
              required
              {...register("name")}
              color="secondary"
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
        </form>
        {dataSpecialties ? (
          dataSpecialties.map((data, key) => {
            return (
              <>
                <div>{data.name.name}</div>
              </>
            );
          })
        ) : (
          <div>No hay especialidades</div>
        )}
      </Grid>
    </>
  );
};

export default AddSpecialties;
