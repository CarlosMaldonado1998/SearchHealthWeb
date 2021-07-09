import { useEffect, useState } from "react";
import medicalCenters from "../services/medicalCenters";

const Centers = () => {
  const [dataCenters, setDataCenters] = useState([]);

  useEffect(() => {
    medicalCenters.getAll().onSnapshot((querySnapshot) => {
      const listUser = [];
      querySnapshot.docs.forEach((item) => {
        const centers = item.data();
        listUser.push({
          key: item.id,
          ...centers,
        });
      });
      setDataCenters(listUser);
    });
  }, []);

  return [dataCenters];
};

export default Centers;
