import "./Styles/App.scss";
import React from "react";
import AddFolder from "./components/AddFolder";
import Folder from "./components/Folder";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { selectLinks } from "./features/links/linkSlice";

function App() {
  const links = useSelector(selectLinks);

  return (
    <>
      <Navbar />
      <AddFolder />
      <div className="basic-grid">
        {links.links.length >= 1 ? (
          links.links.map((link, i) => (
            <Folder
              isOpen={link.isOpen}
              index={i}
              key={i}
              name={link.name}
              id={link.id}
              items={link.items}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default App;
