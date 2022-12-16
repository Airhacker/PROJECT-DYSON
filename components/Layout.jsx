import UserNav from "./UserNav";

const Layout = ({ children }) => {
  return (
    <div>
      <UserNav />
      <main>{children}</main>
    </div>
  );
};
export default Layout;
