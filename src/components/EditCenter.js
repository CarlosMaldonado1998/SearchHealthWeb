import React, {useEffect, useState} from "react";
import withAuth from "../hocs/withAuth";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import {
    FormControl,
    Button,
    Box,
    Grid,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField,
    Icon,
    Paper,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as FIREBASE from "../lib/firebase";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    paper: {
        height: 140,
        width: 100,
    },
    root2: {
        minWidth: 275,
    },

    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 2, 2),
        backgroundColor: theme.palette.secondary,
    },
    button: {
        margin: theme.spacing(3, 2, 2),
        backgroundColor: theme.palette.cancel,
    },
    icon: {
        borderRadius: "50%",
        width: 16,
        height: 16,
        boxShadow:
            "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
        backgroundColor: "#f5f8fa",
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
        backgroundColor: "#137cbd",
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

const styles = {
    paper: {
        backgroundColor: "rgba(112,125,136,0.10)",
        padding: "10px",
        marginBottom: "15px",
    },
};

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

const EditCenter = (props) => {
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const [dataCenter, setDataCenter] = useState({key: '',
        comments: [],
        contacts: [],
        days: '',
        email: '',
        endtime: '',
        location: [],
        name: '',
        photo:'',
        sector: '',
        socialmedia: [],
        specialties: [],
        starttime:'',
        type:''
    });


    useEffect( () => {

        const getDataCenter  = async () => {
            FIREBASE.db.ref(`medicalCenters/${props.id}`).on('value', (snapshot) => {
                console.log('snapshot del centro', snapshot.val());
                const center = snapshot.val();
                const centerId = snapshot.key;
                const listCommentsData = [];
                const comments = center.comments;
                for(let commentId in comments) {
                    const comment = comments[commentId];
                    listCommentsData.push({
                        key: commentId,
                        commentC: comment.comment,
                        nameC: comment.name,
                        dateC: comment.date,
                        userIdC: comment.userid,
                        photoC: comment.photo,
                        score: comment.score
                    });
                }

                const centerData = {key: centerId,
                    days: center.days,
                    email: center.email,
                    endtime: center.endtime,
                    name: center.name,
                    photo: center.photo,
                    sector: center.sector,
                    starttime:center.starttime,
                    type:center.type,
                    comments: listCommentsData
                };
                console.log('centerdata', centerData);
                setDataCenter(centerData);

            });
        };
        getDataCenter();
    }, []);

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
            <Paper elevation={0} style={styles.paper}>

            </Paper>

                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="flex-end"
                >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Guardar cambios
                    </Button>
                    <Button
                        onClick={props.onCancel}
                        variant="contained"
                        className={classes.button}
                    >
                        Cancelar
                    </Button>
                </Grid>
        </>
    );
};

export default withAuth(EditCenter);