import { db } from "../lib/firebase";

let Users;

export default Users = {
  getAll: () => {
    return db.ref("users/");
  },
};
