import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <header>
      <h2>
        <Link to={"/"}>Where in the World?</Link>
      </h2>
    </header>
  );
};

export default Navbar;
