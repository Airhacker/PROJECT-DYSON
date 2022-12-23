import styles from "../../styles/Dashboard.module.css";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import UserList from "../../components/UserList";

const Dashboard = () => {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  // See if user is logged in
  const getData = async () => {
    if (loading) return;
    if (!user) return route.push("/");
  };

  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div className={styles.container}>
      <button onClick={() => auth.signOut()}>Sign Out</button>
      <UserList />
    </div>
  );
};
export default Dashboard;
