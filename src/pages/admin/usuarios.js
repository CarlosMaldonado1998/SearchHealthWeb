import withAuth from "../../hocs/withAuth";
import Head from "next/head";
import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import users from "../../services/users";
import TableUsers from "../../components/TableUsers";
import Loading from "../../components/Loading";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";

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

function Users() {
  const classes = useStyles();
  const [dataListUsers, setDataListUsers] = useState([]);
  const [dataSearchUsers, setDataSearchUsers] = useState([]);
  const [wordSearch, setWordSearch] = useState("");
  const { register } = useForm();

  useEffect(() => {
    const getDataListUsers = async () => {
      await users.getAll().on("value", (snapshot) => {
        const listUser = [];
        snapshot.forEach((data) => {
          const centers = data.val();
          listUser.push({
            key: data.key,
            ...centers,
          });
        });
        setDataListUsers(listUser);
      });
    };
    getDataListUsers();
  }, []);

  useEffect(() => {
    if (dataListUsers) {
      const list = [];
      dataListUsers.map((center) => {
        center.name.toUpperCase().includes(wordSearch.toUpperCase())
          ? list.push(center)
          : "";
      });
      setDataSearchUsers(list);
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
        <h2>Listado de Usuarios</h2>
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
          {dataSearchUsers ? (
            <TableUsers dataList={dataSearchUsers} />
          ) : (
            <Loading />
          )}
        </div>
      ) : dataListUsers ? (
        <TableUsers dataList={dataListUsers} />
      ) : (
        <div />
      )}
    </>
  );
}

export default withAuth(Users);
