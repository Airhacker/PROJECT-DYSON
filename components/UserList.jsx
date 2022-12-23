import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import styles from "../styles/UserList.module.css";

const UserList = () => {
  // state for users
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const usersRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersRef);
    const usersList = usersSnapshot.docs.map((doc) => doc.data());
    setUsers(usersList);
    console.log(usersList);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Homies</h1>
      <hr />
      <div className={styles.userContainer}>
        {users.map((user) => (
          <div key={user.userId} className={styles.userCards}>
            <img src={user.displayPicture} referrerPolicy="no-referrer" />
            <div>
              <h3>{user.displayName}</h3>
              <span>{user.Nickname}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserList;
