import Loading from "./Loading";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
  },
  media: {
    height: 140,
  },
});

const ViewCenter = ({ dataCenter }) => {
  const classes = useStyles();
  return (
    <>
      {dataCenter ? (
        <Grid>
          <Card className={classes.root}>
            {dataCenter.photo ? (
              <CardMedia
                className={classes.media}
                image={dataCenter.photo}
                title="Contemplative Reptile"
              />
            ) : (
              <Loading />
            )}

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
        </Grid>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ViewCenter;
