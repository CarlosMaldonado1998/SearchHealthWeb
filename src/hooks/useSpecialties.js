import { useEffect, useState } from "react";
import specialties from "../services/specialties";

const Specialty = () => {
  const [dataSpecialties, setDataSpecialties] = useState([]);

  useEffect(() => {
    const getDataSpecialties = async () => {
      await specialties
        .getAll()
        .once("value")
        .then((snapshot) => {
          const dataList = [];
          snapshot.forEach((data) => {
            dataList.push({ id: data.key, name: data.val() });
          });
          setDataSpecialties(dataList);
        });
    };
    getDataSpecialties();
  }, []);

  return [dataSpecialties];
};

export default Specialty;
