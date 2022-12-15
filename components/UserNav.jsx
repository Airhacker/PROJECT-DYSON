import Link from "next/link";

const UserNav = () => {
  return <section>
    <div><p>HELLO,</p><span></span></div>
    <div>
      <Link href={"/auth/login"}>sign in</Link>
    </div>
  </section>;
};
export default UserNav;