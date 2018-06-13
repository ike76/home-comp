import React from "react";
import HomeLister from "../HomeLister";
import ControlHouse from "../ControlHouse";
import Header from "./Header";
import NewHomeFormContainer from "../Forms/NewHomeFormContainer";
import "./Layout.css";
export default () => {
  return (
    <div className="layout">
      <header className="header">
        <Header />
      </header>
      <section className="sidebar">
        <ControlHouse />
      </section>
      <main className="main">
        <HomeLister />
      </main>
      <section className="sidebar2">
        <NewHomeFormContainer />
        <NewHomeFormContainer fake />
      </section>
      <footer className="footer">footer</footer>
    </div>
  );
};
