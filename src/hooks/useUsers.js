import { useEffect, useState } from "react";
import users from "../services/users";

const Users = () => {
  const [dataUsers, setDataUsers] = useState([]);

  useEffect(() => {
    const getDataListUsers = async () => {
      await users.getAll().on("value", (snapshot) => {
        const listUser = [];
        snapshot.forEach((data) => {
          const centers = data.val();
          listUser.push({
            key: data.key,
            ...centers,
          });
        });
        setDataUsers(listUser);
      });
    };
    getDataListUsers();
  }, []);

  return [dataUsers];
};

export default Users;
