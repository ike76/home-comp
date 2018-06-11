import React from "react";
import HomeLister from "../HomeLister";
import ControlHouse from "../ControlHouse";
import "./Layout.css";
export default () => {
  return (
    <div className="layout">
      <header className="header">
        <h1>HomeComp</h1>
      </header>
      <section className="sidebar">
        <ControlHouse />
      </section>
      <main className="main">
        <HomeLister />
      </main>
      <section className="sidebar2">sidebar2</section>
      <footer className="footer">footer</footer>
    </div>
  );
};
