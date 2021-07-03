import { useEffect, useState } from "react";
import medicalCenters from "../services/medicalCenters";

const Centers = () => {
  const [dataCenters, setDataCenters] = useState([]);

  useEffect(() => {
    const getDataCenters = async () => {
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
    getDataCenters();
  }, []);

  return [dataCenters];
};

export default Centers;
