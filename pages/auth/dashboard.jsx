import styles from "../../styles/Dashboard.module.css";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
      <h1>Your Dashboard</h1>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
};
export default Dashboard;
