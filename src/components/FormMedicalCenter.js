import {
  FormControl,
  Grid,
  TextField,
  InputBase,
  RadioGroup,
  Box,
  FormControlLabel,
  Radio,
  Button,
  Typography,
  FormLabel,
  FormHelperText,
  Input,
  FormGroup,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  ListItemText,
  Chip,
} from "@material-ui/core";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";
const moment = require("moment");

import { useEffect, useState } from "react";
import specialties from "../services/specialties";
import IconButton from "@material-ui/core/IconButton";
import { PhotoCamera } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    backgroundColor: theme.palette.secondary.main,
  },
  button: {
    margin: theme.spacing(3, 2, 2),
    backgroundColor: theme.palette.cancel.main,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: theme.palette.background.main,
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: theme.palette.secondary.main,
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "flex",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
}));
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const latitudeOrLongitude = /[+-](\-?\d+(\.\d+))/;
const schema = yup.object().shape({
  name: yup.string().required("Ingrese el nombre del Centro Médico"),
  telephone: yup
    .string()
    .required("Ingrese el número de teléfono")
    .matches(phoneRegExp, "Ingrese solo valores numéricos."),
  mobile: yup
    .string()
    .required("Ingrese el número de teléfono celular")
    .matches(phoneRegExp, "Ingrese solo valores numpericos."),
  start_time: yup
    .string()
    .required("Seleccione la hora de inicio")
    .test("is-greater", "Debe ser anterior a la hora de Fin", function (value) {
      const { end_time } = this.parent;
      return moment(value, "HH:mm").isSameOrBefore(moment(end_time, "HH:mm"));
    }),
  end_time: yup
    .string()
    .required("Seleccione la hora de fin")
    .test(
      "is-greater",
      "Debe ser posterior a la hora de Inicio",
      function (value) {
        const { start_time } = this.parent;
        return moment(value, "HH:mm").isSameOrAfter(
          moment(start_time, "HH:mm")
        );
      }
    ),
  email: yup
    .string()
    .email("Ingresa un correo válido")
    .required("Ingresa tu correo electrónico"),
  website: yup.string().url("Ingrese una dirección URL válida."),
  facebook: yup.string().url("Ingrese una dirección URL válida."),
  instagram: yup.string().url("Ingrese una dirección URL válida."),
  address: yup.string().required("Ingrese la dirección del centro médico"),
  latitude: yup
    .string()
    .required("Ingrese la posición de latitud.")
    .matches(latitudeOrLongitude, "Ingrese valor numérico. Ej: (±)1.5"),
  longitude: yup
    .string()
    .required("Ingrese la posición de longitud.")
    .matches(latitudeOrLongitude, "Ingrese valor numérico. Ej: (±)1.5"),
});

function StyledRadio(props) {
  const classes = useStyles();
  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

const ITEM_HEIGHT = 60;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
};

const FormMedicalCenter = (props) => {
  const classes = useStyles();
  const [dataSpecialties, setDataSpecialties] = useState([]);
  const { register, handleSubmit, control, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [state, setState] = useState({
    Lunes: true,
    Martes: false,
    Miércoles: false,
    Jueves: false,
    Viernes: false,
    Sábado: false,
    Domingo: false,
  });
  const { Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo } = state;
  const errorCheck =
    [Lunes, Martes, Miércoles, Jueves, Viernes, Sábado, Domingo].filter(
      (v) => v
    ).length < 1;
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [updateFile, setUpdateFile] = useState(null);
  const [checkValues, setCheckValues] = useState(false);
  const handleAddFile = (e) => {
    console.log("archivo", e);
    if (e !== undefined) {
      if (e.type.includes("image/")) {
        console.log("hay archivo");
        setUpdateFile(e);
      } else {
        setUpdateFile(null);
      }
    } else {
      setUpdateFile(null);
    }
  };

  const onSubmit = (data) => {
    let day = "";
    for (let $i in state) {
      if (state[$i] === true) {
        day += $i + ",";
      }
    }
    const medicalCenterInfo = [];
    medicalCenterInfo.push({
      email: data.email,
      contacts: {
        telephone: data.telephone,
        mobile: data.mobile,
      },
      specialties: { ...selectedSpecialties },
      days: day,
      end_time: data.end_time,
      location: {
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
      },
      name: data.name,
      sector: data.sector,
      social_media: {
        website: data.website,
        facebook: data.facebook,
        instagram: data.instagram,
      },
      start_time: data.start_time,
      type: data.type,
    });
    if (selectedSpecialties.length > 0 && updateFile !== null && day !== "") {
      props.onHandleSubmitAction(...medicalCenterInfo, updateFile);
      setCheckValues(false);
    } else {
      setCheckValues(true);
    }
  };

  useEffect(() => {
    const getDataSpecialties = async () => {
      await specialties
        .getAll()
        .once("value")
        .then((snapshot) => {
          const dataList = [];
          snapshot.forEach((data) => {
            dataList.push({ id: data.key, name: data.val() });
          });
          setDataSpecialties(dataList);
        });
    };
    getDataSpecialties();
  }, []);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChangeSelect = (event) => {
    setSelectedSpecialties(event.target.value);
  };

  return (
    <>
      <Grid container>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid item xs={8}>
            <TextField
              id="name"
              name="name"
              label="Nombre del centro médico"
              variant="outlined"
              required
              inputRef={register}
              color="secondary"
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={8}>
            <h4>Tipo:</h4>
            <FormControl component="fieldset">
              <RadioGroup
                defaultValue={"Hospital"}
                aria-label="gender"
                name="type"
              >
                <Box display="flex" justifyContent="center" m={1} p={1}>
                  <FormControlLabel
                    value="Hospital"
                    control={<StyledRadio />}
                    label="Hospital"
                    inputRef={register}
                  />
                  <FormControlLabel
                    value="Clínica"
                    control={<StyledRadio />}
                    label="Clínica"
                    inputRef={register}
                  />
                  <FormControlLabel
                    value="Centro de Salud"
                    control={<StyledRadio />}
                    label="Centro de Salud"
                    inputRef={register}
                  />
                </Box>
              </RadioGroup>
            </FormControl>
          </Grid>
          <h4>Horario de Atención:</h4>
          <Grid item xs={8}>
            <FormControl required error={errorCheck} component="fieldset">
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
              >
                <Grid item xs>
                  <TextField
                    id="start_time"
                    name="start_time"
                    label="Hora de inicio"
                    type="time"
                    defaultValue="07:00"
                    required
                    inputRef={register}
                    color="secondary"
                    margin="normal"
                    error={!!errors.start_time}
                    helperText={errors.start_time?.message}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="emd_time"
                    name="end_time"
                    label="Hora de fin"
                    type="time"
                    defaultValue="16:00"
                    required
                    inputRef={register}
                    color="secondary"
                    margin="normal"
                    error={!!errors.end_time}
                    helperText={errors.end_time?.message}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                </Grid>
              </Grid>
              <Grid>
                <FormLabel component="legend">
                  Escoja los días a asignar
                </FormLabel>
                <FormGroup>
                  <Box flexDirection="row-reverse" m={1} p={1}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Lunes}
                          onChange={handleChange}
                          name="Lunes"
                        />
                      }
                      label="Lunes"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Martes}
                          onChange={handleChange}
                          name="Martes"
                        />
                      }
                      label="Martes"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Miércoles}
                          onChange={handleChange}
                          name="Miércoles"
                        />
                      }
                      label="Miércoles"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Jueves}
                          onChange={handleChange}
                          name="Jueves"
                        />
                      }
                      label="Jueves"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Viernes}
                          onChange={handleChange}
                          name="Viernes"
                        />
                      }
                      label="Viernes"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Sábado}
                          onChange={handleChange}
                          name="Sábado"
                        />
                      }
                      label="Sábado"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={Domingo}
                          onChange={handleChange}
                          name="Domingo"
                        />
                      }
                      label="Domingo"
                    />
                  </Box>
                </FormGroup>
              </Grid>
            </FormControl>
          </Grid>
          <h4>Sector:</h4>
          <Grid item xs={8}>
            <FormControl component="fieldset">
              <RadioGroup
                defaultValue={"Norte"}
                aria-label="gender"
                name="sector"
              >
                <Box display="flex" justifyContent="center" m={1} p={1}>
                  <FormControlLabel
                    value="Norte"
                    control={<StyledRadio />}
                    label="Norte"
                    inputRef={register}
                  />
                  <FormControlLabel
                    value="Centro"
                    control={<StyledRadio />}
                    label="Centro"
                    inputRef={register}
                  />
                  <FormControlLabel
                    value="Sur"
                    control={<StyledRadio />}
                    label="Sur"
                    inputRef={register}
                  />
                </Box>
              </RadioGroup>
            </FormControl>
          </Grid>
          <h4>Información de contacto: </h4>
          <Grid item xs={6}>
            <TextField
              id="telephone"
              name="telephone"
              label="Número de teléfono"
              variant="outlined"
              required
              inputRef={register}
              color="secondary"
              margin="normal"
              error={!!errors.telephone}
              helperText={errors.telephone?.message}
              inputProps={{}}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="mobile"
              name="mobile"
              label="Número de teléfono celular"
              variant="outlined"
              inputRef={register}
              color="secondary"
              margin="normal"
              error={!!errors.mobile}
              helperText={errors.mobile?.message}
            />
          </Grid>
          <h4>Datos de Ubicación: </h4>
          <Grid>
            <div style={{ paddingLeft: 20 }}>
              <Grid item xs={6}>
                <TextField
                  id="address"
                  name="address"
                  label="Dirección"
                  variant="outlined"
                  required
                  inputRef={register}
                  color="secondary"
                  margin="normal"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="latitude"
                  name="latitude"
                  label="Latitud"
                  variant="outlined"
                  required
                  inputRef={register}
                  color="secondary"
                  margin="normal"
                  error={!!errors.latitude}
                  helperText={errors.latitude?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="longitude"
                  name="longitude"
                  label="Longitud"
                  variant="outlined"
                  required
                  inputRef={register}
                  color="secondary"
                  margin="normal"
                  error={!!errors.longitude}
                  helperText={errors.longitude?.message}
                />
              </Grid>
            </div>
          </Grid>

          <h4>Información en Internet: </h4>
          <div style={{ paddingLeft: 20 }}>
            <Grid item xs={6}>
              <TextField
                id="email"
                name="email"
                label="Correo electrónico"
                variant="outlined"
                required
                inputRef={register}
                color="secondary"
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="website"
                name="website"
                label="Sitio web (Opcional)"
                variant="outlined"
                inputRef={register}
                color="secondary"
                margin="normal"
                error={!!errors.website}
                helperText={errors.website?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="facebook"
                name="facebook"
                label="Facebook (Opcional)"
                variant="outlined"
                inputRef={register}
                color="secondary"
                margin="normal"
                error={!!errors.facebook}
                helperText={errors.facebook?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="instagram"
                name="instagram"
                label="Instagram (Opcional)"
                variant="outlined"
                inputRef={register}
                color="secondary"
                margin="normal"
                error={!!errors.instagram}
                helperText={errors.instagram?.message}
              />
            </Grid>
          </div>

          <h4>Subir una imágen del centro médico</h4>
          <input
            type="file"
            name="files"
            accept="image/*"
            onChange={(e) => {
              handleAddFile(e.target.files[0]);
            }}
          />

          {dataSpecialties ? (
            <>
              <h4>Seleccione las especialidades: </h4>
              <Grid item xs={12}>
                <FormControl>
                  <Select
                    id="demo-mutiple-chip"
                    multiple
                    variant="outlined"
                    name="specialties"
                    label={"Eliga las especialidades"}
                    value={selectedSpecialties}
                    onChange={handleChangeSelect}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                      <Grid container spacing={1}>
                        {selected.map((value) => (
                          <Grid key={value} item xs={4}>
                            <Chip color="secondary" label={value} />
                          </Grid>
                        ))}
                      </Grid>
                    )}
                    MenuProps={MenuProps}
                  >
                    {dataSpecialties.map((value, key) => (
                      <MenuItem key={value.name + key} value={value.name}>
                        {value.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </>
          ) : (
            <div />
          )}

          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            {checkValues ? (
              <Typography>
                Ingrese todos los datos requeridos, incluido especialidades y la
                imágen(con formato de imágen).
              </Typography>
            ) : (
              <div />
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Añadir Centro Médico
            </Button>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default FormMedicalCenter;
