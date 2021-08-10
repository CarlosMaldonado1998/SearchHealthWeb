import React from "react";
import Comments from "../../../../components/Comments";
import { Grid, List } from "@material-ui/core";
import useCenter from "../../../../hooks/useCenter";
import ViewCenter from "../../../../components/ViewCenter";
import useComments from "../../../../hooks/useComments";
import Head from "next/head";

const Center = ({ id }) => {
  const [dataCenter] = useCenter(id);
  const [dataComments] = useComments(id);

  return (
    <>
      <Head>
        <title>Comentarios</title>
      </Head>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid>
          {dataCenter ? (
            <ViewCenter dataCenter={dataCenter} />
          ) : (
            <Grid> No hay centro registrado con el id</Grid>
          )}
        </Grid>
      </Grid>
      <Grid>
        <Grid>
          {dataComments ? (
            <List key={"comments - " + dataCenter.id}>
              {dataComments.map((comment) => (
                <Comments comment={comment} dataCenterID={dataCenter.id} />
              ))}
            </List>
          ) : (
            <Grid>DAtos no encontrados </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Center;

export async function getServerSideProps(context) {
  const { params, res } = context;
  const { id } = params;

  return { props: { id } };
}
