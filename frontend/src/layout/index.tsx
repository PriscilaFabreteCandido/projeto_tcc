import { Outlet } from "react-router-dom";

import "./styles.css";
import Breadcrumbs from "../components/Breadcrumbs";
import MenuLeft from "../components/MenuLeft";
import Header from "../components/Header";
import { useEffect, useState } from "react";

function RootLayout() {
  const [isIconClicked, setIsIconClicked] = useState<boolean>(false);

  const handleIconClick = (e: any) => {
    console.log("e", e);
    if (e) {
      document.documentElement.style.setProperty("--column-width", "15%");
    } else {
      document.documentElement.style.setProperty("--column-width", "80px");
    }

    setIsIconClicked(e);
  };

  useEffect(() => {
    if (isIconClicked) {
      document.documentElement.style.setProperty("--column-width", "15%");
    } else {
      document.documentElement.style.setProperty("--column-width", "80px");
    }
  });

  return (
    <div className="root-layout grid-container">
      <header id="pageHeader">
        <Header onIconClick={handleIconClick} />
      </header>

      <nav id="pageNav">
        <MenuLeft isIconClicked={isIconClicked} />
      </nav>

      <main id="pageMain">
        <div
          style={{
            borderRadius: "10px",
            margin: "0.25rem 0.85rem",
          }}
        >
          <Breadcrumbs />
        </div>
        <div
          className="shadow"
          style={{
            background: "white",
            borderRadius: "10px",
            margin: "0rem 0.85rem",
            padding: "1rem",
          }}
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default RootLayout;
