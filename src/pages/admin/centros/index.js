import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import withAuth from "../../../hocs/withAuth";
import EditCenter from "../../../components/EditCenter";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Box,
  IconButton,
  InputBase,
  Divider,
  Button,
  Grid,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import SearchIcon from "@material-ui/icons/Search";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DeleteCenter from "../../../components/DeleteCenter";
import { useRouter } from "next/router";
import Routes from "../../../constants/routes";
import useMedicalCenters from "../../../hooks/useMedicalCenters";
import Head from "next/head";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  margin: {
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  root3: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function Centers() {
  const router = useRouter();
  const classes = useStyles();
  const [dataCenters] = useMedicalCenters();
  const [dataSearchCenters, setDataSearchCenters] = useState([]);
  const [wordSearch, setWordSearch] = useState("");
  const [centerInfo, setCenterInfo] = useState(null);
  const [isDialogsVisibleEditCenter, setIsDialogsVisibleEditCenter] =
    useState(false);
  const [isDialogsVisibleDeleteCenter, setIsDialogsVisibleDeleteCenter] =
    useState(false);
  const handleClickDeleteSearchCenter = () => {
    setWordSearch("");
  };
  const handleChange = (event) => {
    setWordSearch(event.target.value);
  };
  const { register } = useForm();
  const handleClickOpenEditCenter = (id) => {
    setIsDialogsVisibleEditCenter(true);
    setIsDialogsVisibleDeleteCenter(false);
    setCenterInfo(id);
  };
  const handleClickOpenDeleteCenter = (id) => {
    setIsDialogsVisibleEditCenter(false);
    setIsDialogsVisibleDeleteCenter(true);
    setCenterInfo(id);
  };
  const handleClose = () => {
    setIsDialogsVisibleEditCenter(false);
    setIsDialogsVisibleDeleteCenter(false);
  };

  useEffect(() => {
    if (dataCenters) {
      const listCenterData = [];
      dataCenters.map((center) => {
        center.name.toUpperCase().includes(wordSearch.toUpperCase())
          ? listCenterData.push(center)
          : "";
      });
      setDataSearchCenters(listCenterData);
    }
  }, [wordSearch]);

  return (
    <>
      <Head>
        <title>Centros</title>
      </Head>

      <Grid container direction="row" justify="center" alignItems="center">
        <h2>Gesti??n de centros</h2>
      </Grid>
      <Box display="flex" justifyContent="flex-end" m={1} p={1}>
        <Button
          variant="outlined"
          size="large"
          className={classes.margin}
          color="primary"
          endIcon={<PostAddIcon />}
          onClick={() => router.push(Routes.REGISTER_MEDICAL_CENTER)}
        >
          Agregar Centro
        </Button>
      </Box>
      <Box display="flex" justifyContent="flex" m={1} p={1}>
        <form noValidate autoComplete="off">
          <Paper className={classes.root3}>
            <InputBase
              id="wordToSearch"
              name="wordToSearch"
              value={wordSearch}
              className={classes.input}
              placeholder="Ingrese el nombre del centro"
              {...register("wordToSearch")}
              onChange={handleChange}
            />
            <IconButton
              onClick={handleClickDeleteSearchCenter}
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
          </Paper>
        </form>
      </Box>
      {wordSearch !== "" ? (
        <div>
          {dataSearchCenters ? (
            <div>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">Nombre</StyledTableCell>
                      <StyledTableCell align="center">Sector</StyledTableCell>
                      <StyledTableCell align="center">Tipo</StyledTableCell>
                      <StyledTableCell align="center">Opci??n</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataSearchCenters.map((center) => (
                      <StyledTableRow key={center.key + "filter"}>
                        <StyledTableCell align="left">
                          <Link href={`/admin/centros/comments/${center.key}`}>
                            {center.name}
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {center.sector}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {center.type}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => handleClickOpenEditCenter(center)}
                          >
                            <BorderColorIcon />
                          </IconButton>
                          <IconButton
                            aria-label="upload picture"
                            component="span"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      ) : (
        <div>
          {dataCenters ? (
            <div>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell align="left">Nombre</StyledTableCell>
                      <StyledTableCell align="center">Sector</StyledTableCell>
                      <StyledTableCell align="center">Tipo</StyledTableCell>
                      <StyledTableCell align="center">Opci??n</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataCenters.map((center) => (
                      <StyledTableRow key={center.key}>
                        <StyledTableCell align="left">
                          <Link href={`/admin/centros/comments/${center.key}`}>
                            {center.name}
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {center.sector}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {center.type}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => handleClickOpenEditCenter(center)}
                          >
                            <BorderColorIcon />
                          </IconButton>

                          <IconButton
                            aria-label="upload picture"
                            component="span"
                            onClick={() => handleClickOpenDeleteCenter(center)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      )}
      <Dialog
        open={isDialogsVisibleEditCenter}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick={true}
        maxWidth={"sm"}
      >
        <DialogContent>
          <EditCenter data={centerInfo} onCancel={handleClose} />
        </DialogContent>
      </Dialog>
      <Dialog
        open={isDialogsVisibleDeleteCenter}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        disableBackdropClick={true}
      >
        <DialogContent>
          <DeleteCenter data={centerInfo} onCancel={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default withAuth(Centers);
