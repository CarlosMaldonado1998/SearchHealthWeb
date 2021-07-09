import { db } from "../lib/firebase";

let Users;

export default Users = {
  getAll: () => {
    return db.collection("users").get();
  },
};
