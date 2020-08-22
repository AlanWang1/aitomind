import React from "react";

export default function NavBar() {
  const style = {
    margin: "0% 0% 4ch 0%",
    borderBottom: "0.1ch solid rgb(230, 230, 230)"
  };
  return (
    <nav className="navbar" style={style}>
      <nav className="navbar-brand">
        <p className="is-size-3 has-text-weight-semibold"> Name</p>
      </nav>
    </nav>
  );
}
