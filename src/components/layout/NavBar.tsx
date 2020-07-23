import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../../pokemon_logo_orig.png";

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark fixed-stop">
        <a
          href="#"
          className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center"
        >
          <img src={Logo} style={{ width: 150, height: 50 }} alt="" />
        </a>
      </nav>
    </>
  );
};

export default NavBar;
