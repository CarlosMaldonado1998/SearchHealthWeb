import { useEffect, useState } from "react";
import medicalCenters from "../services/medicalCenters";

const Center = (id) => {
  const [dataComments, setDataComments] = useState([]);
  useEffect(() => {
    medicalCenters.getCommentsByIDCenter(id).onSnapshot((querySnapshot) => {
      const listComments = [];
      querySnapshot.docs.map((item) => {
        listComments.push({
          id: item.id,
          ...item.data(),
        });
      });
      setDataComments(listComments);
    });
  }, []);

  return [dataComments];
};

export default Center;
