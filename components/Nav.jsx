import {AiFillHome, AiFillMessage,AiFillSetting} from "react-icons/ai"
import {BiDumbbell} from "react-icons/bi"
import {FaPizzaSlice} from "react-icons/fa"

const Nav = () => {
  return <div>
    <ul>
      <li><AiFillHome/></li>
      <li><BiDumbbell/></li>
      <li><FaPizzaSlice/></li>
      <li><AiFillMessage/></li>
      <li><AiFillSetting/></li>
    </ul>
  </div>;
};
export default Nav;