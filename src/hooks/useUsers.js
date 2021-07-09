import { useEffect, useState } from "react";
import users from "../services/users";

const Users = () => {
  const [dataUsers, setDataUsers] = useState([]);

  useEffect(() => {
    const getDataListUsers = async () => {
      const data = await users.getAll();
      const listUser = [];
      data.docs.forEach((item) => {
        listUser.push({
          key: item.id,
          ...item.data(),
        });
      });
      setDataUsers(listUser);
    };
    getDataListUsers();
  }, []);

  return [dataUsers];
};

export default Users;
