import { useEffect, useState } from "react";
import medicalCenters from "../services/medicalCenters";

const Center = (id) => {
  const [dataCenter, setDataCenter] = useState({});
  useEffect(() => {
    const getDataCenter = async () => {
      await medicalCenters
        .getCenterByID(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setDataCenter({
              id: doc.id,
              ...doc.data(),
            });
          }
        });
    };
    getDataCenter();
  }, []);

  return [dataCenter];
};

export default Center;
