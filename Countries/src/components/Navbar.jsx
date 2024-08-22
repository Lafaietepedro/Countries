import { Link } from "react-router-dom";

import moonIcon from "../assets/moon-svgrepo-com.svg";

import "./Navbar.css";

const Navbar = () => {
  return (
    <header>
      <h2>
        <Link to={"/"}>Where in the World?</Link>
      </h2>
      <div id="theme">
        <img
          width="30"
          height="30"
          src="https://img.icons8.com/ios-glyphs/30/fcfefe/moon-symbol.png"
          alt="moon-symbol"
        />
        <p>Dark Mode</p>
      </div>
    </header>
  );
};

export default Navbar;
