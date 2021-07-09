import { db } from "../lib/firebase";

let Specialty;

export default Specialty = {
  getAll: () => {
    return db.collection("specialties").get();
  },
};
