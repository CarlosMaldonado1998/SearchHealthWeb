import Loading from "./Loading";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import Comments from "./Comments";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const ViewCenter = ({ dataCenter, onCancel }) => {
  const classes = useStyles();
  return (
    <>
      {dataCenter ? (
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="stretch"
        >
          <Grid item xs={12}>
            <Card className={classes.root}>
              <CardMedia
                className={classes.media}
                image={dataCenter.photo}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {dataCenter.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Horario de Atención : {dataCenter.start_time} :
                  {dataCenter.end_time}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Sector: {dataCenter.sector}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Tipo: {dataCenter.type}
                </Typography>
              </CardContent>
            </Card>
            <Typography color={"primary"}> Comentarios</Typography>
            {dataCenter.comments ? (
              dataCenter.comments.map((comment) => {
                return (
                  <List>
                    <Comments comment={comment} key={dataCenter.key} />
                  </List>
                );
              })
            ) : (
              <Typography>
                Este Centro médico todavia no ha recibido commentarios
              </Typography>
            )}
          </Grid>
          <Grid container justify="center" alignItems="center">
            <Button onClick={onCancel} variant="contained" color={"secondary"}>
              Cerrar
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ViewCenter;
