import { db } from "../lib/firebase";

let Centers;

export default Centers = {
  getAll: () => {
    return db.ref("medicalCenters/");
  },
  saveCenter: () => {
    return db.ref("medicalCenters/");
  },
  addInfoCenter: (id) => {
    return db.ref("medicalCenters/" + id);
  },
};
