import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "../styles/UserNav.module.css";
import { BiMenuAltRight } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const UserNav = () => {
  const [user, loading] = useAuthState(auth);

  const [open, setOpen] = useState(false);

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
              <Link href={"/auth/login"}>sign in</Link>
            ) : (
              <img src={user.photoURL} />
            )}
          </div>
          <div className={styles.userNameContainer}>
            <p>HELLO,</p>
            {!user ? <span>Stranger</span> : <span>{user.displayName}</span>}
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
          <MdClose />
          <li>
            <Link href={"/"}>Workouts</Link>
          </li>
        </motion.ul>
      )}
    </>
  );
};
export default UserNav;
