import { useEffect, useState } from "react";
import medicalCenters from "../services/medicalCenters";

const Center = (id) => {
  const [dataCenter, setDataCenter] = useState({});
  const [dataComments, setDataComments] = useState([]);
  useEffect(() => {
    const getDataListUsers = () => {
      medicalCenters.getCenterByID(id).on("value", (snapshot) => {
        if (snapshot.exists()) {
          const centerVal = snapshot.val();
          const listComments = [];
          const centerData = [];
          const comments = centerVal.comments;
          if (comments) {
            for (let key in comments) {
              const comment = comments[key];
              listComments.push({
                key: key,
                name: comment.name,
                photo: comment.photo,
                userId: comment.uid,
                score: comment.score,
                comment: comment.comment,
              });
            }
          }
          centerData.push({
            id: snapshot.key,
            days: centerVal.days,
            email: centerVal.email,
            end_time: centerVal.end_time,
            location: centerVal.location,
            name: centerVal.name,
            contacts: centerVal.contacts,
            photo: centerVal.photo,
            sector: centerVal.sector,
            social_media: centerVal.social_media,
            specialties: centerVal.specialties,
            start_time: centerVal.start_time,
            type: centerVal.type,
          });
          setDataCenter(...centerData);
          setDataComments(listComments);
        } else {
          setDataCenter(null);
          setDataComments(null);
        }
      });
    };
    getDataListUsers();
  }, []);

  return [dataCenter, dataComments];
};

export default Center;
