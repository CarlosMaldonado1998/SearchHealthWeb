import { useEffect, useState } from "react";
import specialties from "../services/specialties";

const Specialty = () => {
  const [dataSpecialties, setDataSpecialties] = useState([]);

  useEffect(() => {
    const getDataSpecialties = async () => {
      const data = await specialties.getAll();
      const dataList = [];
      data.docs.forEach((item) => {
        dataList.push({ id: item.id, ...item.data() });
      });
      setDataSpecialties(dataList);
    };
    getDataSpecialties();
  }, []);

  return [dataSpecialties];
};

export default Specialty;
