import { useRouter } from "next/router";
import medicalCenters from "../../../../services/medicalCenters";
import React, { useEffect, useState } from "react";
import Comments from "../../../../components/Comments";
import { List } from "@material-ui/core";
import useCenter from "../../../../hooks/useCenter";
import ViewCenter from "../../../../components/ViewCenter";

const Center = ({ id }) => {
  const [dataCenter, dataComments] = useCenter(id);

  console.log("datosC", dataCenter);
  return (
    <>
      <div>
        {dataCenter ? (
          <ViewCenter dataCenter={dataCenter} />
        ) : (
          <div> No hay centro registrado con el id</div>
        )}
      </div>
      <div>
        {dataComments ? (
          dataComments.map((comment) => {
            return (
              <List key={dataCenter.id}>
                <Comments comment={comment} dataCenterID={dataCenter.id} />
              </List>
            );
          })
        ) : (
          <div> No hay comentarios en el centro médico</div>
        )}
      </div>
    </>
  );
};
export default Center;

export async function getServerSideProps(context) {
  const { params, res } = context;
  const { id } = params;

  return { props: { id } };
}
