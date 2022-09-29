import "./Styles/App.scss";
import { useEffect } from "react";
import AddFolder from "./components/AddFolder";
import Folder from "./components/Folder";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { selectLinks } from "./features/links/linkSlice";
import React from "react";

function App() {
  const links = useSelector(selectLinks);

  useEffect(() => {
    document.title = "DumpStar.io";
  }, []);

  return (
    <>
      <Navbar />
      <AddFolder />
      <div className="basic-grid">
        {links.links
          ? links.links.map((link, i) => (
              <Folder
                isOpen={link.isOpen}
                index={i}
                key={link.id}
                name={link.name}
                id={link.id}
                items={link.items}
              />
            ))
          : null}
      </div>
    </>
  );
}

export default App;
