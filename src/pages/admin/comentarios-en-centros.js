import withAuth from "../../hocs/withAuth";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import users from "../../services/users";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import TableUsers from "../../components/TableUsers";
import Loading from "../../components/Loading";
import medicalCenters from "../../services/medicalCenters";
import { makeStyles } from "@material-ui/core/styles";
import ListCenters from "../../components/ListCenters";

const useStyles = makeStyles((theme) => ({
  root: {
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

function Comments() {
  const classes = useStyles();
  const [dataCenters, setDataCenters] = useState([]);
  const [dataSearchCenters, setDataSearchCenters] = useState([]);
  const [wordSearch, setWordSearch] = useState("");
  const { register } = useForm();

  useEffect(() => {
    const getDataListUsers = async () => {
      await medicalCenters.getAll().on("value", (snapshot) => {
        const listUser = [];
        snapshot.forEach((data) => {
          const centers = data.val();
          listUser.push({
            key: data.key,
            ...centers,
          });
        });
        setDataCenters(listUser);
      });
    };
    getDataListUsers();
  }, []);

  useEffect(() => {
    if (dataCenters) {
      const list = [];
      dataCenters.map((center) => {
        center.name.toUpperCase().includes(wordSearch.toUpperCase())
          ? list.push(center)
          : "";
      });
      setDataSearchCenters(list);
    }
  }, [wordSearch]);

  const handleClickDeleteSearchCenter = () => {
    setWordSearch("");
  };
  const handleChange = (event) => {
    setWordSearch(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Usuarios</title>
      </Head>

      <Grid container direction="row" justify="center" alignItems="center">
        <h2>Revisión de comentarios</h2>
      </Grid>
      <Box display="flex" justifyContent="flex" m={1} p={1}>
        <form noValidate autoComplete="off">
          <Paper className={classes.root}>
            <InputBase
              id="wordToSearch"
              name="wordToSearch"
              value={wordSearch}
              className={classes.input}
              placeholder="Ingrese el nombre del centro"
              inputRef={register}
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
            <ListCenters dataCenters={dataSearchCenters} />
          ) : (
            <Loading />
          )}
        </div>
      ) : dataCenters ? (
        <ListCenters dataCenters={dataCenters} />
      ) : (
        <div />
      )}
    </>
  );
}

export default withAuth(Comments);
