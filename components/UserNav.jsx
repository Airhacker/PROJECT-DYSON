import Link from "next/link";
import { auth } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

const UserNav = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <section>
      <div>
        <p>HELLO,</p>
        {!user ? <span>Stranger</span> : <span>{user.displayName}</span>}
      </div>
      <div>
        {!user ? (
          <Link href={"/auth/login"}>sign in</Link>
        ) : (
          <img src={user.photoURL} alt="User Profile Photo" />
        )}
      </div>
    </section>
  );
};
export default UserNav;
