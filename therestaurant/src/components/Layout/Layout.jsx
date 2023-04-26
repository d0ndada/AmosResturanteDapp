import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Layout.css";
import Navbar from "../Navbar/Navbar";
import Routes from "../Routes/Routes"; // Add this line
import Admin from "../Admin/Admin";
import useBlockchain from "../../useContext/useBlockchain";
import BlockchainContext from "../../BlockchainContext";

export const Layout = () => {
  const blockchain = useBlockchain();
  return (
    <BlockchainContext.Provider value={blockchain}>
      <div>
        <header>
          <h1>Amos fine and dine</h1>
          <Admin />
          <Navbar />
        </header>
        <main className="wrapper">
          <Routes />
        </main>
        <footer className="wrapper">
          <p className="footer-text">&copy; 2023 Amo Livs</p>
        </footer>
      </div>
    </BlockchainContext.Provider>
  );
};
