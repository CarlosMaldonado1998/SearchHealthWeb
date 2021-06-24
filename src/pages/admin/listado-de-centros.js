import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import withAuth from "../../hocs/withAuth";
import EditCenter from "../../components/EditCenter";
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
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import SearchIcon from "@material-ui/icons/Search";
import * as FIREBASE from "../../lib/firebase";
import { useForm } from "react-hook-form";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DeleteCenter from "../../components/DeleteCenter";

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

const styles = {
    title: {
        textAlign: "center",
        color: "white",
        textShadow: "2px 2px #262626",
    },
};

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 600,
    },
    margin: {
        backgroundColor: "rgba(255,255,255,0.8)",
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
    root2: {
        minWidth: 275,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
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

const MedicalCenter = () => {
    const classes = useStyles();
    const [dataListCenters, setDataListCenters] = useState([]);
    const [dataSearchCenters, setDataSearchCenters] = useState([]);
    const [wordSearch, setWordSearch] = useState("");
    const [valueIdCenter, setValueIdCenter] = useState(null);
    const [isDialogsVisibleEditCenter, setIsDialogsVisibleEditCenter] = useState(
        false
    );
    const [isDialogsVisibleDeleteCenter, setIsDialogsVisibleDeleteCenter] = useState(
        false
    );
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
        setValueIdCenter(id);
    };
    const handleClickOpenDeleteCenter = (id) => {
        setIsDialogsVisibleEditCenter(false);
        setIsDialogsVisibleDeleteCenter(true);
        setValueIdCenter(id);
    };
    const handleClose = () => {
        setIsDialogsVisibleEditCenter(false);
        setIsDialogsVisibleDeleteCenter(false);

    };
    useEffect( () => {
        const getDataListCenters  = async () => {
            FIREBASE.db.ref('medicalCenters').on('value', (snapshot) => {
                console.log('snapshot', snapshot.val());
                const listCentersData = [];
                snapshot.forEach( (data) => {
                    const centers = data.val();
                    const centersId = data.key;
                    listCentersData.push({
                        key: centersId,
                        name: centers.name,
                        sector: centers.sector,
                        type: centers.type,
                    });
                });
                setDataListCenters(listCentersData);
            });
        };
        getDataListCenters();

        if (dataListCenters) {
            setDataSearchCenters([]);
            const listCenterData = [];
            dataListCenters.map((center) => {
                center.name.toUpperCase().includes(wordSearch.toUpperCase())
                    ? listCenterData.push(center)
                    : "";
            });
            setDataSearchCenters(listCenterData);
        }
    }, [wordSearch]);


    return (
        <>
            <h1 style={styles.title}>Gestión de centros</h1>
            <Box display="flex" justifyContent="flex" m={1} p={1}>
                <form className={classes.root} noValidate autoComplete="off">
                    <Paper className={classes.root3}>
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
            {wordSearch !== ""
            ? ( <div>
                    {dataSearchCenters ? (
                        <div>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Nombre</StyledTableCell>
                                            <StyledTableCell align="center">
                                                Sector
                                            </StyledTableCell>
                                            <StyledTableCell align="center">Tipo</StyledTableCell>
                                            <StyledTableCell align="center">Opción</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dataSearchCenters.map((center) => (
                                            <StyledTableRow key={center.id}>
                                                <StyledTableCell align="center">
                                                    {center.name}
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
                                                        onClick={() => handleClickOpenEditCenter(center.key)}
                                                    >
                                                        <BorderColorIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        color="dark"
                                                        aria-label="upload picture"
                                                        component="span"
                                                    >
                                                        <DeleteIcon
                                                        />
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
                    {dataListCenters ? (
                        <div>
                            <TableContainer component={Paper}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="center">Nombre</StyledTableCell>
                                            <StyledTableCell align="center">
                                                Sector
                                            </StyledTableCell>
                                            <StyledTableCell align="center">Tipo</StyledTableCell>
                                            <StyledTableCell align="center">Opción</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {dataListCenters.map((center) => (
                                            <StyledTableRow key={center.id}>
                                                <StyledTableCell align="center">
                                                    {center.name}
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
                                                        onClick={() => handleClickOpenEditCenter(center.key)}
                                                    >
                                                        <BorderColorIcon />
                                                    </IconButton>

                                                    <IconButton
                                                        color="dark"
                                                        aria-label="upload picture"
                                                        component="span"
                                                        onClick={() => handleClickOpenDeleteCenter(center.key)}
                                                    >
                                                        <DeleteIcon
                                                        />
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
            >
                <DialogContent>
                    <EditCenter id={valueIdCenter} onCancel={handleClose} />
                </DialogContent>
            </Dialog>
            <Dialog
                open={isDialogsVisibleDeleteCenter}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                disableBackdropClick={true}
            >
                <DialogContent>
                    <DeleteCenter id={valueIdCenter} onCancel={handleClose} />
                </DialogContent>
            </Dialog>

        </>
    );
};
export default withAuth(MedicalCenter);

