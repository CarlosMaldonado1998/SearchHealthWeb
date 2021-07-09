import { db } from "../lib/firebase";

let Centers;

export default Centers = {
  getAll: () => {
    return db.collection("medicalCenters");
  },
  saveCenter: () => {
    return db.collection("medicalCenters");
  },
  getCenterByID: (id) => {
    return db.collection("medicalCenters").doc(id);
  },
  updatePhotoCenter: (id, data) => {
    return db.collection("medicalCenters").doc(id).update(data);
  },
  deleteCenter: (id) => {
    return db.collection("medicalCenters").doc(id).delete();
  },
  getCommentsByIDCenter: (id) => {
    return db.collection("medicalCenters").doc(id).collection("comments");
  },
  deleteCommentByIDCenter: (id, commentID) => {
    return db
      .collection("medicalCenters")
      .doc(id)
      .collection("comments")
      .doc(commentID)
      .delete();
  },
};
