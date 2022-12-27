import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "../styles/UserNav.module.css";
import { BiMenuAltRight } from "react-icons/bi";
import { MdClose, MdFastfood } from "react-icons/md";
import { AiFillHome, AiFillWechat } from "react-icons/ai";
import { FaDumbbell } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const UserNav = () => {
  const [user, loading] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("Stranger");

  useEffect(() => {
    // function to only set first name of user in NAV
    if (user) {
      const firstName = user.displayName.split(" ");
      console.log(firstName);
      setUserName(firstName[0]);
    }
  }, [user]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.overlay}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <section className={styles.container}>
        <div className={styles.userContainer}>
          <div className={styles.userImageContainer}>
            {!user ? (
              <Link href={"/auth/login"}>
                <button>Sign in</button>
              </Link>
            ) : (
              <Link href={"/auth/dashboard"}>
                <img src={user.photoURL} referrerPolicy="no-referrer" />
              </Link>
            )}
          </div>
          <div className={styles.userNameContainer}>
            {user && <p>HELLO,</p>}
            {user && <span>{userName}</span>}
          </div>
        </div>
        <div className={styles.navContainer}>
          <BiMenuAltRight
            onClick={() => {
              setOpen(!open);
            }}
          ></BiMenuAltRight>
        </div>
      </section>
      {open && (
        <motion.ul
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "150%" }}
          transition={{
            type: "spring",
            bounce: 0.01,
          }}
          className={styles.links}
        >
          <MdClose
            onClick={() => {
              setOpen(!open);
            }}
          />
          <li onClick={() => setOpen(!open)}>
            <AiFillHome />
            <Link href={"/"}>Home</Link>
          </li>
          <li onClick={() => setOpen(!open)}>
            <FaDumbbell />
            <Link href={"/user/workout"}>Workouts</Link>
          </li>
          <li onClick={() => setOpen(!open)}>
            <MdFastfood />
            <Link href={"/user/meals"}>Meals</Link>
          </li>
          <li onClick={() => setOpen(!open)}>
            <AiFillWechat />
            <Link href={"/chat"}>Chat</Link>
          </li>
        </motion.ul>
      )}
    </>
  );
};
export default UserNav;
