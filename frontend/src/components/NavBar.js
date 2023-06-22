import React from "react";

export default function NavBar() {
  const style = {
    margin: "0% 0% 4ch 0%",
    borderBottom: "0.1ch solid rgb(230, 230, 230)",
  };
  return (
    <nav className="navbar" style={style}>
      <nav className="navbar-brand">
        <a className="navbar-item">
          <img src="/img/Asset 1.png" width="30" height="50"></img>
        </a>
        <p className="navbar-item has-text-weight-bold">Aitomind</p>
      </nav>
      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <button className="button is-primary">
              {" "}
              Create a New Mindmap{" "}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
