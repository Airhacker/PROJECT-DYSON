import Nav from "./Nav";
import UserNav from "./UserNav";

const Layout = ({children}) => {
  return <div>
    <UserNav/>
    <main>{children}</main>
    <Nav/>
  </div>;
};
export default Layout;