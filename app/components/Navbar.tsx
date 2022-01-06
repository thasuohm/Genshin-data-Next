import React from "react";
import logo from "../../public/images/genshin-logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  return (
    <nav className="nav-container">
      <div className="left-nav nav">
        <div className="menu-nav">
          <MenuIcon />
        </div>
        <Link href="/">
          <div className="genshin-logo">
            <Image src={logo} alt="genshin-logo" />
          </div>
        </Link>
      </div>
      <div className="right-nav nav">
        <div>Town</div>
        <div>About</div>
      </div>
    </nav>
  );
}

export default Navbar;
